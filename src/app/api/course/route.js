import prisma from "@/lib/prisma";
import { successResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET() {
  let courses = await prisma.course.findMany({
    select: { slug: true, title: true, description: true, price: true },
  });

  return NextResponse.json(...successResponse({ courses: courses }));
}
