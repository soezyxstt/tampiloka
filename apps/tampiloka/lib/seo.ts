import type { Metadata } from "next";
import { defaultLocale, localePath, type Locale } from "@/i18n/routing";
import { CONTACT, SOCIAL_PROFILES } from "@/lib/contact-links";

export { CONTACT, SOCIAL_PROFILES } from "@/lib/contact-links";

const DEFAULT_SITE_ORIGIN = "https://tampiloka.site";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_ORIGIN;
const parsedSiteUrl = new URL(configuredSiteUrl);

if (parsedSiteUrl.protocol !== "https:" && parsedSiteUrl.protocol !== "http:") {
  throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
}

export const SITE_NAME = "Tampiloka";
export const SITE_ORIGIN = parsedSiteUrl.origin;
export const SITE_METADATA_BASE = new URL(SITE_ORIGIN);
export const SITE_LANGUAGE = "id-ID";
export const SITE_LOCALE = "id_ID";
export const SITE_DESCRIPTION =
  "Tampiloka merancang dan membangun website, aplikasi web, serta identitas visual untuk bisnis. Undangan pernikahan digital tersedia melalui Temura.";
export const SITE_DESCRIPTIONS: Record<Locale, string> = {
  id: SITE_DESCRIPTION,
  en: "Tampiloka designs and builds websites, web apps, and visual identities for businesses. Digital wedding invitations are available through Temura.",
};

/**
 * Bump the matching date whenever the visible content of a public page changes.
 * Google uses lastmod in the sitemap to schedule recrawls, so inaccurate values are ignored.
 */
export const SITE_UPDATED_AT = "2026-10-24";

export const SOCIAL_HANDLE = "@soezyxsttt";

export const DEFAULT_SOCIAL_IMAGE = {
  path: "/brand/social/light/tampiloka-og-image-light.png",
  alt: "Tampiloka, studio desain dan pengembangan website.",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

export function absoluteSiteUrl(path: string): string {
  return new URL(path, SITE_METADATA_BASE).toString();
}

export function localizedSiteUrl(locale: Locale, path: string): string {
  const match = path.match(/^([^?#]*)([?#].*)?$/);
  const pathname = match?.[1] || "/";
  const suffix = match?.[2] || "";
  const localizedPath = localePath(locale, pathname as PublicPagePath);
  return absoluteSiteUrl(`${localizedPath}${suffix}`);
}

export function localeLanguage(locale: Locale): "id-ID" | "en" {
  return locale === "en" ? "en" : "id-ID";
}

export function localeOpenGraph(locale: Locale): "id_ID" | "en_US" {
  return locale === "en" ? "en_US" : "id_ID";
}

export function siteDescription(locale: Locale = defaultLocale): string {
  return SITE_DESCRIPTIONS[locale];
}

export const DEFAULT_SOCIAL_IMAGE_URL = absoluteSiteUrl(DEFAULT_SOCIAL_IMAGE.path);
export const LOGO_URL = absoluteSiteUrl("/brand/social/light/tampiloka-profile-light.png");

export const PUBLIC_PAGE_PATHS = [
  "/",
  "/layanan",
  "/paket",
  "/produk",
  "/industri",
  "/tentang",
  "/contact",
] as const;

export type PublicPagePath = (typeof PUBLIC_PAGE_PATHS)[number];

type PageSitemapDetails = {
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  updatedAt: string;
  images?: readonly string[];
};

export const PUBLIC_PAGES: Record<PublicPagePath, PageSitemapDetails> = {
  "/paket": {
    priority: 0.9,
    changeFrequency: "monthly",
    updatedAt: "2026-10-23",
  },
  "/": {
    priority: 1,
    changeFrequency: "monthly",
    updatedAt: SITE_UPDATED_AT,
    images: ["/images/service-overview.webp"],
  },
  "/layanan": {
    priority: 0.9,
    changeFrequency: "monthly",
    updatedAt: SITE_UPDATED_AT,
    images: [
      "/images/service-overview.webp",
      "/images/service-website.webp",
      "/images/service-digital-product.webp",
      "/images/service-development.webp",
      "/images/service-branding.webp",
      "/images/service-digital-invitation.webp",
    ],
  },
  "/produk": {
    priority: 0.9,
    changeFrequency: "weekly",
    updatedAt: SITE_UPDATED_AT,
    images: ["/images/service-website.webp"],
  },
  "/industri": {
    priority: 0.8,
    changeFrequency: "monthly",
    updatedAt: SITE_UPDATED_AT,
    images: ["/images/industry-overview.webp"],
  },
  "/tentang": {
    priority: 0.7,
    changeFrequency: "yearly",
    updatedAt: SITE_UPDATED_AT,
    images: ["/images/about-studio.webp"],
  },
  "/contact": {
    priority: 0.8,
    changeFrequency: "yearly",
    updatedAt: SITE_UPDATED_AT,
    images: ["/images/studio-workspace.webp"],
  },
};

export const DEFAULT_ROBOTS: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    noimageindex: false,
    "max-video-preview": -1,
    "max-image-preview": "large",
    "max-snippet": -1,
  },
};

function readEnvironment(name: string): string | undefined {
  const value = process.env[name]?.trim();
  return value ? value : undefined;
}

/**
 * Search Console verification tokens. Set the values in the deployment environment
 * and redeploy; the tags are rendered into the document head at build time.
 */
export function siteVerification(): Metadata["verification"] {
  const google = readEnvironment("NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION") ?? readEnvironment("GOOGLE_SITE_VERIFICATION");
  const yandex = readEnvironment("NEXT_PUBLIC_YANDEX_SITE_VERIFICATION") ?? readEnvironment("YANDEX_SITE_VERIFICATION");
  const bing = readEnvironment("NEXT_PUBLIC_BING_SITE_VERIFICATION") ?? readEnvironment("BING_SITE_VERIFICATION");

  if (!google && !yandex && !bing) return undefined;

  return {
    ...(google ? { google } : {}),
    ...(yandex ? { yandex } : {}),
    ...(bing ? { other: { "msvalidate.01": bing } } : {}),
  };
}

type PageMetadataOptions = {
  path: PublicPagePath;
  locale?: Locale;
  title: string;
  description: string;
  imageAlt: string;
  imagePath?: string;
  imageWidth?: number;
  imageHeight?: number;
};

export function createPageMetadata({
  path,
  locale = defaultLocale,
  title,
  description,
  imageAlt,
  imagePath,
  imageWidth = 1800,
  imageHeight = 1005,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = localizedSiteUrl(locale, path);
  const languageAlternates = {
    id: localizedSiteUrl("id", path),
    en: localizedSiteUrl("en", path),
    "x-default": localizedSiteUrl(defaultLocale, path),
  };
  const socialTitle = `${title} | ${SITE_NAME}`;
  const image = imagePath
    ? {
        url: absoluteSiteUrl(imagePath),
        alt: imageAlt,
        width: imageWidth,
        height: imageHeight,
        type: imagePath.endsWith(".png") ? "image/png" : "image/webp",
      }
    : {
        url: DEFAULT_SOCIAL_IMAGE_URL,
        alt: DEFAULT_SOCIAL_IMAGE.alt,
        width: DEFAULT_SOCIAL_IMAGE.width,
        height: DEFAULT_SOCIAL_IMAGE.height,
        type: DEFAULT_SOCIAL_IMAGE.type,
      };

  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: canonicalUrl, languages: languageAlternates },
    openGraph: {
      type: "website",
      locale: localeOpenGraph(locale),
      siteName: SITE_NAME,
      title: socialTitle,
      description,
      url: canonicalUrl,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      site: SOCIAL_HANDLE,
      creator: SOCIAL_HANDLE,
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

type JsonLdNode = Record<string, unknown>;

export const ORGANIZATION_ID = `${SITE_ORIGIN}/#organization`;
export const WEBSITE_ID = `${SITE_ORIGIN}/#website`;

export function organizationSchema(locale: Locale = defaultLocale): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: SITE_NAME,
    url: SITE_ORIGIN,
    description: siteDescription(locale),
    inLanguage: localeLanguage(locale),
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    image: DEFAULT_SOCIAL_IMAGE_URL,
    email: CONTACT.email,
    sameAs: SOCIAL_PROFILES,
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsAbout: locale === "en" ? [
      "Website design",
      "Web development",
      "Digital products",
      "Visual identity",
      "Digital wedding invitations",
    ] : [
      "Desain website",
      "Pengembangan website",
      "Produk digital",
      "Identitas visual",
      "Undangan pernikahan digital",
    ],
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "sales",
        email: CONTACT.email,
        availableLanguage: ["id"],
        areaServed: "ID",
      },
    ],
  };
}

