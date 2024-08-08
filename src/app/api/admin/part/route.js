import prisma from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { createSlug } from "@/utils/slugify";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function POST(request) {
  let part;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    const schema = Joi.object({
      course_id: Joi.number().integer().required(),
      title: Joi.string()
        .pattern(/^[a-zA-Z0-9\s_()&/\[\].,=-]+$/)
        .min(3)
        .max(70)
        .required(),
      url: Joi.string().uri().required(),
      index: Joi.number().min(1),
    });

    let req = await request.json();
    req = schema.validate(req);
    if (req.error) {
      throw new FailError("invalid request format.", 403, req.error.details);
    }
    req = req.value;

    let newIndex = req.index;
    let lastIndex = await prisma.part.findFirst({
      orderBy: {
        index: "desc",
      },
    });

    if (!lastIndex) {
      part = await prisma.part.create({
        data: {
          courseId: req.course_id,
          title: req.title,
          slug: createSlug(req.title),
          url: req.url,
          index: 1,
        },
      });
    } else if (!newIndex || newIndex > lastIndex.index) {
      part = await prisma.part.create({
        data: {
          courseId: req.course_id,
          title: req.title,
          slug: createSlug(req.title),
          url: req.url,
          index: lastIndex.index + 1,
        },
      });
    } else if (newIndex >= 1 && newIndex <= lastIndex.index) {
      prisma.$transaction(async (tx) => {
        await tx.part.updateMany({
          where: {
            index: {
              gt: newIndex - 1,
            },
          },
          data: {
            index: {
              increment: 1,
            },
          },
        });

        part = await tx.part.create({
          data: {
            courseId: req.course_id,
            title: req.title,
            slug: createSlug(req.title),
            url: req.url,
            index: newIndex,
          },
        });
      });
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
