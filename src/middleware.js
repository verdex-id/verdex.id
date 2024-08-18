import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { failResponse } from "./utils/response";
import { verifyToken } from "./lib/jwt";

export const authPayloadAccountId = "authorization_payload_account_id";

export async function middleware(request) {
  const jsonRoutes = [
    ["/api/admin/verify-email"],
    ["/api/team"],
    ["/api/admin/settings/image"],
    ["/api/course", ["GET"]],
    ["/api/admin/course", ["GET", "DELETE"]],
    ["/api/admin/course/image", ["POST"]],
    ["/api/admin/banner", ["GET", "POST", "DELETE"]],
    ["/api/part", ["GET"]],
    ["/api/admin/part", ["GET", "DELETE"]],
  ];

  if (!checkRoute(jsonRoutes, request)) {
    try {
      await request.json();
    } catch (e) {
      if (e instanceof SyntaxError) {
        return NextResponse.json(
          ...failResponse(
            "You better watch your request/JSON or I ki** you",
            400,
            {
              name: e.name,
              message: e.message,
            },
          ),
        );
      }
    }
  }

  const authRoutes = [
    ["/api/admin/settings"],
    ["/api/admin/access"],
    ["/api/admin/course"],
    ["/api/admin/part"],
    ["/api/admin/banner"],
  ];

  if (checkRoute(authRoutes, request)) {
    let authorization = headers().get("authorization");
    if (authorization === null) {
      return Response.json(
        ...failResponse("Authorization header is not provided.", 401),
      );
    }

    authorization = authorization.split(" ");

    if (authorization.length === 0) {
      return Response.json(
        ...failResponse("Authorization header is not provided.", 401),
      );
    }

    if (authorization.length < 2) {
      return Response.json(
        ...failResponse("Authorization header is not valid.", 401),
      );
    }

    if (authorization[0].toLowerCase() !== "bearer") {
      return Response.json(
        ...failResponse("Unsupported authentication type.", 401),
      );
    }

    const [isValid, payload] = await verifyToken(authorization[1]);
    if (!isValid) {
      return Response.json(
        ...failResponse("token has expired or is invalid.", 401),
      );
    }

    if (!payload.accountId) {
      return NextResponse.json(...errorResponse());
    }

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set(authPayloadAccountId, payload.accountId);

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }
}

export const config = {
  matcher: ["/api/:path*"],
};

function checkRoute(routes, request) {
  return routes.some((route) => {
    if (request.nextUrl.pathname.startsWith(route[0])) {
      if (route[1]) {
        return route[1].some((method) => method === request.method);
      }
      return true;
    }
    return false;
  });
}
