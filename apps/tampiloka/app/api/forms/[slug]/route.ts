import { getPublicForm } from "@/lib/forms/service";
import { errorResponse } from "@/lib/forms/http";
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) { try { return Response.json(await getPublicForm((await params).slug), { headers: { "Cache-Control": "no-store" } }); } catch (e) { return errorResponse(e); } }
