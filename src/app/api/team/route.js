import prisma from "@/lib/prisma";
import { successResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET() {
  let team = await prisma.admin.findMany({
    where: {
      isBlocked: false,
      isEmailVerified: true,
      image: { not: null },
    },
    select: {
      fullName: true,
      image: true,
    },
  });

  return NextResponse.json(...successResponse({ team: team }));
}
