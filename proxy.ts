import createMiddleware from "next-intl/middleware";
import { NextResponse } from "next/server";

import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: Request) {
  const pathname = new URL(request.url).pathname;

  const response = intlMiddleware(request);

  response.headers.set("x-pathname", pathname);

  return response;
}

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
