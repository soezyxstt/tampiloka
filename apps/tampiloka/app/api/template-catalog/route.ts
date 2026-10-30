import { loadTemplateCatalog } from "@/lib/template-catalog-server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return Response.json(await loadTemplateCatalog(), {
      headers: { "Cache-Control": "no-store", "X-Content-Type-Options": "nosniff" },
    });
  } catch {
    return Response.json({ error: "catalog_unavailable" }, {
      status: 503,
      headers: { "Cache-Control": "no-store", "Retry-After": "60" },
    });
  }
}
