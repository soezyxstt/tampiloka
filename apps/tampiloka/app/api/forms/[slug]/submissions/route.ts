import { submitForm } from "@/lib/forms/service";
import { checkOrigin, errorResponse, rateLimit, readJson } from "@/lib/forms/http";
export async function POST(request: Request, { params }: { params: Promise<{ slug: string }> }) { try { checkOrigin(request); const { slug } = await params; await rateLimit(request, `submission:${slug}`, 30); const body = await readJson(request); const submission = await submitForm(slug, body as Parameters<typeof submitForm>[1]); return Response.json({ id: submission.id }, { status: 201 }); } catch (e) { return errorResponse(e); } }
