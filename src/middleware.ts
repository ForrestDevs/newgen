// middleware.ts
import { verifyRequestOrigin } from "lucia";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { api } from "./lib/trpc/server";
import { env } from "./lib/env.mjs";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  if (request.method === "GET") {
    return NextResponse.next();
  }
  const originHeader = request.headers.get("Origin");
  const hostHeader = request.headers.get("Host");
  if (
    !originHeader ||
    !hostHeader ||
    !verifyRequestOrigin(originHeader, [hostHeader])
  ) {
    return new NextResponse(null, {
      status: 403,
    });
  }


  // const hasAccss = await api.user.userHasCourse.query({ courseId: env.NEXT_PUBLIC_ROCKET_FUEL_COURSE_ID })

  // if (request.nextUrl.pathname.startsWith('/rocketfuel') && !hasAccss.hasCourse) {
  //   return new NextResponse.redirect()
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|static|.*\\..*|_next|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
