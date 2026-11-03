import { referencedAssets } from "@/lib/db/form-policy";
import { formSchema } from "@/lib/forms/schema";

type Asset = { id: string; state: string; uploadSessionId: string | null; ownerId: string | null; contentType: string };
type Form = { ownerId: string; status: string };
export function canReadFormImage(asset: Asset, form: Form, revision: unknown, viewerId?: string) {
  if (asset.state !== "uploaded" || asset.uploadSessionId !== null || asset.ownerId !== form.ownerId || !["image/jpeg", "image/png", "image/webp", "image/gif"].includes(asset.contentType) || form.status === "deleted") return false;
  const parsed = formSchema.safeParse(revision);
  return (form.status === "published" && parsed.success && referencedAssets(parsed.data).includes(asset.id)) || viewerId === form.ownerId;
}
