import prisma from "@/lib/prisma";
import { successResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET() {
  let admins = await prisma.admin.findMany();

  let team = [];
  admins.map((admin) => {
    if (!admin.isBlocked && admin.isEmailVerified) {
      team.push({ full_name: admin.fullName, image_path: admin.imagePath });
    }
  });

  return NextResponse.json(...successResponse({ team: team }));
}
