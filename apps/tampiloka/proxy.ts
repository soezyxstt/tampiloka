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

export default async function proxy(request: NextRequest) {
  const publicForm = /^\/f\/([^/]+)\/?$/.exec(request.nextUrl.pathname);
  if (publicForm && ["GET", "HEAD"].includes(request.method)) {
    const { getPublicForm, FormError } = await import("@/lib/forms/service");
    try { await getPublicForm(decodeURIComponent(publicForm[1])); }
    catch (error) {
      if (error instanceof FormError && error.status === 410) return new NextResponse(request.method === "HEAD" ? null : '<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Formulir ditutup | Tampiloka</title></head><body><main><h1>Formulir sudah ditutup</h1><p>Formulir ini tidak lagi menerima jawaban.</p></main></body></html>', { status: 410, headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "X-Robots-Tag": "noindex, nofollow" } });
    }
  }
  if (/^\/(admin|f)(\/|$)/.test(request.nextUrl.pathname)) return NextResponse.next();

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
