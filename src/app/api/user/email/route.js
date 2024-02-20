import { headers } from "next/headers";
import { Prisma, PrismaClient } from "@prisma/client";
import { generateRandomString } from "@/utils/random";
import { sendEmailVerification } from "@/services/email";
import { prismaErrorCode } from "@/utils/prisma";
import Joi, { when } from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { authPayloadUserId } from "@/middleware";
import { comparePassword } from "@/lib/password";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request) {
  let schema;
  let user;
  const payloadUserId = headers().get(authPayloadUserId);

  const req = await request.json();

  schema = Joi.object({
    password: Joi.string().required(),
    new_email: Joi.string().email().required(),
  });

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, invalidReq.error.details),
    );
  }

  user = await prisma.user.findUnique({
    where: {
      id: payloadUserId,
    },
  });
  if (!user) {
    return NextResponse.json(...errorResponse())
  }

  const isCorrectPassword = await comparePassword(
    req.password,
    user.hashedPassword,
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

      let arg = {
        where: {
          id: user.id,
          NOT: {
            email: req.new_email,
          },
        },
        data: {
          email: req.new_email,
          isEmailVerified: false,
        },
      };

      user = await tx.user.update(arg);

      arg = {
        data: {
          userId: user.id,
          email: user.email,
          secretCode: secretCode,
          expiredAt: expirationTime,
        },
      };

      const verifyEmail = await tx.verifyEmail.create(arg);

      const info = await sendEmailVerification(
        user.email,
        `${process.env.BASE_URL}/api/verify-email?verify_email_id=${verifyEmail.id}&secret_code=${verifyEmail.secretCode}`,
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

  return NextResponse.json(...successResponse({ email: user.email }));
}
