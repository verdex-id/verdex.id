import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { failResponse } from "./utils/response";
import { verifyToken } from "./lib/jwt";

export const authPayloadAccountId = "authorization_payload_account_id";

export async function middleware(request) {
  const currentPath = request.nextUrl.pathname;

  if (
    !isIncludedPath(
      ["/verify-email", "/team", "/admin/settings/image"],
      currentPath,
    )
  ) {
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

  const authRoutes = ["/api/user/settings", "/api/admin/access", "/api/admin/settings"];
  if (authRoutes.some((route) => request.nextUrl.pathname.startsWith(route))) {
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

function isIncludedPath(paths, path) {
  const regex = new RegExp(paths.map((item) => `(${item})`).join("|"));

  return regex.test(path);
}
