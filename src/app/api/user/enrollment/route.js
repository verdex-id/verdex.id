import prisma, { prismaErrorCode } from "@/lib/prisma";
import { fetchUserIfAuthorized } from "@/utils/check-user";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function POST(request) {
  const res = {};
  try {
    const user = await fetchUserIfAuthorized();
    if (user.error) {
      throw new FailError(user.error, user.errorCode);
    }

    const schema = Joi.object({
      course_slug: Joi.string().min(2).max(100).required(),
    });

    let req = await request.json();
    req = schema.validate(req);
    if (req.error) {
      throw new FailError("invalid request format.", 403, req.error.details);
    }
    req = req.value;

    const course = await prisma.course.findUnique({
      where: {
        slug: req.course_slug,
      },
      select: {
        price: true,
        enrollments: {
          where: {
            userId: user.user.id,
          },
        },
      },
    });

    if (!course) {
      throw new FailError("Course not found.", 404);
    }

    if (course.enrollments.length >= 1) {
      // TODO: redirect to course page
      return NextResponse.redirect(`${process.env.BASE_URL}`);
    }

    if (course.price === 0 || !course.price) {
      const enrollment = await prisma.enrollment.create({
        data: {
          courseId: course.id,
          userId: user.user.id,
        },
        select: {
          user: {
            select: {
              fullName: true,
              email: true,
            },
          },
          course: {
            select: {
              slug: true,
              title: true,
            },
          },
          createdAt: true,
        },
      });

      res["enrollment"] = enrollment;
      // TODO: redirect to course page
      return NextResponse.redirect(`${process.env.BASE_URL}`);
    } else {
      // TODO: redirect to order page
      return NextResponse.redirect(`${process.env.BASE_URL}`);
    }
  } catch (e) {
    if (e instanceof PrismaClientKnownRequestError) {
      if (e.code === "P2025") {
        return NextResponse.json(
          ...failResponse(`${e.meta.modelName} not found`, 404),
        );
      }
      return NextResponse.json(
        ...failResponse(prismaErrorCode[e.code], 409, e.meta.modelName),
      );
    }

    if (e instanceof FailError) {
      return NextResponse.json(...failResponse(e.message, e.code, e.detail));
    }

    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse(res));
}
