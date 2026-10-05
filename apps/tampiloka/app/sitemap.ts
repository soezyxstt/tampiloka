import type { MetadataRoute } from "next";
import { absoluteSiteUrl, PUBLIC_PAGE_PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGE_PATHS.map((path) => ({ url: absoluteSiteUrl(path) }));
}
