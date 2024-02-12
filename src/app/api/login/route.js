import { createToken } from "@/lib/jwt";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request) {
  const req = await request.json();

  if (!req.email || !req.password) {
    return NextResponse.json(
      {
        status: "fail",
        data: { message: "Invalid request format." },
      },
      { status: 403 },
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
      {
        status: "fail",
        data: { message: "User not found." },
      },
      { status: 404 },
    );
  }

  if (req.password !== user.hashedPassword) {
    return NextResponse.json(
      {
        status: "fail",
        data: { message: "Invalid login, please try again." },
      },
      { status: 403 },
    );
  }

  const [accessToken, ATPayload, ATErr] = await createToken(
    user.id,
    process.env.ACCESS_TOKEN_DURATION,
  );

  if (ATErr) {
    console.log(ATErr);
    return NextResponse.json(
      {
        status: "fail",
        data: {
          message:
            "We're sorry, but something unexpected happened. Please try again later.",
        },
      },
      { status: 500 },
    );
  }

  const [refreshToken, RTPayload, RTErr] = await createToken(
    user.id,
    process.env.REFRESH_TOKEN_DURATION,
  );

  if (RTErr) {
    console.log(RTErr);
    return NextResponse.json(
      {
        status: "fail",
        data: {
          message:
            "We're sorry, but something unexpected happened. Please try again later.",
        },
      },
      { status: 500 },
    );
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
    console.log("Failed to create session in the database.");
    return NextResponse.json(
      {
        status: "fail",
        data: {
          message:
            "We're sorry, but something unexpected happened. Please try again later.",
        },
      },
      { status: 500 },
    );
  }

  const res = {
    status: "success.",
    data: {
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
    },
  };

  return NextResponse.json(res);
}
