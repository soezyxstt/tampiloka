import { requireAdmin } from "@/lib/auth";
import { checkOrigin, errorResponse, rateLimit, readJson } from "@/lib/forms/http";
import { adminUpload } from "@/lib/storage/uploads";

export async function POST(request: Request) {
  try { checkOrigin(request); const session = await requireAdmin(request.headers); await rateLimit(request, `admin-upload:${session.user.id}`, 60); return Response.json(await adminUpload(session.user.id, await readJson(request))); }
  catch (error) { return errorResponse(error); }
}
