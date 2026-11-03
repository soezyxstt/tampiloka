import { createHash } from "node:crypto";
import { sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { rateLimits } from "@/lib/db/schema";
import { FormError } from "./service";
export function checkOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const configured = process.env.BETTER_AUTH_URL;
  if (!origin || !configured) throw new FormError("Origin unavailable", 403);
  try { if (new URL(origin).origin !== new URL(configured).origin) throw new Error(); } catch { throw new FormError("Invalid origin", 403); }
}
export async function rateLimit(request: Request, scope: string, limit: number) {
  // Vercel replaces this header at the trusted edge; untrusted deployments share one bucket.
  const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() : "shared";
  const key = createHash("sha256").update(`${scope}:${ip || "shared"}`).digest("hex");
  const [row] = await getDb().insert(rateLimits).values({ key, count: 1, expiresAt: new Date(Date.now() + 60_000) }).onConflictDoUpdate({ target: rateLimits.key, set: { count: sql`case when ${rateLimits.expiresAt} <= now() then 1 else ${rateLimits.count} + 1 end`, expiresAt: sql`case when ${rateLimits.expiresAt} <= now() then now() + interval '1 minute' else ${rateLimits.expiresAt} end` } }).returning();
  if (row.count > limit) throw new FormError("Too many requests", 429);
}
export async function readJson(request: Request) {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new FormError("JSON required", 415);
  const reader = request.body?.getReader();
  if (!reader) throw new FormError("Invalid JSON");
  const chunks: Uint8Array[] = []; let size = 0;
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    size += value.byteLength;
    if (size > 1_000_000) { await reader.cancel(); throw new FormError("Request too large", 413); }
    chunks.push(value);
  }
  try {
    const bytes = new Uint8Array(size); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
    const value = JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes));
    if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error();
    return value;
  } catch { throw new FormError("Invalid JSON"); }
}
export function errorResponse(error: unknown) { if (error instanceof FormError) return Response.json({ error: error.message, ...(error.fieldErrors ? { fieldErrors: error.fieldErrors } : {}) }, { status: error.status }); if (error instanceof Error && error.message === "UNAUTHORIZED") return Response.json({ error: "Unauthorized" }, { status: 401 }); console.error("Form backend error", error); return Response.json({ error: "Service unavailable" }, { status: 503 }); }
