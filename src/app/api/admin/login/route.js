import { createToken } from "@/lib/jwt";
import { NextResponse } from "next/server";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import Joi from "joi";
import { comparePassword } from "@/lib/password";
import prisma from "@/lib/prisma";
import { cookies } from "next/headers";

export async function POST(request) {
  const schema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().email().required(),
  });

  let req = await request.json();
  req = schema.validate(req);
  if (req.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, req.error.details),
    );
  }
  req = req.value;

  const admin = await prisma.admin.findUnique({
    where: {
      email: req.email,
    },
  });

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

  const session = await prisma.session.create({
    data: {
      id: RTPayload.id,
      adminId: admin.id,
      refreshToken: refreshToken,
      expiredAt: RTPayload.expiredAt,
    },
    select: {
      id: true,
    },
  });

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

  const cookie = cookies();

  cookie.set("session_id", res.session_id);
  cookie.set("access_token", res.access_token);
  cookie.set("refresh_token", res.refresh_token);

  return NextResponse.json(...successResponse(res));
}
