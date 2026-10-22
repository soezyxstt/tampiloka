import type { Metadata } from "next";
import { siteOrigin } from "@/lib/site";
import { TEMPLATE_TIERS } from "@/lib/template-catalog";

export const TEMURA_NAME = "Temura";
export const TEMURA_ORIGIN = siteOrigin;
export const TEMURA_METADATA_BASE = new URL(TEMURA_ORIGIN);
export const TEMURA_LANGUAGE = "id-ID";
export const TEMURA_LOCALE = "id_ID";
export const TEMURA_DESCRIPTION =
  "Pilih desain undangan, bagikan kepada tamu, dan kelola kehadiran. Undangan digital oleh Tampiloka.";
export const TEMURA_PARENT_NAME = "Tampiloka";
export const TEMURA_PARENT_ORIGIN = "https://tampiloka.site";

/**
 * Bump the matching date whenever the visible content of a public page changes.
 * Google uses lastmod in the sitemap to schedule recrawls, so inaccurate values are ignored.
 */
export const TEMURA_UPDATED_AT = "2026-10-22";

export const TEMURA_SOCIAL_IMAGE = {
  path: "/brand/social/light/temura-og-image-endorsed-light.png",
  alt: "Temura, undangan pernikahan digital oleh Tampiloka.",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

export function absoluteTemuraUrl(path: string): string {
  return new URL(path, TEMURA_METADATA_BASE).toString();
}

export const TEMURA_SOCIAL_IMAGE_URL = absoluteTemuraUrl(TEMURA_SOCIAL_IMAGE.path);
export const TEMURA_LOGO_URL = absoluteTemuraUrl("/brand/social/light/temura-profile-light.png");

export const TEMURA_PUBLIC_PAGE_PATHS = ["/", "/desain", "/harga", "/fitur"] as const;

export type TemuraPublicPagePath = (typeof TEMURA_PUBLIC_PAGE_PATHS)[number];

type PageSitemapDetails = {
  priority: number;
  changeFrequency: "weekly" | "monthly" | "yearly";
  updatedAt: string;
  images?: readonly string[];
};

export const TEMURA_PUBLIC_PAGES: Record<TemuraPublicPagePath, PageSitemapDetails> = {
  "/": {
    priority: 1,
    changeFrequency: "monthly",
    updatedAt: TEMURA_UPDATED_AT,
    images: ["/images/wedding-hero.webp"],
  },
  "/desain": {
    priority: 0.9,
    changeFrequency: "weekly",
    updatedAt: TEMURA_UPDATED_AT,
    images: [
      "/assets/templates/backgrounds/bg-adat-sunda-480.webp",
      "/assets/templates/backgrounds/bg-adat-bali-480.webp",
      "/assets/templates/backgrounds/bg-adat-jawa-480.webp",
      "/assets/templates/backgrounds/bg-adat-minang-480.webp",
      "/assets/templates/backgrounds/bg-adat-betawi-480.webp",
    ],
  },
  "/harga": {
    priority: 0.9,
    changeFrequency: "monthly",
    updatedAt: TEMURA_UPDATED_AT,
  },
  "/fitur": {
    priority: 0.8,
    changeFrequency: "monthly",
    updatedAt: TEMURA_UPDATED_AT,
    images: ["/images/wedding-hero.webp"],
  },
};

export const TEMURA_ROBOTS: NonNullable<Metadata["robots"]> = {
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
export function temuraSiteVerification(): Metadata["verification"] {
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
  path: TemuraPublicPagePath;
  title: string;
  description: string;
  imageAlt?: string;
};

export function createPageMetadata({
  path,
  title,
  description,
  imageAlt = TEMURA_SOCIAL_IMAGE.alt,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteTemuraUrl(path);
  const socialTitle = `${title} | ${TEMURA_NAME}`;
  const image = {
    url: TEMURA_SOCIAL_IMAGE_URL,
    alt: imageAlt,
    width: TEMURA_SOCIAL_IMAGE.width,
    height: TEMURA_SOCIAL_IMAGE.height,
    type: TEMURA_SOCIAL_IMAGE.type,
  };

  return {
    title: { absolute: socialTitle },
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      locale: TEMURA_LOCALE,
      siteName: TEMURA_NAME,
      title: socialTitle,
      description,
      url: canonicalUrl,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [image],
    },
  };
}

type JsonLdNode = Record<string, unknown>;

export const TEMURA_ORGANIZATION_ID = `${TEMURA_ORIGIN}/#organization`;
export const TEMURA_WEBSITE_ID = `${TEMURA_ORIGIN}/#website`;
export const TEMURA_BRAND_ID = `${TEMURA_ORIGIN}/#brand`;

export function temuraOrganizationSchema(): JsonLdNode {
  return {
    "@type": "Organization",
    "@id": TEMURA_ORGANIZATION_ID,
    name: TEMURA_NAME,
    url: TEMURA_ORIGIN,
    description: TEMURA_DESCRIPTION,
    logo: {
      "@type": "ImageObject",
      url: TEMURA_LOGO_URL,
      width: 512,
      height: 512,
    },
    image: TEMURA_SOCIAL_IMAGE_URL,
    brand: { "@id": TEMURA_BRAND_ID },
    parentOrganization: {
      "@type": "Organization",
      name: TEMURA_PARENT_NAME,
      url: TEMURA_PARENT_ORIGIN,
    },
    areaServed: { "@type": "Country", name: "Indonesia" },
    knowsAbout: ["Undangan pernikahan digital", "Undangan digital", "RSVP pernikahan"],
  };
}

export function temuraBrandSchema(): JsonLdNode {
  return {
    "@type": "Brand",
    "@id": TEMURA_BRAND_ID,
    name: TEMURA_NAME,
    url: TEMURA_ORIGIN,
    logo: TEMURA_LOGO_URL,
    slogan: "Undangan pernikahan digital",
  };
}

export function temuraWebsiteSchema(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": TEMURA_WEBSITE_ID,
    url: TEMURA_ORIGIN,
    name: TEMURA_NAME,
    description: TEMURA_DESCRIPTION,
    inLanguage: TEMURA_LANGUAGE,
    publisher: { "@id": TEMURA_ORGANIZATION_ID },
  };
}

export function temuraWebPageSchema({
  path,
  title,
  description,
  type = "WebPage",
  imagePath,
}: {
  path: TemuraPublicPagePath;
  title: string;
  description: string;
  type?: "WebPage" | "CollectionPage";
  imagePath?: string;
}): JsonLdNode {
  const url = absoluteTemuraUrl(path);

  return {
    "@type": type,
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: TEMURA_LANGUAGE,
    isPartOf: { "@id": TEMURA_WEBSITE_ID },
    about: { "@id": TEMURA_ORGANIZATION_ID },
    dateModified: TEMURA_PUBLIC_PAGES[path].updatedAt,
    ...(imagePath
      ? {
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: absoluteTemuraUrl(imagePath),
          },
        }
      : {}),
  };
}

