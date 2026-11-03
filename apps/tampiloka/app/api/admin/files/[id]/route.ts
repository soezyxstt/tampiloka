import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { and, eq, ne } from "drizzle-orm";
import { requireAdmin } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { assets, forms } from "@/lib/db/schema";
import { errorResponse } from "@/lib/forms/http";
import { FormError } from "@/lib/forms/service";
import { storageClient } from "@/lib/storage/client";

export async function GET(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await requireAdmin(request.headers);
    const [row] = await getDb().select({ asset: assets }).from(assets).innerJoin(forms, eq(forms.id, assets.formId)).where(and(eq(assets.id, (await params).id), eq(forms.ownerId, session.user.id), ne(forms.status, "deleted")));
    if (!row || !["uploaded", "attached"].includes(row.asset.state)) throw new FormError("File unavailable", 404);
    const { client, bucket } = storageClient();
    const url = await getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: row.asset.objectKey, ResponseContentDisposition: "attachment", ResponseContentType: "application/octet-stream" }), { expiresIn: 60 });
    return Response.json({ url }, { headers: { "Cache-Control": "private, no-store" } });
  } catch (error) { return errorResponse(error); }
}
