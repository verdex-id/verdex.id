import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { authPayloadAccountId } from "@/middleware";
import { prismaErrorCode } from "@/utils/prisma";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request) {
  let user;
  const payloadUserId = headers().get(authPayloadAccountId);

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

  try {
    user = await prisma.user.update({
      where: {
        id: payloadUserId,
        NOT: {
          fullName: req.new_name,
        },
      },
      data: {
        fullName: req.new_name,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(...failResponse(prismaErrorCode[e.code], 409));
    }
    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse({ full_name: user.fullName }));
}
