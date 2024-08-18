import prisma from "@/lib/prisma";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { Prisma } from "@prisma/client";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let part;
  try {
    part = await prisma.part.findUnique({
      where: {
        slug: params.partSlug,
      },
      select: {
        slug: true,
        title: true,
        url: true,
        index: true,
        course: {
          select: {
            slug: true,
            title: true,
          },
        },
      },
    });

    if (!part) {
      throw new FailError("Part not found.", 404);
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

  return NextResponse.json(...successResponse(part));
}
