import prisma from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET() {
  let courses;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    courses = await prisma.course.findMany({
      where: {
        adminId: admin.admin.id,
      },
      select: {
        id: true,
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

    if (e instanceof FailError) {
      return NextResponse.json(...failResponse(e.message, e.code, e.detail));
    }

    return NextResponse.json(...errorResponse());
  }

  return NextResponse.json(...successResponse({ courses: courses }));
}
