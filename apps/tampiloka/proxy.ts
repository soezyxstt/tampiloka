import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { locales, pathnames, routing } from "@/i18n/routing";

const handleI18nRouting = createMiddleware(routing);

function isLocalizedPublicPath(pathname: string, locale: string): boolean {
  return Object.values(pathnames).some((route) => {
    if (typeof route === "string") return route === pathname;
    return route[locale as keyof typeof route] === pathname;
  });
}

export default function proxy(request: NextRequest) {
  const [, pathLocale, ...segments] = request.nextUrl.pathname.split("/");
  const forwardedLocale = request.headers.get("x-next-intl-locale");
  const rewrittenPathname = `/${segments.join("/")}` || "/";
  const isInternalPathname = Object.prototype.hasOwnProperty.call(pathnames, rewrittenPathname);

  // Next 16 can run Proxy again for an internal rewrite; pass that locale-prefixed route through.
  if (
    locales.includes(pathLocale as (typeof locales)[number]) &&
    forwardedLocale === pathLocale &&
    (isInternalPathname || !isLocalizedPublicPath(rewrittenPathname, pathLocale))
  ) {
    return NextResponse.next({ request: { headers: request.headers } });
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
