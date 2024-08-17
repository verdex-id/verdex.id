import prisma from "@/lib/prisma";
import { utapi } from "@/lib/uploadthing";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { createSlug } from "@/utils/slugify";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let course;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    course = await prisma.course.findUnique({
      where: { id: parseInt(params.courseId) },
      select: {
        id: true,
        slug: true,
        title: true,
        description: true,
        image: true,
        createdAt: true,
        admin: {
          select: {
            fullName: true,
          },
        },
        parts: {
          select: {
            id: true,
            slug: true,
            title: true,
            url: true,
            index: true,
            createdAt: true,
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    if (!course) {
      throw new FailError("Course not found.", 404);
    }
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

export async function DELETE(req, { params }) {
  let deletedCourse;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    deletedCourse = await prisma.course.delete({
      where: {
        id: parseInt(params.courseId),
        adminId: admin.id,
      },
      select: {
        slug: true,
        title: true,
        image: true,
      },
    });

    if (deletedCourse.image) {
      await utapi.deleteFiles(deletedCourse.image);
    }
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

  return NextResponse.json(...successResponse(deletedCourse));
}

export async function PUT(request, { params }) {
  let course;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    const schema = Joi.object({
      title: Joi.string().min(2).max(100).required(),
      description: Joi.string().min(10).max(3_000).required(),
    });

    let req = await request.json();
    req = schema.validate(req);
    if (req.error) {
      throw new FailError("invalid request format.", 403, req.error.details);
    }
    req = req.value;

    const courseData = {
      title: req.title,
      description: req.description,
      slug: createSlug(req.title),
    };

    course = await prisma.course.update({
      where: {
        id: parseInt(params.courseId),
        adminId: admin.id,
      },
      data: courseData,
      select: {
        slug: true,
        title: true,
        description: true,
        image: true,
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
