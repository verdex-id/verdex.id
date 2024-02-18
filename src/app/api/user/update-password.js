import { headers } from "next/headers";
import { Prisma } from "@prisma/client";
import Joi from "joi";
import { failResponse, successResponse, errorResponse } from "@/utils/response";
import { authPayloadUserId } from "@/middleware";
import { comparePassword, hashPassword } from "@/lib/password";

export async function updatePassword(req, prisma) {
  let schema;
  let arg;
  let user;
  const payloadUserId = headers().get(authPayloadUserId);

  schema = Joi.object({
    password: Joi.string().required(),
    new_password: Joi.string()
      .pattern(new RegExp("^[a-zA-Z0-9 ]{3,30}$"))
      .min(6)
      .required(),
  });

  const invalidReq = schema.validate(req);
  if (invalidReq.error) {
    return [
      null,
      failResponse("Invalid request format.", 403, invalidReq.error.details),
    ];
  }

  user = await prisma.user.findUnique({
    where: {
      id: payloadUserId,
    },
  });
  if (!user) {
    return [null, errorResponse()];
  }

  const isCorrectPassword = await comparePassword(
    req.password,
    user.hashedPassword,
  );

  if (!isCorrectPassword) {
    return [null, failResponse("Password incorrect.", 401)];
  }

  const newHashedPassword = await hashPassword(req.new_password);
  if (!newHashedPassword) {
    return [null, errorResponse()];
  }

  arg = {
    where: {
      id: user.id,
      hashedPassword: user.hashedPassword,
    },
    data: {
      hashedPassword: newHashedPassword,
    },
  };

  try {
    user = await prisma.user.update(arg);
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      return [null, failResponse("Invalid request", 409)];
    }
    return [null, errorResponse()];
  }
  return [successResponse({ message: "Password successfully updated" }), null];
}
