import prisma from "@/lib/prisma";
import { authPayloadAccountId } from "@/middleware";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { createSlug } from "@/utils/slugify";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const course = await prisma.course.findUnique({
    where: { slug: params.slug },
    select: {
      slug: true,
      title: true,
      description: true,
      price: true,
      admin: {
        select: {
          fullName: true,
        },
      },
    },
  });

  if (!course) {
    return NextResponse.json(...failResponse("Course not found.", 404));
  }

  const res = {
    slug: course.slug,
    title: course.title,
    description: course.description,
    price: course.price,
    creator: course.admin.fullName,
  };

  return NextResponse.json(...successResponse(res));
}

export async function DELETE(req, { params }) {
  const payloadAdminId = headers().get(authPayloadAccountId);

  const admin = await prisma.admin.findUnique({
    where: { id: payloadAdminId, isBlocked: false, isEmailVerified: true },
  });

  if (!admin) {
    return NextResponse.json(
      ...failResponse(
        "Unauthorized account: You do not have permission to perform this action.",
        401,
      ),
    );
  }

  let course;
  try {
    course = await prisma.course.delete({
      where: {
        slug: params.slug,
        adminId: admin.id,
      },
      select: {
        slug: true,
        title: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        ...failResponse("Invalid request", 409, e.message),
      );
    }
    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse(course));
}

export async function PUT(request, { params }) {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    description: Joi.string().min(10).max(3_000).required(),
    price: Joi.number().min(0).max(1_000_000).integer().required(),
  });

  const req = await request.json();
  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return NextResponse.json(
      ...failResponse("Invalid request format.", 403, invalidReq.error.details),
    );
  }

  const payloadAdminId = headers().get(authPayloadAccountId);

  const admin = await prisma.admin.findUnique({
    where: { id: payloadAdminId, isBlocked: false, isEmailVerified: true },
  });

  if (!admin) {
    return NextResponse.json(
      ...failResponse(
        "Unauthorized account: You do not have permission to perform this action.",
        401,
      ),
    );
  }

  let course;
  try {
    course = await prisma.course.update({
      where: {
        slug: params.slug,
        adminId: admin.id,
      },
      data: {
        title: req.title,
        description: req.description,
        price: parseInt(req.price),
        slug: createSlug(req.title),
      },
      select: {
        slug: true,
        title: true,
        description: true,
        price: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        ...failResponse("Invalid request", 409, e.message),
      );
    }
    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse(course));
}
