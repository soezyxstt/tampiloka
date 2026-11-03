import { readFormImage } from "@/lib/storage/asset-read";

export const dynamic = "force-dynamic";
export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const response = await readFormImage((await params).id, request.headers);
  return response ?? new Response("Not found", { status: 404, headers: { "Cache-Control": "no-store" } });
}
