import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { headers } from "next/headers";

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  let authorization = headers().get("authorization");


  if (authorization === null) {
    return Response.json({
      status: 401,
      message: "Authorization header is not provided.",
    });
  }

  authorization = authorization.split(" ");

  
  if (authorization.length === 0) {
    return Response.json({
      status: 401,
      message: "Authorization header is not provided.",
    });
  }

  console.log(authorization);
  console.log(`asli : ${authorization} `);

  console.log(authorization.length);

  console.log(`tipe : ${authorization[0]}`);
  console.log(`token : ${authorization[1]}`);


  if (authorization.length < 2) {
    return Response.json({
      status: 401,
      message: "Invalid authentication credentials.",
    });
  }

  if (authorization[0].toLowerCase() !== "bearer") {
    return Response.json({
      status: 401,
      message: "Unsupported authentication type.",
    });
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/needauth",
};
