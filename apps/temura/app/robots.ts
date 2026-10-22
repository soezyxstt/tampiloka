import type { MetadataRoute } from "next";
import { absoluteTemuraUrl } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private areas are also marked noindex. Keeping them crawlable lets
        // Search Console read that directive instead of only seeing a block.
        disallow: ["/api/"],
      },
    ],
    sitemap: absoluteTemuraUrl("/sitemap.xml"),
  };
}
