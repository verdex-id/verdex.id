import { createToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import Joi from "joi";
import { comparePassword } from "@/lib/password";
import prisma from "@/lib/prisma";

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

  const admin = await prisma.admin.findUnique(arg);

  if (!admin) {
    return NextResponse.json(
      ...failResponse("Username and/or password are incorrect.", 401),
    );
  }

  const isCorrectPassword = await comparePassword(
    req.password,
    admin.hashedPassword,
  );

  if (!isCorrectPassword) {
    return NextResponse.json(
      ...failResponse("Username and/or password are incorrect.", 401),
    );
  }

  if (!admin.isEmailVerified) {
    return NextResponse.json(...failResponse("Unverified account.", 403));
  }

  if (admin.isBlocked) {
    return NextResponse.json(...failResponse("Blocked account.", 403));
  }

  const [accessToken, ATPayload, ATErr] = await createToken(
    admin.id,
    process.env.ACCESS_TOKEN_DURATION,
  );

  if (ATErr) {
    return NextResponse.json(...errorResponse());
  }

  const [refreshToken, RTPayload, RTErr] = await createToken(
    admin.id,
    process.env.REFRESH_TOKEN_DURATION,
  );

  if (RTErr) {
    return NextResponse.json(...errorResponse());
  }

  arg = {
    data: {
      id: RTPayload.id,
      adminId: admin.id,
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
    admin: {
      full_name: admin.fullName,
      email: admin.email,
      created_at: admin.createdAt,
    },
  };
  return NextResponse.json(...successResponse(res));
}
