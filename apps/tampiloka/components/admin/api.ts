export type AdminForm = { id: string; title: string; slug: string; status: string; draftVersion: number; publishedRevisionId: string | null; updatedAt: string; draft: { settings: Record<string, unknown>; [key: string]: unknown } };
export async function api<T>(url: string, init?: RequestInit): Promise<T> {
  const response = await fetch(url, { ...init, cache: "no-store", headers: { "Content-Type": "application/json", ...init?.headers } });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || "Permintaan gagal. Coba lagi.");
  return data as T;
}
export const post = (body: unknown): RequestInit => ({ method: "POST", body: JSON.stringify(body) });
