import type { MetadataRoute } from "next";
import {
  TEMURA_PUBLIC_PAGES,
  TEMURA_PUBLIC_PAGE_PATHS,
  absoluteTemuraUrl,
} from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return TEMURA_PUBLIC_PAGE_PATHS.map((path) => {
    const page = TEMURA_PUBLIC_PAGES[path];

    return {
      url: absoluteTemuraUrl(path),
      lastModified: page.updatedAt,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
      ...(page.images ? { images: page.images.map(absoluteTemuraUrl) } : {}),
    };
  });
}
