import "server-only";
import { CopyObjectCommand, DeleteObjectCommand, GetObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";
import { and, eq, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { assets, forms } from "@/lib/db/schema";
import { FormError, getForm, getPublicForm } from "@/lib/forms/service";
import { storageClient } from "./client";
import { MAX_SESSION_FILES, MAX_SESSION_SIZE, UPLOAD_EXPIRY_SECONDS, validateUpload, matchesFileSignature } from "./policy";

type Body = { action?: unknown; revisionId?: unknown; questionId?: unknown; uploadSessionId?: unknown; assetId?: unknown; filename?: unknown; contentType?: unknown; size?: unknown };
const uuid = (value: unknown): value is string => typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);

export async function publicUpload(slug: string, body: Body) {
  if (!uuid(body.uploadSessionId) || typeof body.revisionId !== "string" || typeof body.questionId !== "string") throw new FormError("Invalid upload session");
  const current = await getPublicForm(slug);
  if (current.revision.id !== body.revisionId) throw new FormError("Form has changed", 409);
  const question = current.revision.schema.sections.flatMap(s => s.questions).find(q => q.id === body.questionId && q.type === "file");
  if (!question) throw new FormError("Invalid file question");
  const binding = { formId: current.form.id, revisionId: current.revision.id, questionId: question.id, uploadSessionId: body.uploadSessionId, ownerId: null };
  return upload(body, binding, question.validation, question.validation.maxFiles ?? 1);
}

export async function adminUpload(ownerId: string, body: Body & { formId?: unknown }) {
  if (typeof body.formId !== "string") throw new FormError("Invalid form");
  const form = await getForm(ownerId, body.formId);
  return upload(body, { formId: form.id, revisionId: null, questionId: null, uploadSessionId: null, ownerId }, { allowedTypes: ["image/jpeg", "image/png", "image/webp", "image/gif"] }, MAX_SESSION_FILES);
}

async function upload(body: Body, binding: { formId: string; revisionId: string | null; questionId: string | null; uploadSessionId: string | null; ownerId: string | null }, limits: { allowedTypes?: string[]; maxFileSize?: number }, maxFiles: number) {
  const { client, bucket } = storageClient();
  const db = getDb();
  let copiedKey: string | undefined;
  try { return await db.transaction(async tx => {
    // Serialize authorization and completion with publishing and concurrent uploads.
    const [form] = await tx.select().from(forms).where(eq(forms.id, binding.formId)).for("update");
    if (!form || (binding.ownerId ? form.ownerId !== binding.ownerId || form.status === "deleted" : form.status !== "published" || form.publishedRevisionId !== binding.revisionId)) throw new FormError("Form unavailable", 409);
    if (body.action === "start") {
      if (!validateUpload({ filename: body.filename, contentType: body.contentType, size: body.size }, limits)) throw new FormError("Invalid file type or size. Supported types: JPEG, PNG, GIF, WebP and PDF");
      const existing = await tx.select().from(assets).where(and(eq(assets.formId, binding.formId), binding.uploadSessionId ? eq(assets.uploadSessionId, binding.uploadSessionId) : eq(assets.ownerId, binding.ownerId!), sql`${assets.state} in ('pending', 'uploaded')`, sql`${assets.createdAt} > now() - interval '24 hours'`));
      if (existing.length >= MAX_SESSION_FILES || existing.reduce((sum, file) => sum + file.size, 0) + (body.size as number) > MAX_SESSION_SIZE || (binding.questionId && existing.filter(file => file.questionId === binding.questionId).length >= maxFiles)) throw new FormError("Upload limit reached", 413);
      const id = crypto.randomUUID(); const key = `incoming/${crypto.randomUUID()}`;
      await tx.insert(assets).values({ id, ...binding, objectKey: key, filename: body.filename as string, contentType: body.contentType as string, size: body.size as number });
      const post = await createPresignedPost(client, { Bucket: bucket, Key: key, Expires: UPLOAD_EXPIRY_SECONDS, Fields: { "Content-Type": body.contentType as string }, Conditions: [["content-length-range", body.size as number, body.size as number], ["eq", "$Content-Type", body.contentType as string]] });
      return { assetId: id, ...post };
    }
    if (!["complete", "remove"].includes(String(body.action)) || !uuid(body.assetId)) throw new FormError("Invalid upload action");
    const [asset] = await tx.select().from(assets).where(and(eq(assets.id, body.assetId), eq(assets.formId, binding.formId))).for("update");
    if (!asset || asset.ownerId !== binding.ownerId || asset.uploadSessionId !== binding.uploadSessionId || asset.revisionId !== binding.revisionId || asset.questionId !== binding.questionId) throw new FormError("File unavailable", 404);
    if (body.action === "remove") {
      if (!binding.uploadSessionId || !["pending", "uploaded", "deleted"].includes(asset.state)) throw new FormError("File cannot be removed", 409);
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: asset.objectKey }));
      await tx.update(assets).set({ state: "deleted", updatedAt: new Date() }).where(eq(assets.id, asset.id));
      return { assetId: asset.id };
    }
    if (asset.state === "uploaded") return { assetId: asset.id };
    if (asset.state !== "pending" || Date.now() - asset.createdAt.getTime() > 15 * 60_000) throw new FormError("Upload expired", 410);
    const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: asset.objectKey }));
    if (head.ContentLength !== asset.size || head.ContentType !== asset.contentType || !head.ETag) throw new FormError("Uploaded file does not match");
    // Copy to a key never exposed to the uploader, preventing signed-POST replay after completion.
    const finalKey = `objects/${crypto.randomUUID()}`;
    copiedKey = finalKey;
    await client.send(new CopyObjectCommand({ Bucket: bucket, Key: finalKey, CopySource: `${bucket}/${asset.objectKey}`, CopySourceIfMatch: head.ETag }));
    const copied = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: finalKey }));
    if (copied.ContentLength !== asset.size || copied.ContentType !== asset.contentType) throw new FormError("Copied file does not match");
    const content = await client.send(new GetObjectCommand({ Bucket: bucket, Key: finalKey, Range: "bytes=0-31" }));
    if (!content.Body || content.ContentRange !== `bytes 0-${Math.min(asset.size, 32) - 1}/${asset.size}`) throw new FormError("Unable to verify file content");
    const reader = content.Body.transformToWebStream().getReader();
    const chunks: Uint8Array[] = []; let length = 0;
    try {
      while (true) { const { done, value } = await reader.read(); if (done) break; length += value.length; if (length > 32) throw new FormError("Unable to verify file content"); chunks.push(value); }
    } finally { await reader.cancel(); }
    const bytes = new Uint8Array(length); let offset = 0;
    for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.length; }
    if (!validateUpload(asset, limits) || !matchesFileSignature(bytes, asset.contentType)) {
      throw new FormError("File content does not match its type");
    }
    await tx.update(assets).set({ objectKey: finalKey, state: "uploaded", updatedAt: new Date() }).where(eq(assets.id, asset.id));
    return { assetId: asset.id };
  }); } catch (error) {
    if (copiedKey) await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: copiedKey })).catch(() => { console.error("Failed upload object cleanup requires maintenance reconciliation"); });
    throw error;
  }
}
