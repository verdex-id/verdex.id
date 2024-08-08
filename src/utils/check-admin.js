import prisma from "@/lib/prisma";
import { authPayloadAccountId } from "@/middleware";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { headers } from "next/headers";

export async function fetchAdminIfAuthorized() {
  const payloadAdminId = headers().get(authPayloadAccountId);
  if (!payloadAdminId) {
    return {
      admin: null,
      errorCode: 401,
      error: "Unauthorized: You do not have permission to perform this action.",
    };
  }
  let admin;
  try {
    admin = await prisma.admin.findUnique({
      where: { id: payloadAdminId },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return {
        admin: null,
        errorCode: 401,
        error:
          "Unauthorized: You do not have permission to perform this action.",
      };
    }
    return {
      admin: null,
      errorCode: 500,
      error: "Unauthorized: fail to get permission to perform this action.",
    };
  }

  return {
    admin: admin,
    errorCode: null,
    error: null,
  };
}
