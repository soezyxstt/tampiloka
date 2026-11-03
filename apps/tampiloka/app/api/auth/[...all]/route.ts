import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";
import { errorResponse, rateLimit } from "@/lib/forms/http";
async function handler(request: Request, method: "GET" | "POST") {
  const auth = getAuth();
  if (!auth) return Response.json({ error: "Authentication is not configured" }, { status: 503 });
  try { await rateLimit(request, "auth", 60); return await toNextJsHandler(auth)[method](request); }
  catch (error) { return errorResponse(error); }
}
export const GET = (request: Request) => handler(request, "GET");
export const POST = (request: Request) => handler(request, "POST");
