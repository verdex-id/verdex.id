import prisma from "@/lib/prisma";
import { failResponse, successResponse } from "@/utils/response";
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
