import { prismaErrorCode } from "@/utils/prisma";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import Joi from "joi";
import { sendEmailVerification } from "@/services/email";
import { generateRandomString } from "@/utils/random";
import { hashPassword } from "@/lib/password";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const schema = Joi.object({
    full_name: Joi.string()
      .pattern(/^[A-Za-z\s']+$/)
      .min(3)
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9 ]{3,30}$"))
      .min(6)
      .required(),
    email: Joi.string().email().required(),
  });

  const req = await request.json();
  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, invalidReq.error.details),
    );
  }

  const hashedPassword = await hashPassword(req.password);
  if (!hashedPassword) {
    return NextResponse.json(...errorResponse());
  }

  let admin;

  try {
    await prisma.$transaction(async (tx) => {
      const expirationTime = new Date(
        new Date().getTime() +
          process.env.EMAIL_VERIFICATION_DURATION * 3600000,
      );
      const secretCode = generateRandomString(32);

      let arg = {
        data: {
          fullName: req.full_name,
          hashedPassword: hashedPassword,
          email: req.email,
        },
      };
      admin = await tx.admin.create(arg);

      arg = {
        data: {
          adminId: admin.id,
          email: admin.email,
          secretCode: secretCode,
          expiredAt: expirationTime,
        },
      };
      const verifyEmail = await tx.verifyEmail.create(arg);

      const info = await sendEmailVerification(
        admin.email,
        `${process.env.BASE_URL}/api/admin/verify-email?verify_email_id=${verifyEmail.id}&secret_code=${verifyEmail.secretCode}`,
      );

      if (info.rejected.length > 0) {
        throw new Error(`Email delivery rejected: ${info.rejected}`);
      }
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(...failResponse(prismaErrorCode[e.code], 409));
    }
    return NextResponse.json(
      ...errorResponse(
        "Unable to register at this time. Please try again later.",
      ),
    );
  }

  const res = {
    full_name: admin.fullName,
    email: admin.email,
  };

  return NextResponse.json(...successResponse(res));
}
