import { NextResponse } from "next/server";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { FailError } from "@/utils/custom-error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import prisma, { prismaErrorCode } from "@/lib/prisma";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";
import { utapi } from "@/lib/uploadthing";

export async function POST(request, { params }) {
  const limit = 2;
  const sizeLimit = limit * 1024 * 1024;
  const imageType = "image";

  let course;
  try {
    const admin = await fetchAdminIfAuthorized();
    if (admin.error) {
      throw new FailError(admin.error, admin.errorCode);
    }

    const formData = await request.formData();
    const file = formData.get("image_file");

    if (!file) {
      throw new FailError("No image file received", 400);
    }

    if (!hasExactlyOneDot(file.name)) {
      throw new FailError(
        "Invalid file name",
        400,
        "Only one dot in file name is allowed",
      );
    }

    if (!isMatch(imageType, file.type)) {
      throw new FailError(
        "Invalid file type. Please upload an image file",
        415,
      );
    }

    if (file.size > sizeLimit) {
      throw new FailError(
        `File size exceeds the maximum limit of ${limit}MB`,
        413,
      );
    }

    const upload = await utapi.uploadFiles(file);

    course = await prisma.course.update({
      where: {
        id: parseInt(params.courseId),
        adminId: admin.id,
      },
      data: {
        image: upload.data.key,
      },
      select: {
        slug: true,
        title: true,
        description: true,
        price: true,
        crossOutPrice: true,
        image: true,
      },
    });
  } catch (e) {
    if (
      e instanceof TypeError &&
      e.message.includes("Could not parse content as FormData")
    ) {
      return NextResponse.json(
        ...failResponse("Invalid image file", 400, e.message),
      );
    }
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

  return NextResponse.json(...successResponse({ course }));
}

function isMatch(pattern, str) {
  const regex = new RegExp(`^${pattern}`);
  return regex.test(str);
}

function hasExactlyOneDot(str) {
  const dotCount = (str.match(/\./g) || []).length;
  return dotCount === 1;
}
