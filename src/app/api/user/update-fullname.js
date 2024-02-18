import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { authPayloadUserId } from "@/middleware";
import { prismaErrorCode } from "@/utils/prisma";

export async function updateFullName(req, prisma) {
  let schema;
  let arg;
  let user;
  const payloadUserId = headers().get(authPayloadUserId);

  schema = Joi.object({
    full_name: Joi.string()
      .pattern(/^[A-Za-z\s']+$/)
      .min(3)
      .required(),
  });

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return [
      null,
      failResponse("Invalid request format.", 403, invalidReq.error.details),
    ];
  }

  arg = {
    where: {
      id: payloadUserId,
      NOT: {
        fullName: req.full_name
      }
    },
    data: {
      fullName: req.full_name,
    },
  };

  try {
    user = await prisma.user.update(arg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return [null, failResponse(prismaErrorCode[e.code], 409)];
    }
    return [null, errorResponse()];
  }

  return [successResponse({ full_name: user.fullName }), null];
}