export function websiteSchema(locale: Locale = defaultLocale): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_ORIGIN,
    name: SITE_NAME,
    description: siteDescription(locale),
    inLanguage: localeLanguage(locale),
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function webPageSchema({
  path,
  locale = defaultLocale,
  title,
  description,
  type = "WebPage",
  imagePath,
}: {
  path: PublicPagePath;
  locale?: Locale;
  title: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage";
  imagePath?: string;
}): JsonLdNode {
  const url = localizedSiteUrl(locale, path);

  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: localeLanguage(locale),
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    dateModified: PUBLIC_PAGES[path].updatedAt,
    ...(imagePath
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteSiteUrl(imagePath),
          },
        }
      : {}),
  };
}

export function faqPageSchema(
  items: readonly { question: string; answer: string }[],
  locale: Locale = defaultLocale,
): JsonLdNode {
  return {
    "@type": "FAQPage",
    inLanguage: localeLanguage(locale),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export const faqSchema = faqPageSchema;

export function itemListSchema(
  name: string,
  items: readonly {
    name: string;
    description?: string;
    url?: string;
    image?: string;
    itemType?: string;
  }[],
  locale: Locale = defaultLocale,
): JsonLdNode {
  return {
    "@type": "ItemList",
    name,
    inLanguage: localeLanguage(locale),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": item.itemType ?? "CreativeWork",
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(item.url ? { url: item.url.startsWith("/") ? localizedSiteUrl(locale, item.url as PublicPagePath) : item.url } : {}),
        ...(item.image ? { image: absoluteSiteUrl(item.image) } : {}),
      },
    })),
  };
}

export function serviceSchema({
  name,
  description,
  path = "/layanan",
  locale = defaultLocale,
}: {
  name: string;
  description: string;
  path?: PublicPagePath;
  locale?: Locale;
}): JsonLdNode {
  return {
    "@type": "Service",
    name,
    description,
    url: localizedSiteUrl(locale, path),
    provider: { "@id": ORGANIZATION_ID },
    areaServed: { "@type": "Country", name: "Indonesia" },
    inLanguage: localeLanguage(locale),
  };
}
