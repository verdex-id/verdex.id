import prisma, { prismaErrorCode } from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import Joi from "joi";
import { NextResponse } from "next/server";
import { FailError } from "@/utils/custom-error";
import { utapi } from "@/lib/uploadthing";

export async function GET(req, { params }) {
  let banner;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    const schema = Joi.object({
      banner_id: Joi.number().required(),
    });
    let req = schema.validate({
      banner_id: params.bannerId,
    });
    if (req.error) {
      throw new FailError("Invalid request format", 403, req.error.details);
    }
    req = req.value;

    banner = await prisma.banner.findUnique({
      where: {
        bannerId: req.banner_id,
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

  return NextResponse.json(...successResponse({ banner: banner }));
}

export async function PATCH(request, { params }) {
  let banner;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    const schema = Joi.object({
      banner_id: Joi.number().required(),
      banner_url: Joi.string().uri().required(),
    });
    let req = await request.json();
    req = schema.validate({
      banner_id: params.bannerId,
      ...req,
    });
    if (req.error) {
      throw new FailError("Invalid request format", 403, req.error.details);
    }
    req = req.value;

    banner = await prisma.banner.update({
      where: {
        bannerId: req.banner_id,
      },
      data: {
        bannerUrl: req.banner_url,
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

  return NextResponse.json(...successResponse({ updated_banner: banner }));
}

export async function DELETE(request, { params }) {
  let deletedBanner;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    const schema = Joi.object({
      banner_id: Joi.number().required(),
    });
    let req = schema.validate({
      banner_id: params.bannerId,
    });
    if (req.error) {
      throw new FailError("Invalid request format", 403, req.error.details);
    }
    req = req.value;

    deletedBanner = await prisma.banner.delete({
      where: {
        bannerId: req.banner_id,
      },
    });

    await utapi.deleteFiles(deletedBanner.image);
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

  return NextResponse.json(
    ...successResponse({
      deleted_banner: {
        banner_id: deletedBanner.bannerId,
        banner_url: deletedBanner.bannerUrl,
      },
    }),
  );
}
