import { defineRouting } from "next-intl/routing";

export const locales = ["id", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "id";

/** Internal paths stay Indonesian; next-intl maps them to the public URL per locale. */
export const pathnames = {
  "/": "/",
  "/produk": { id: "/produk", en: "/work" },
  "/templates": "/templates",
  "/layanan": { id: "/layanan", en: "/services" },
  "/paket": { id: "/paket", en: "/pricing" },
  "/tentang": { id: "/tentang", en: "/about" },
  "/contact": { id: "/contact", en: "/contact" },
} as const;
export type InternalPathname = keyof typeof pathnames;

function isInternalPathname(pathname: string): pathname is InternalPathname {
  return Object.prototype.hasOwnProperty.call(pathnames, pathname);
}

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
  localeDetection: false,
  pathnames,
});

/** Build a public URL for an internal route while retaining its query and hash. */
export function localePath(locale: Locale, href: string): string {
  const suffixIndex = href.search(/[?#]/);
  const pathname = suffixIndex === -1 ? href : href.slice(0, suffixIndex);
  const suffix = suffixIndex === -1 ? "" : href.slice(suffixIndex);
  const route = pathnames[pathname as keyof typeof pathnames];
  const localizedPath = typeof route === "string" ? route : route?.[locale] ?? pathname;

  if (locale === defaultLocale) return `${localizedPath}${suffix}`;
  return `${localizedPath === "/" ? "/en" : `/en${localizedPath}`}${suffix}`;
}

/** Convert a site-internal href to a typed next-intl URL object. */
export function toLocalizedHref(href: string): {
  pathname: InternalPathname;
  query?: Record<string, string | string[]>;
  hash?: string;
} {
  const url = new URL(href, "https://tampiloka.invalid");
  const pathname = url.pathname;
  if (!isInternalPathname(pathname)) {
    throw new Error(`Unknown internal route: ${pathname}`);
  }

  const query: Record<string, string | string[]> = {};
  for (const key of new Set(url.searchParams.keys())) {
    const values = url.searchParams.getAll(key);
    query[key] = values.length === 1 ? values[0] : values;
  }

  return {
    pathname,
    ...(Object.keys(query).length ? { query } : {}),
    ...(url.hash ? { hash: url.hash } : {}),
  };
}
