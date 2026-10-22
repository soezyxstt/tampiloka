import { PUBLIC_PAGES, PUBLIC_PAGE_PATHS, absoluteSiteUrl } from "@/lib/seo";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * Built by hand instead of with the `sitemap` metadata route because Next.js
 * writes image entries before `lastmod`, which violates the sitemap schema and
 * makes Google Search Console reject the file. Standard elements must come
 * first, followed by the image extension.
 */
export function GET() {
  const urls = PUBLIC_PAGE_PATHS.map((path) => {
    const page = PUBLIC_PAGES[path];
    const images = (page.images ?? [])
      .map(
        (image) =>
          `<image:image><image:loc>${escapeXml(absoluteSiteUrl(image))}</image:loc></image:image>`,
      )
      .join("");

    return [
      "<url>",
      `<loc>${escapeXml(absoluteSiteUrl(path))}</loc>`,
      `<lastmod>${page.updatedAt}</lastmod>`,
      `<changefreq>${page.changeFrequency}</changefreq>`,
      `<priority>${page.priority}</priority>`,
      images,
      "</url>",
    ].join("");
  }).join("");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    urls,
    "</urlset>",
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
