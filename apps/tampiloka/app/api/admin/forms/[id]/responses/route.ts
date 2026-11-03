import { requireAdmin } from "@/lib/auth";
import { listResponses } from "@/lib/forms/service";
import { errorResponse } from "@/lib/forms/http";
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) { try { const auth = await requireAdmin(request.headers); return Response.json(await listResponses(auth.user.id, (await params).id)); } catch (e) { return errorResponse(e); } }
