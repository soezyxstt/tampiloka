import { requireAdmin } from "@/lib/auth";
import { listForms, createForm } from "@/lib/forms/service";
import { checkOrigin, errorResponse, readJson } from "@/lib/forms/http";
export async function GET(request: Request) { try { const auth = await requireAdmin(request.headers); return Response.json({ forms: await listForms(auth.user.id) }); } catch (e) { return errorResponse(e); } }
export async function POST(request: Request) { try { checkOrigin(request); const auth = await requireAdmin(request.headers); const body = await readJson(request); if (typeof body.title !== "string") return Response.json({ error: "Invalid title" }, { status: 400 }); return Response.json({ form: await createForm(auth.user.id, body.title, body.template) }, { status: 201 }); } catch (e) { return errorResponse(e); } }
