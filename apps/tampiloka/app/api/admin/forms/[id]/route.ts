import { requireAdmin } from "@/lib/auth";
import { getForm, updateForm, formAction } from "@/lib/forms/service";
import { checkOrigin, errorResponse, readJson } from "@/lib/forms/http";
type Context = { params: Promise<{ id: string }> };
export async function GET(request: Request, { params }: Context) { try { const auth = await requireAdmin(request.headers); return Response.json({ form: await getForm(auth.user.id, (await params).id) }); } catch (e) { return errorResponse(e); } }
export async function PATCH(request: Request, { params }: Context) { try { checkOrigin(request); const auth = await requireAdmin(request.headers); return Response.json({ form: await updateForm(auth.user.id, (await params).id, await readJson(request)) }); } catch (e) { return errorResponse(e); } }
export async function POST(request: Request, { params }: Context) { try { checkOrigin(request); const auth = await requireAdmin(request.headers); const body = await readJson(request); return Response.json({ form: await formAction(auth.user.id, (await params).id, body.action) }); } catch (e) { return errorResponse(e); } }
