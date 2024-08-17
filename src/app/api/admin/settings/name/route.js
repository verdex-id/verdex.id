import { Prisma } from "@prisma/client";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { prismaErrorCode } from "@/utils/prisma";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";

export async function PUT(request) {
  let admin = await fetchAdminIfAuthorized();
  if (admin.error) {
    return NextResponse.json(...failResponse(admin.error, admin.errorCode));
  }

  admin = admin.admin;

  const schema = Joi.object({
    new_name: Joi.string()
      .pattern(/^[A-Za-z\s']+$/)
      .min(3)
      .required(),
  });

  let req = await request.json();
  req = schema.validate(req);
  if (req.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, req.error.details),
    );
  }
  req = req.value;

  if (admin.fullName === req.new_name) {
    return NextResponse.json(...failResponse("No changes were made.", 400));
  }

  try {
    admin = await prisma.admin.update({
      where: {
        id: admin.id,
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

  return NextResponse.json(...successResponse({ full_name: admin.fullName }));
}
