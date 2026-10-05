import type { Metadata } from "next";

const DEFAULT_SITE_ORIGIN = "https://tampiloka.adihnursyam.com";
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim() || DEFAULT_SITE_ORIGIN;
const parsedSiteUrl = new URL(configuredSiteUrl);

if (parsedSiteUrl.protocol !== "https:" && parsedSiteUrl.protocol !== "http:") {
  throw new Error("NEXT_PUBLIC_SITE_URL must use http or https.");
}

export const SITE_ORIGIN = parsedSiteUrl.origin;
export const SITE_METADATA_BASE = new URL(SITE_ORIGIN);

export const PUBLIC_PAGE_PATHS = [
  "/",
  "/layanan",
  "/produk",
  "/industri",
  "/tentang",
  "/contact",
] as const;

export function absoluteSiteUrl(path: string): string {
  return new URL(path, SITE_METADATA_BASE).toString();
}

type PageMetadataOptions = {
  path: (typeof PUBLIC_PAGE_PATHS)[number];
  title: string;
  description: string;
  imageAlt: string;
  imagePath?: string;
};

export function createPageMetadata({
  path,
  title,
  description,
  imageAlt,
  imagePath = "/images/service-overview.webp",
}: PageMetadataOptions): Metadata {
  const canonicalUrl = absoluteSiteUrl(path);
  const imageUrl = absoluteSiteUrl(imagePath);
  const socialTitle = `${title} | Tampiloka`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      type: "website",
      locale: "id_ID",
      siteName: "Tampiloka",
      title: socialTitle,
      description,
      url: canonicalUrl,
      images: [{ url: imageUrl, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [imageUrl],
    },
  };
}
