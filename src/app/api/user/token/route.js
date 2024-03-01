import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";
import { createToken, verifyToken } from "@/lib/jwt";
import Joi from "joi";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { prismaErrorCode } from "@/utils/prisma";
import prisma from "@/lib/prisma";

export async function POST(request) {
  const schema = Joi.object({
    refresh_token: Joi.string().required(),
  });

  const req = await request.json();

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 400, invalidReq.error.details),
    );
  }
  const [isValid, RTPayload] = await verifyToken(req.refresh_token);

  if (!isValid) {
    return NextResponse.json(
      ...failResponse("Refresh token has expired or is invalid", 401),
    );
  }

  let arg = {
    where: {
      id: RTPayload.id,
    },
  };

  let session;

  try {
    session = await prisma.session.findUnique(arg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(...failResponse(prismaErrorCode[e.code], 400));
    }

    return NextResponse.json(...errorResponse());
  }

  if (!session) {
    return NextResponse.json(...failResponse("Session not found", 404));
  }

  if (session.isBlocked) {
    return NextResponse.json(...failResponse("blocked session", 401));
  }

  if (session.userId !== RTPayload.accountId) {
    return NextResponse.json(...failResponse("incorrect session account", 401));
  }

  if (session.refreshToken !== req.refresh_token) {
    return NextResponse.json(...failResponse("mismatched session token", 401));
  }

  const currentTime = new Date();

  if (currentTime > session.expiredAt) {
    return NextResponse.json(...failResponse("expired session", 401));
  }

  const [newAccessToken, NATPayload, NATErr] = await createToken(
    RTPayload.accountId,
    process.env.ACCESS_TOKEN_DURATION,
  );

  if (NATErr) {
    return NextResponse.json(...errorResponse());
  }

  const res = {
    access_token: newAccessToken,
    access_token_expire_at: NATPayload.expiredAt,
  };

  return NextResponse.json(...successResponse(res));
}
