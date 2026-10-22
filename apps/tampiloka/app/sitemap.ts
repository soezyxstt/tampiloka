import type { MetadataRoute } from "next";
import { absoluteSiteUrl, PUBLIC_PAGES, PUBLIC_PAGE_PATHS } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return PUBLIC_PAGE_PATHS.map((path) => {
    const page = PUBLIC_PAGES[path];

    return {
      url: absoluteSiteUrl(path),
      lastModified: page.updatedAt,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(page.images ? { images: page.images.map(absoluteSiteUrl) } : {}),
    };
  });
}
