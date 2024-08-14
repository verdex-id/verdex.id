import prisma from "@/lib/prisma";
import { fetchUserIfAuthorized } from "@/utils/check-user";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextResponse } from "next/server";

export async function GET() {
  let enrollments;
  try {
    const user = await fetchUserIfAuthorized();
    if (user.error) {
      throw new FailError(user.error, user.errorCode);
    }

    enrollments = await prisma.enrollment.findMany({
      where: {
        userId: user.user.id,
      },
      select: {
        course: {
          select: {
            slug: true,
            title: true,
          },
        },
        createdAt: true,
      },
    });
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

  return NextResponse.json(...successResponse({ enrollments }));
}
