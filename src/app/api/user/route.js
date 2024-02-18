import { failResponse } from "@/utils/response";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { updatePassword } from "./update-password";
import { updateFullName } from "./update-fullname";
import { updateEmail } from "./update-email";

const prisma = new PrismaClient();

export async function PUT(request) {
  const req = await request.json();
  let successResult;
  let unSuccessResult;

  if (req.full_name && !req.new_password && !req.new_email) {
    [successResult, unSuccessResult] = await updateFullName(req, prisma);
  } else if (!req.full_name && req.new_password && !req.new_email) {
    [successResult, unSuccessResult] = await updatePassword(req, prisma);
  } else if (!req.full_name && !req.new_password && req.new_email) {
    [successResult, unSuccessResult] = await updateEmail(req, prisma);
  } else {
    return NextResponse.json(...failResponse("Invalid request format.", 403));
  }

  if (unSuccessResult) {
    return NextResponse.json(...unSuccessResult);
  }

  return NextResponse.json(...successResult);
}
