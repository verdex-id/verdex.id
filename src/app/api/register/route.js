import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Endpoint POST /api/register
 * create an user
 */
export async function POST(request) {
  const req = await request.json();

  // TODO : create hashing password function

  const arg = {
    data: {
      full_name: req.full_name,
      hashed_password: req.password,
      email: req.email,
    },
  };

  const user = await prisma.user.create(arg);

  console.log(user);

  const res = {
    "full_name" : user.full_name,
    "email" : user.email
  }

  return Response.json({
    status: 200,
    data: res,
    error: null,
  });
}
