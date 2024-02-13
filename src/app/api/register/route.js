import { prismaErrorCode } from "@/lib/prisma";
import { failResponse, successResponse } from "@/lib/response";
import { PrismaClient, Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import Joi from "joi";

const prisma = new PrismaClient();

export async function POST(request) {
  const schema = Joi.object({
    full_name: Joi.string()
      .pattern(/^[A-Za-z\s']+$/)
      .min(3)
      .required(),
    password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
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

  // TODO : create hashing password function

  const arg = {
    data: {
      fullName: req.full_name,
      hashedPassword: req.password,
      email: req.email,
    },
  };

  let user;

  try {
    user = await prisma.user.create(arg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(...failResponse(prismaErrorCode[e.code], 500));
    }
    throw e;
  }

  const res = {
    full_name: user.fullName,
    email: user.email,
  };

  return NextResponse.json(...successResponse(res));
}
