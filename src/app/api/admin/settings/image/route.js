import prisma from "@/lib/prisma";
import { errorResponse, failResponse, successResponse } from "@/utils/response";
import { utapi, utapiBaseURL } from "@/lib/uploadthing";
import { NextResponse } from "next/server";
import { fetchAdminIfAuthorized } from "@/utils/check-admin";

export async function POST(request) {
  const sizeLimit = 2 * 1024 * 1024;
  const imageType = "image";

  let admin = await fetchAdminIfAuthorized();
  if (admin.error) {
    return NextResponse.json(...failResponse(admin.error, admin.errorCode));
  }

  admin = admin.admin;

  let formData;
  try {
    formData = await request.formData();
  } catch (e) {
    if (
      e instanceof TypeError &&
      e.message.includes("Could not parse content as FormData")
    ) {
      return NextResponse.json(
        ...failResponse("Invalid request format.", 400, e.message),
      );
    }
    return NextResponse.json(...errorResponse());
  }

  const file = formData.get("image_file");

  if (!file) {
    return NextResponse.json(...errorResponse());
  }
  if (!isMatch(imageType, file.type)) {
    return NextResponse.json(
      ...failResponse("Invalid file type. Please upload an image file.", 415),
    );
  }
  if (file.size > sizeLimit) {
    return NextResponse.json(
      ...failResponse("File size exceeds the maximum limit of 2MB.", 413),
    );
  }

  let upload;
  try {
    if (admin.image) {
      await utapi.deleteFiles(admin.image);
    }

    upload = await utapi.uploadFiles(file);

    admin = await prisma.admin.update({
      where: { id: admin.id },
      data: {
        image: upload.data.key,
      },
      select: {
        image: true,
      },
    });
  } catch (e) {
    return NextResponse.json(...errorResponse());
  }

  const res = {
    image: `${utapiBaseURL}/${admin.image}`,
  };

  return NextResponse.json(...successResponse(res));
}

function isMatch(pattern, str) {
  const regex = new RegExp(`^${pattern}`);
  return regex.test(str);
}
