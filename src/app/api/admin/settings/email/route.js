import { Prisma } from "@prisma/client";
import { generateRandomString } from "@/utils/random";
import { sendEmailVerification } from "@/services/email";
import { prismaErrorCode } from "@/utils/prisma";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { comparePassword } from "@/lib/password";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";

export async function PUT(request) {
  let admin = await fetchAdminIfAuthorized();
  if (admin.error) {
    return NextResponse.json(...failResponse(admin.error, admin.errorCode));
  }

  admin = admin.admin;

  let schema = Joi.object({
    password: Joi.string().required(),
    new_email: Joi.string().email().required(),
  });

  let req = await request.json();
  req = schema.validate(req);
  if (req.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, req.error.details),
    );
  }
  req = req.value;

  if (admin.email === req.new_email) {
    return NextResponse.json(...failResponse("No changes were made.", 400));
  }

  const isCorrectPassword = await comparePassword(
    req.password,
    admin.hashedPassword,
  );

  if (!isCorrectPassword) {
    return NextResponse.json(...failResponse("Password incorrect.", 401));
  }

  let newAdmin;

  try {
    const expirationTime = new Date(
      new Date().getTime() + process.env.EMAIL_VERIFICATION_DURATION * 3600000,
    );
    const secretCode = generateRandomString(32);

    await prisma.$transaction(async (tx) => {
      newAdmin = await tx.admin.update({
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
          adminId: newAdmin.id,
          email: newAdmin.email,
          secretCode: secretCode,
          expiredAt: expirationTime,
        },
      });

      const info = await sendEmailVerification(
        newAdmin.email,
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

  return NextResponse.json(...successResponse({ email: newAdmin.email }));
}
