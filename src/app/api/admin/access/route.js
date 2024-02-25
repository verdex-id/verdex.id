import { NextResponse } from "next/server";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import Joi from "joi";
import { PrismaClient, Prisma } from "@prisma/client";
import { headers } from "next/headers";
import { authPayloadAccountId } from "@/middleware";

const prisma = new PrismaClient();

export async function PUT(request) {
  const schema = Joi.object({
    admin_id: Joi.string().required(),
  });

  const req = await request.json();

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 400, invalidReq.error.details),
    );
  }

  const payloadAdminId = headers().get(authPayloadAccountId);

  const author = await prisma.admin.findUnique({
    where: { id: payloadAdminId, isBlocked: false },
  });

  if (!author) {
    return NextResponse.json(
      ...failResponse(
        "Unauthorized account: You do not have permission to perform this action.",
        401,
      ),
    );
  }

  let admin;

  try {
    await prisma.$transaction(async (tx) => {
      admin = await tx.admin.findUnique({
        where: { id: req.admin_id, isEmailVerified: true },
      });

      admin = await tx.admin.update({
        where: { id: req.admin_id, isEmailVerified: true },
        data: {
          isBlocked: !admin.isBlocked,
        },
      });
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      // return NextResponse.json(...failResponse(prismaErrorCode[e.code], 409));
      return NextResponse.json(...failResponse("Invalid request", 409));
    }

    if (!admin) {
      return NextResponse.json(...failResponse("Account not found.", 404));
    }
    console.log(e);

    return NextResponse.json(...errorResponse());
  }

  const res = {
    email: admin.email,
    is_blocked: admin.isBlocked,
  };

  return NextResponse.json(...successResponse(res));
}
