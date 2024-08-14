import prisma from "@/lib/prisma";
import { authPayloadAccountId } from "@/middleware";
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";
import { headers } from "next/headers";

export async function fetchUserIfAuthorized() {
  const payloadUserId = headers().get(authPayloadAccountId);
  if (!payloadUserId) {
    return {
      user: null,
      errorCode: 401,
      error: "Unauthorized: You do not have permission to perform this action.",
    };
  }
  let user;
  try {
    user = await prisma.user.findUnique({
      where: { id: payloadUserId },
    });
  } catch (e) {
    if (
      e instanceof PrismaClientValidationError ||
      e instanceof PrismaClientKnownRequestError
    ) {
      return {
        user: null,
        errorCode: 401,
        error:
          "Unauthorized: You do not have permission to perform this action.",
      };
    }
    return {
      user: null,
      errorCode: 500,
      error: "Unauthorized: fail to get permission to perform this action.",
    };
  }

  return {
    user: user,
    errorCode: null,
    error: null,
  };
}
