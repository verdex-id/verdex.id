import { headers } from "next/headers";
import { Prisma, PrismaClient } from "@prisma/client";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { authPayloadUserId } from "@/middleware";
import { prismaErrorCode } from "@/utils/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function PUT(request) {
  let user;
  const payloadUserId = headers().get(authPayloadUserId);

  const req = await request.json();

  const schema = Joi.object({
    new_name: Joi.string()
      .pattern(/^[A-Za-z\s']+$/)
      .min(3)
      .required(),
  });

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, invalidReq.error.details),
    );
  }

  const arg = {
    where: {
      id: payloadUserId,
      NOT: {
        fullName: req.new_name,
      },
    },
    data: {
      fullName: req.new_name,
    },
  };

  try {
    user = await prisma.user.update(arg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(...failResponse(prismaErrorCode[e.code], 409));
    }
    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse({ full_name: user.fullName }));
}
