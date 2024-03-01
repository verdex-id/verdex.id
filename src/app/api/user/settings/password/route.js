import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { authPayloadAccountId } from "@/middleware";
import { comparePassword, hashPassword } from "@/lib/password";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request) {
  const payloadUserId = headers().get(authPayloadAccountId);

  const schema = Joi.object({
    password: Joi.string().required(),
    new_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9 ]{3,30}$"))
      .min(6)
      .required(),
  });

  const req = await request.json();

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, invalidReq.error.details),
    );
  }

  let user = await prisma.user.findUnique({
    where: {
      id: payloadUserId,
    },
  });
  if (!user) {
    return NextResponse.json(...errorResponse());
  }

  const isCorrectPassword = await comparePassword(
    req.password,
    user.hashedPassword,
  );

  if (!isCorrectPassword) {
    return NextResponse.json(...failResponse("Password incorrect.", 401));
  }

  const newHashedPassword = await hashPassword(req.new_password);
  if (!newHashedPassword) {
    return NextResponse.json(...errorResponse());
  }

  const arg = {
    where: {
      id: user.id,
      hashedPassword: user.hashedPassword,
    },
    data: {
      hashedPassword: newHashedPassword,
    },
  };

  try {
    user = await prisma.user.update(arg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(...failResponse("Invalid request", 409));
    }
    return NextResponse.json(...errorResponse());
  }
  return NextResponse.json(
    ...successResponse({ message: "Password successfully updated" }),
  );
}
