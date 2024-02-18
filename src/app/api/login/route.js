import { createToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import Joi from "joi";

const prisma = new PrismaClient();

export async function POST(request) {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  const req = await request.json();

  const invalidReq = schema.validate(req);

  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 400, invalidReq.error.details),
    );
  }

  let arg = {
    where: {
      email: req.email,
    },
  };

  const user = await prisma.user.findUnique(arg);

  if (!user) {
    return NextResponse.json(
      ...failResponse("Username and/or password are incorrect.", 401),
    );
  }

  if (req.password !== user.hashedPassword) {
    return NextResponse.json(
      ...failResponse("Username and/or password are incorrect.", 401),
    );
  }

  const [accessToken, ATPayload, ATErr] = await createToken(
    user.id,
    process.env.ACCESS_TOKEN_DURATION,
  );

  if (ATErr) {
    return NextResponse.json(...errorResponse());
  }

  const [refreshToken, RTPayload, RTErr] = await createToken(
    user.id,
    process.env.REFRESH_TOKEN_DURATION,
  );

  if (RTErr) {
    return NextResponse.json(...errorResponse());
  }

  arg = {
    data: {
      id: RTPayload.id,
      userId: user.id,
      refreshToken: refreshToken,
      expiredAt: RTPayload.expiredAt,
    },
  };

  const session = await prisma.session.create(arg);

  if (!session) {
    return NextResponse.json(...errorResponse());
  }

  const res = {
    session_id: session.id,
    access_token: accessToken,
    access_token_expire_at: ATPayload.expiredAt,
    refresh_token: refreshToken,
    refresh_token_expire_at: RTPayload.expiredAt,
    user: {
      full_name: user.fullName,
      email: user.email,
      created_at: user.createdAt,
    },
  };
  return NextResponse.json(...successResponse(res));
}
