import { requireAdmin } from "@/lib/auth";
import { responseAction } from "@/lib/forms/service";
import { checkOrigin, errorResponse, readJson } from "@/lib/forms/http";
export async function POST(request: Request, { params }: { params: Promise<{ id: string; submissionId: string }> }) {
  try { checkOrigin(request); const admin = await requireAdmin(request.headers); const { id, submissionId } = await params; const body = await readJson(request); return Response.json({ submission: await responseAction(admin.user.id, id, submissionId, body.action) }); }
  catch (error) { return errorResponse(error); }
}
