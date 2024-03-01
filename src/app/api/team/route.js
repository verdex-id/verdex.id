import prisma from "@/lib/prisma";
import { utapiBaseURL } from "@/lib/uploadthing";
import { successResponse } from "@/utils/response";
import { NextResponse } from "next/server";

export async function GET() {
  let admins = await prisma.admin.findMany();

  let team = [];
  admins.map((admin) => {
    if (!admin.isBlocked && admin.isEmailVerified && admin.image) {

      team.push({ full_name: admin.fullName, image: `${utapiBaseURL}/${admin.image}`});
    }
  });

  return NextResponse.json(...successResponse({ team: team }));
}
