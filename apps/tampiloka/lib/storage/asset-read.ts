import "server-only";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { and, eq } from "drizzle-orm";
import { getAdminSession } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { assets, forms, formRevisions } from "@/lib/db/schema";
import { canReadFormImage } from "@/components/forms/asset-policy";
import { storageClient } from "./client";


export async function readFormImage(id: string, headers: Headers) {
  const [row] = await getDb().select({ asset: assets, form: forms, revision: formRevisions }).from(assets)
    .innerJoin(forms, eq(forms.id, assets.formId))
    .leftJoin(formRevisions, and(eq(formRevisions.id, forms.publishedRevisionId), eq(formRevisions.formId, forms.id)))
    .where(eq(assets.id, id));
  if (!row) return null;
  if (!canReadFormImage(row.asset, row.form, row.revision?.schema)) {
    const session = await getAdminSession(headers);
    if (!canReadFormImage(row.asset, row.form, row.revision?.schema, session?.user.id)) return null;
  }
  const { client, bucket } = storageClient();
  const object = await client.send(new GetObjectCommand({ Bucket: bucket, Key: row.asset.objectKey }));
  if (!object.Body) return null;
  if (object.ContentType !== row.asset.contentType || object.ContentLength !== row.asset.size) { object.Body.transformToWebStream().cancel(); return null; }
  return new Response(object.Body.transformToWebStream(), { headers: {
    "Content-Type": row.asset.contentType,
    "Content-Disposition": "inline",
    "Content-Length": String(row.asset.size),
    "X-Content-Type-Options": "nosniff",
    "Content-Security-Policy": "default-src 'none'; sandbox",
    "Cache-Control": "private, no-store",
  } });
}
