import { checkOrigin, errorResponse, rateLimit, readJson } from "@/lib/forms/http";
import { publicUpload } from "@/lib/storage/uploads";

export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) {
  try { checkOrigin(request); const { slug } = await params; await rateLimit(request, `upload:${slug}`, 30); return Response.json(await publicUpload(slug, await readJson(request))); }
  catch (error) { return errorResponse(error); }
}
