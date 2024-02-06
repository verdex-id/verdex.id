import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Endpoint POST /api/user
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

  return Response.json({
    status: 200,
    data: user,
    error: null,
  });
}

/**
 * Endpoint GET /api/user?_id=<yourshittyid>
 * get an user
 */
export async function GET(request) {
  const url = new URL(request.url);
  const _id = url.searchParams.get("_id");

  const arg = {
    where: {
      id: _id,
    },
  };

  const user = await prisma.user.findUnique(arg);

  return Response.json({
    status: 200,
    data: user,
    error: null,
  });
}
