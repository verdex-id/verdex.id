import prisma from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { createSlug } from "@/utils/slugify";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function GET() {
  let courses;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    courses = await prisma.course.findMany({
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        price: true,
        crossOutPrice: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        ...failResponse("Invalid request", 409, e.message),
      );
    }

    if (e instanceof FailError) {
      return NextResponse.json(...failResponse(e.message, e.code, e.detail));
    }

    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse({ courses: courses }));
}

export async function POST(request) {
  let course;
  try {
    const schema = Joi.object({
      title: Joi.string().min(2).max(100).required(),
      description: Joi.string().min(10).max(3_000).required(),
      crossout_price: Joi.number().min(0).max(1_000_000).integer(),
      price: Joi.alternatives().conditional("crossout_price", {
        not: null,
        then: Joi.number().min(0).max(1_000_000).integer().required(),
        otherwise: Joi.number().min(0).max(1_000_000).integer(),
      }),
    });

    let req = await request.json();
    req = schema.validate(req);
    if (req.error) {
      throw new FailError("invalid request format.", 403, req.error.details);
    }
    req = req.value;

    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    const courseData = {
      title: req.title,
      description: req.description,
      slug: createSlug(req.title),
      adminId: admin.admin.id,
    };

    if (req.price) {
      courseData["price"] = parseInt(req.price);
    }

    if (req.crossout_price) {
      courseData["crossOutPrice"] = parseInt(req.crossout_price);
    }

    course = await prisma.course.create({
      data: courseData,
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        price: true,
        crossOutPrice: true,
      },
    });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return NextResponse.json(
        ...failResponse("Invalid request", 409, e.message),
      );
    }

    if (e instanceof FailError) {
      return NextResponse.json(...failResponse(e.message, e.code, e.detail));
    }

    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse(course));
}
