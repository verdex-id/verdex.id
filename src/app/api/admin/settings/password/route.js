import { Prisma } from "@prisma/client";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { comparePassword, hashPassword } from "@/lib/password";
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";

export async function PUT(request) {
  let admin = await fetchAdminIfAuthorized();
  if (admin.error) {
    return NextResponse.json(...failResponse(admin.error, admin.errorCode));
  }

  admin = admin.admin;

  if (!admin) {
    return NextResponse.json(...errorResponse());
  }
  const schema = Joi.object({
    password: Joi.string().required(),
    new_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9 ]{3,30}$"))
      .min(6)
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

  const isCorrectPassword = await comparePassword(
    req.password,
    admin.hashedPassword,
  );

  if (!isCorrectPassword) {
    return NextResponse.json(...failResponse("Password incorrect.", 401));
  }

  const newHashedPassword = await hashPassword(req.new_password);
  if (!newHashedPassword) {
    return NextResponse.json(...errorResponse());
  }

  try {
    admin = await prisma.admin.update({
      where: {
        id: admin.id,
        hashedPassword: admin.hashedPassword,
      },
      data: {
        hashedPassword: newHashedPassword,
      },
    });
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
