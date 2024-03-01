import { NextResponse } from "next/server";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import Joi from "joi";
import { Prisma } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const schema = Joi.object({
    verifyEmailId: Joi.string().required(),
    secretCode: Joi.string().required(),
  });

  const { searchParams } = new URL(request.url);
  const verifyEmailId = searchParams.get("verify_email_id");
  const secretCode = searchParams.get("secret_code");

  const invalidReq = schema.validate({
    verifyEmailId: verifyEmailId,
    secretCode: secretCode,
  });

  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 400, invalidReq.error.details),
    );
  }

  let admin;

  try {
    await prisma.$transaction(async (tx) => {
      const verifyEmail = await tx.verifyEmail.update({
        where: {
          id: verifyEmailId,
          secretCode: secretCode,
          isUsed: false,
        },
        data: {
          isUsed: true,
        },
      });

      admin = await tx.admin.update({
        where: {
          id: verifyEmail.adminId,
        },
        data: {
          isEmailVerified: true,
        },
      });
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // return NextResponse.json(...failResponse(prismaErrorCode[e.code], 409));
      return NextResponse.json(...failResponse("Invalid request", 409));
    }

    return NextResponse.json(...errorResponse());
  }

  const res = {
    email: admin.email,
    is_email_verified: admin.isEmailVerified,
  };

  return NextResponse.json(...successResponse(res));
}
