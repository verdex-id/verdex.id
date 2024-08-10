import prisma from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";
import { FailError } from "@/utils/custom-error";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { createSlug } from "@/utils/slugify";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  let part;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    part = await prisma.part.findUnique({
      where: { id: parseInt(params.partId) },
      select: {
        id: true,
        slug: true,
        title: true,
        url: true,
        requiresPurchase: true,
        index: true,
        createdAt: true,
        courseId: true,
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

export async function PATCH(request, { params }) {
  let updatedPart;
  try {
    const schema = Joi.object({
      title: Joi.string()
        .pattern(/^[a-zA-Z0-9\s_()&/\[\].,=-]+$/)
        .min(3)
        .max(70)
        .required(),
      url: Joi.string().uri().required(),
      require_purchase: Joi.boolean().allow("true", "false").required(),
      index: Joi.number().min(1),
    });

    let req = await request.json();
    req = schema.validate(req);
    if (req.error) {
      throw new FailError("invalid request format.", 403, req.error.details);
    }
    req = req.value;

    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    if (req.index) {
      let newIndex = req.index;
      const targetedPart = await prisma.part.findUnique({
        where: {
          id: parseInt(params.partId),
        },
        select: {
          index: true,
          id: true,
        },
      });

      let lastIndex = await prisma.part.findFirst({
        orderBy: {
          index: "desc",
        },
        select: {
          index: true,
          id: true,
        },
      });

      prisma.$transaction(async (tx) => {
        if (newIndex > targetedPart.index) {
          if (newIndex > lastIndex.index) {
            newIndex = lastIndex.index;
          }
          updatedPart = await tx.part.update({
            where: {
              id: targetedPart.id,
            },
            data: {
              title: req.title,
              slug: createSlug(req.title),
              url: req.url,
              requiresPurchase: req.require_purchase,
              index: newIndex,
            },
          });

          await tx.part.updateMany({
            where: {
              index: {
                gt: targetedPart.index,
                lt: newIndex + 1,
              },
              id: {
                not: targetedPart.id,
              },
            },
            data: {
              index: {
                decrement: 1,
              },
            },
          });
        } else if (newIndex < targetedPart.index) {
          if (newIndex < 1) {
            newIndex = 1;
          }

          updatedPart = await tx.part.update({
            where: {
              id: targetedPart.id,
            },
            data: {
              title: req.title,
              slug: createSlug(req.title),
              url: req.url,
              requiresPurchase: req.require_purchase,
              index: newIndex,
            },
          });

          await tx.part.updateMany({
            where: {
              index: {
                lt: targetedPart.index,
                gt: newIndex - 1,
              },
              id: {
                not: targetedPart.id,
              },
            },
            data: {
              index: {
                increment: 1,
              },
            },
          });
        } else {
          updatedPart = await tx.part.update({
            where: {
              id: targetedPart.id,
            },
            data: {
              title: req.title,
              slug: createSlug(req.title),
              url: req.url,
              requiresPurchase: req.require_purchase,
            },
          });
        }
      // console.log(updatedPart);
      });
    } else {
      updatedPart = await prisma.part.update({
        where: {
          id: parseInt(params.partId),
        },
        data: {
          title: req.title,
          slug: createSlug(req.title),
          url: req.url,
          requiresPurchase: req.require_purchase,
        },
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

  return NextResponse.json(...successResponse(updatedPart));
}

export async function DELETE(req, { params }) {
  let deletedPart;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    let lastIndex = await prisma.part.findFirst({
      orderBy: {
        index: "desc",
      },
      select: {
        index: true,
        id: true,
      },
    });

    const targetPartId = parseInt(params.partId);

    if (lastIndex.id === targetPartId) {
      deletedPart = await prisma.part.delete({
        where: {
          id: targetPartId,
        },
        select: {
          id: true,
          slug: true,
          title: true,
          url: true,
          index: true,
          courseId: true,
        },
      });
    } else {
      prisma.$transaction(async (tx) => {
        deletedPart = await prisma.part.delete({
          where: {
            id: targetPartId,
          },
          select: {
            id: true,
            slug: true,
            title: true,
            url: true,
            index: true,
            courseId: true,
          },
        });

        await tx.part.updateMany({
          where: {
            index: {
              gt: deletedPart.index,
            },
          },
          data: {
            index: {
              decrement: 1,
            },
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

  return NextResponse.json(...successResponse(deletedPart));
}