export function temuraProductSchema(): JsonLdNode {
  const prices = Object.values(TEMPLATE_TIERS).map((tier) => tier.priceIdr);

  return {
    "@type": "Product",
    "@id": `${TEMURA_ORIGIN}/#product`,
    name: "Undangan pernikahan digital Temura",
    description:
      "Undangan pernikahan digital dengan tautan personal, detail acara, RSVP, galeri, dan pengelolaan tamu.",
    image: [TEMURA_SOCIAL_IMAGE_URL],
    brand: { "@id": TEMURA_BRAND_ID },
    category: "Undangan pernikahan digital",
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "IDR",
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: prices.length,
      availability: "https://schema.org/InStock",
      url: absoluteTemuraUrl("/harga"),
      seller: { "@id": TEMURA_ORGANIZATION_ID },
    },
  };
}

export function temuraOfferCatalogSchema(): JsonLdNode {
  return {
    "@type": "OfferCatalog",
    "@id": `${TEMURA_ORIGIN}/#paket`,
    name: "Paket undangan digital Temura",
    itemListElement: Object.values(TEMPLATE_TIERS).map((tier, index) => ({
      "@type": "Offer",
      position: index + 1,
      name: `Paket ${tier.label}`,
      description: tier.note,
      price: tier.priceIdr,
      priceCurrency: "IDR",
      availability: "https://schema.org/InStock",
      url: absoluteTemuraUrl("/harga"),
      itemOffered: {
        "@type": "Service",
        name: `Undangan digital ${tier.label}`,
        description: tier.note,
      },
    })),
  };
}

export function temuraItemListSchema(
  name: string,
  items: readonly {
    name: string;
    description?: string;
    image?: string;
    itemType?: string;
  }[],
): JsonLdNode {
  return {
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": item.itemType ?? "CreativeWork",
        name: item.name,
        ...(item.description ? { description: item.description } : {}),
        ...(item.image ? { image: absoluteTemuraUrl(item.image) } : {}),
      },
    })),
  };
}
