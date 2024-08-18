import prisma from "@/lib/prisma";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let course;
  try {
    course = await prisma.course.findUnique({
      where: { slug: params.slug },
      select: {
        slug: true,
        title: true,
        description: true,
        image: true,
        admin: {
          select: {
            fullName: true,
          },
        },
        parts: {
          select: {
            slug: true,
            title: true,
            url: true,
            index: true,
          },
          orderBy: {
            index: "asc",
          },
        },
      },
    });

    if (!course) {
      return NextResponse.json(...failResponse("Course not found.", 404));
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

  return NextResponse.json(...successResponse({ course }));
}
