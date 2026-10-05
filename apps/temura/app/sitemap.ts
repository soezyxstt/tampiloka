import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/site";

const publicMarketingPaths = ["/", "/fitur", "/harga", "/desain"];

export default function sitemap(): MetadataRoute.Sitemap {
  return publicMarketingPaths.map((path) => ({
    url: new URL(path, siteOrigin).toString(),
  }));
}
