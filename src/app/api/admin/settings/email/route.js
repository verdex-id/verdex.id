import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import { generateRandomString } from "@/utils/random";
import { sendEmailVerification } from "@/services/email";
import { prismaErrorCode } from "@/utils/prisma";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { authPayloadAccountId } from "@/middleware";
import { comparePassword } from "@/lib/password";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request) {
  const payloadAdminId = headers().get(authPayloadAccountId);

  const req = await request.json();

  let schema = Joi.object({
    password: Joi.string().required(),
    new_email: Joi.string().email().required(),
  });

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, invalidReq.error.details),
    );
  }

  let admin = await prisma.admin.findUnique({
    where: {
      id: payloadAdminId,
    },
  });

  if (admin.email === req.new_email) {
    return NextResponse.json(...failResponse("No changes were made.", 400));
  }

  if (!admin) {
    return NextResponse.json(...errorResponse());
  }

  const isCorrectPassword = await comparePassword(
    req.password,
    admin.hashedPassword,
  );

  if (!isCorrectPassword) {
    return NextResponse.json(...failResponse("Password incorrect.", 401));
  }

  try {
    await prisma.$transaction(async (tx) => {
      const expirationTime = new Date(
        new Date().getTime() +
        process.env.EMAIL_VERIFICATION_DURATION * 3600000,
      );
      const secretCode = generateRandomString(32);

      admin = await tx.admin.update({
        where: {
          id: admin.id,
          NOT: {
            email: req.new_email,
          },
        },
        data: {
          email: req.new_email,
          isEmailVerified: false,
        },
      });

      const verifyEmail = await tx.verifyEmail.create({
        data: {
          adminId: admin.id,
          email: admin.email,
          secretCode: secretCode,
          expiredAt: expirationTime,
        },
      });

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
        "Unable to perform action at this time. Please try again later.",
      ),
    );
  }

  return NextResponse.json(...successResponse({ email: admin.email }));
}
