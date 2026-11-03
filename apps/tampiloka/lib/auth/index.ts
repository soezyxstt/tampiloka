import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { headers } from "next/headers";
import { getDb } from "@/lib/db";
import * as schema from "@/lib/db/schema";

export function isAllowedAdmin(email: string) {
  return (process.env.ADMIN_EMAIL_ALLOWLIST ?? "").split(",").map(s => s.trim().toLowerCase()).filter(Boolean).includes(email.trim().toLowerCase());
}
export function getAuth() {
  const { CMS_DATABASE_URL, BETTER_AUTH_SECRET, BETTER_AUTH_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
  if (!CMS_DATABASE_URL || !BETTER_AUTH_SECRET || BETTER_AUTH_SECRET.length < 32 || !BETTER_AUTH_URL || !GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !process.env.ADMIN_EMAIL_ALLOWLIST) return null;
  return betterAuth({
    secret: BETTER_AUTH_SECRET, baseURL: BETTER_AUTH_URL,
    database: drizzleAdapter(getDb(), { provider: "pg", schema }),
    socialProviders: { google: { clientId: GOOGLE_CLIENT_ID, clientSecret: GOOGLE_CLIENT_SECRET } },
    databaseHooks: { user: { create: { before: async (user) => isAllowedAdmin(user.email) && user.emailVerified ? { data: user } : false } } },
  });
}
export async function getAdminSession(requestHeaders?: Headers) {
  const auth = getAuth();
  if (!auth) return null;
  const result = await auth.api.getSession({ headers: requestHeaders ?? await headers() });
  return result?.user.emailVerified && isAllowedAdmin(result.user.email) ? result : null;
}
export async function requireAdmin(requestHeaders?: Headers) {
  const session = await getAdminSession(requestHeaders);
  if (!session) throw new Error("UNAUTHORIZED");
  return session;
}
