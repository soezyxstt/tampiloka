import { CopyObjectCommand, DeleteObjectCommand, HeadObjectCommand } from "@aws-sdk/client-s3";
import { validateForPublish, referencedAssets, sameCanonicalAnswers, lifecycleStatus, responseLimitReached } from "@/lib/db/form-policy";
import { and, desc, eq, inArray, sql } from "drizzle-orm";
import { getDb } from "@/lib/db";
import { assets, forms, formRevisions, formSlugs, submissions, submissionFiles } from "@/lib/db/schema";
import { createBlankForm, weddingTemplate, formSchema, validateAnswers, normalizeSlug, isValidSlug, type FormSchema } from "./schema";

export class FormError extends Error { constructor(message: string, public status = 400, public fieldErrors?: Record<string, string>) { super(message); } }
const missing = () => new FormError("Form not found", 404);
const id = () => crypto.randomUUID();
export async function listForms(ownerId: string) { return getDb().select().from(forms).where(and(eq(forms.ownerId, ownerId), sql`${forms.status} <> 'deleted'`)).orderBy(desc(forms.updatedAt)); }
export async function getForm(ownerId: string, formId: string) { const [form] = await getDb().select().from(forms).where(and(eq(forms.id, formId), eq(forms.ownerId, ownerId), sql`${forms.status} <> 'deleted'`)); if (!form) throw missing(); return form; }
export async function createForm(ownerId: string, title: string, template?: string) {
  if (!title.trim() || title.length > 500 || (template && !["blank", "wedding"].includes(template))) throw new FormError("Invalid form details");
  const draft = template === "wedding" ? weddingTemplate() : createBlankForm(); draft.title = title.trim();
  const formId = id(); const base = normalizeSlug(title).slice(0, 60) || "form"; const slug = `${base}-${formId.slice(0, 8)}`;
  return getDb().transaction(async tx => { const [form] = await tx.insert(forms).values({ id: formId, ownerId, title: draft.title, slug, draft }).returning(); await tx.insert(formSlugs).values({ slug, formId }); return form; });
}
export async function updateForm(ownerId: string, formId: string, input: { draft?: unknown; expectedVersion?: number; title?: string; slug?: string; settings?: unknown }) {
  return getDb().transaction(async tx => {
    const [form] = await tx.select().from(forms).where(and(eq(forms.id, formId), eq(forms.ownerId, ownerId))).for("update");
    if (!form || form.status === "deleted") throw missing();
    if (!Number.isInteger(input.expectedVersion) || input.expectedVersion !== form.draftVersion) throw new FormError("Draft version conflict", 409);
    const parsed = formSchema.safeParse(input.draft ?? form.draft); if (!parsed.success) throw new FormError("Invalid draft", 400);
    const draft = parsed.data;
    if (input.title !== undefined) { if (typeof input.title !== "string" || !input.title.trim() || input.title.length > 500) throw new FormError("Invalid title"); draft.title = input.title.trim(); }
    if (input.settings !== undefined) { const settings = formSchema.safeParse({ ...draft, settings: input.settings }); if (!settings.success) throw new FormError("Invalid settings"); draft.settings = settings.data.settings; }
    const slug = input.slug ?? form.slug;
    if (typeof slug !== "string" || !isValidSlug(slug)) throw new FormError("Invalid slug");
    if (slug !== form.slug) { const [existing] = await tx.select().from(formSlugs).where(eq(formSlugs.slug, slug)); if (existing && existing.formId !== formId) throw new FormError("Slug already in use", 409); if (!existing) await tx.insert(formSlugs).values({ slug, formId }); }
    const [updated] = await tx.update(forms).set({ draft, title: draft.title, slug, draftVersion: form.draftVersion + 1, updatedAt: new Date() }).where(eq(forms.id, formId)).returning(); return updated;
  });
}
export async function formAction(ownerId: string, formId: string, action: string) {
  if (action === "duplicate") {
    const copiedKeys: string[] = [];
    const { storageClient } = await import("@/lib/storage/client");
    try {
      return await getDb().transaction(async tx => {
        const [source] = await tx.select().from(forms).where(and(eq(forms.id, formId), eq(forms.ownerId, ownerId))).for("update");
        if (!source || source.status === "deleted") throw missing();
        const draft = formSchema.parse(source.draft);
        const ids = referencedAssets(draft);
        const originals = ids.length ? await tx.select().from(assets).where(and(inArray(assets.id, ids), eq(assets.formId, formId), eq(assets.ownerId, ownerId), eq(assets.state, "uploaded"))) : [];
        if (originals.length !== ids.length || originals.some(a => a.uploadSessionId !== null || !a.contentType.startsWith("image/"))) throw new FormError("Image assets unavailable");
        const copyId = id(), title = `${source.title} copy`, slug = `${normalizeSlug(title).slice(0, 60) || "form"}-${copyId.slice(0, 8)}`;
        await tx.insert(forms).values({ id: copyId, ownerId, title, slug, draft });
        const replacements = new Map<string, string>();
        if (originals.length) {
          const { client, bucket } = storageClient();
          for (const original of originals) {
            const newId = id(), key = `objects/${id()}`;
            await client.send(new CopyObjectCommand({ Bucket: bucket, Key: key, CopySource: `${bucket}/${original.objectKey}` }));
            copiedKeys.push(key); replacements.set(original.id, newId);
            await tx.insert(assets).values({ ...original, id: newId, formId: copyId, objectKey: key, createdAt: new Date(), updatedAt: new Date() });
          }
        }
        const replace = (value: string | undefined) => value ? replacements.get(value) : undefined;
        draft.headerAssetId = replace(draft.headerAssetId); draft.logoAssetId = replace(draft.logoAssetId);
        for (const section of draft.sections) for (const question of section.questions) { question.imageAssetId = replace(question.imageAssetId); for (const option of question.options) option.imageAssetId = replace(option.imageAssetId); }
        draft.title = title;
        const [copy] = await tx.update(forms).set({ draft }).where(eq(forms.id, copyId)).returning();
        await tx.insert(formSlugs).values({ slug, formId: copyId });
        return copy;
      });
    } catch (error) {
      if (copiedKeys.length) { const { client, bucket } = storageClient(); await Promise.allSettled(copiedKeys.map(Key => client.send(new DeleteObjectCommand({ Bucket: bucket, Key })))); }
      throw error;
    }
  }
  return getDb().transaction(async tx => {
    const [form] = await tx.select().from(forms).where(and(eq(forms.id, formId), eq(forms.ownerId, ownerId))).for("update");
    if (!form || form.status === "deleted") throw missing();
    let status = lifecycleStatus(form.status, action, !!form.publishedRevisionId); let publishedRevisionId = form.publishedRevisionId;
    if (!status) throw new FormError("Invalid lifecycle transition", 409);
    if (action === "publish") {
      const parsed = formSchema.safeParse(form.draft); if (!parsed.success || !parsed.data.title.trim()) throw new FormError("Invalid draft");
      const problems = validateForPublish(parsed.data); if (problems.length) throw new FormError(problems.join("; "));
      const imageIds = referencedAssets(parsed.data);
      if (imageIds.length) {
        const owned = await tx.select().from(assets).where(and(inArray(assets.id, imageIds), eq(assets.formId, formId), eq(assets.ownerId, ownerId), eq(assets.state, "uploaded")));
        if (owned.length !== imageIds.length || owned.some(a => a.uploadSessionId !== null || !a.contentType.startsWith("image/"))) throw new FormError("Image assets unavailable");
      }
      const [latest] = await tx.select().from(formRevisions).where(eq(formRevisions.formId, formId)).orderBy(desc(formRevisions.number)).limit(1);
      publishedRevisionId = id(); await tx.insert(formRevisions).values({ id: publishedRevisionId, formId, number: (latest?.number ?? 0) + 1, schema: parsed.data }); status = "published";
    }
    const [updated] = await tx.update(forms).set({ status, publishedRevisionId, updatedAt: new Date() }).where(eq(forms.id, formId)).returning(); return updated;
  });
}
export async function getPublicForm(slug: string) {
  const [result] = await getDb().select({ form: forms, revision: formRevisions }).from(formSlugs).innerJoin(forms, eq(forms.id, formSlugs.formId)).innerJoin(formRevisions, eq(formRevisions.id, forms.publishedRevisionId)).where(eq(formSlugs.slug, slug));
  if (!result || ["deleted", "archived", "draft"].includes(result.form.status)) throw missing();
  if (result.form.status !== "published") throw new FormError("Form is closed", 410);
  const schema = formSchema.parse(result.revision.schema);
  if (schema.settings.maxResponses !== undefined || schema.settings.closesAt !== undefined) {
    const [total] = await getDb().select({ value: sql<number>`count(*)::int` }).from(submissions).where(eq(submissions.formId, result.form.id));
    if (responseLimitReached(schema.settings, total.value)) throw new FormError("Form is closed", 410);
  }
  return { form: { id: result.form.id, title: result.form.title, slug: result.form.slug, status: result.form.status }, revision: { id: result.revision.id, number: result.revision.number, schema } };
}
export async function listResponses(ownerId: string, formId: string) { await getForm(ownerId, formId); const rows = await getDb().select({ id: submissions.id, revisionId: submissions.revisionId, status: submissions.status, answers: submissions.answers, createdAt: submissions.createdAt, revisionNumber: formRevisions.number, revisionSchema: formRevisions.schema }).from(submissions).innerJoin(formRevisions, eq(formRevisions.id, submissions.revisionId)).where(and(eq(submissions.formId, formId), sql`${submissions.status} <> 'deleted'`)).orderBy(desc(submissions.createdAt)); return { submissions: rows, total: rows.length }; }
export async function submitForm(slug: string, data: { revisionId: string; answers: unknown; idempotencyKey: string; uploadSessionId?: string; honeypot?: string }) {
  if (data.honeypot) throw new FormError("Invalid submission");
  if (typeof data.idempotencyKey !== "string" || data.idempotencyKey.length < 16 || data.idempotencyKey.length > 100 || typeof data.revisionId !== "string") throw new FormError("Invalid submission");
  return getDb().transaction(async tx => {
    const [alias] = await tx.select().from(formSlugs).where(eq(formSlugs.slug, slug)); if (!alias) throw missing();
    const [form] = await tx.select().from(forms).where(eq(forms.id, alias.formId)).for("update"); if (!form || form.status === "deleted") throw new FormError("Form unavailable", 410);
    const [revision] = await tx.select().from(formRevisions).where(and(eq(formRevisions.id, data.revisionId), eq(formRevisions.formId, form.id))); if (!revision) throw missing();
    const schema = formSchema.parse(revision.schema) as FormSchema; const validation = validateAnswers(schema, data.answers); if (!validation.success) throw new FormError("Invalid answers", 400, validation.fieldErrors);
    const [existing] = await tx.select().from(submissions).where(and(eq(submissions.formId, form.id), eq(submissions.idempotencyKey, data.idempotencyKey)));
    if (existing) {
      if (existing.status === "deleted" || existing.revisionId !== data.revisionId || !sameCanonicalAnswers(existing.answers, validation.answers)) throw new FormError("Idempotency key already used", 409);
      const attached = await tx.select({ session: assets.uploadSessionId }).from(submissionFiles).innerJoin(assets, eq(assets.id, submissionFiles.assetId)).where(eq(submissionFiles.submissionId, existing.id));
      if (attached.some(file => file.session !== data.uploadSessionId)) throw new FormError("Idempotency key already used", 409);
      return existing;
    }
    if (form.status !== "published") throw new FormError("Form unavailable", 410);
    if (form.publishedRevisionId !== data.revisionId) throw new FormError("Form has changed; reload before submitting", 409);
    if (schema.settings.maxResponses !== undefined || schema.settings.closesAt !== undefined) {
      const [total] = await tx.select({ value: sql<number>`count(*)::int` }).from(submissions).where(eq(submissions.formId, form.id));
      if (responseLimitReached(schema.settings, total.value)) throw new FormError("Form is closed", 410);
    }
    const fileQuestions = schema.sections.flatMap(s => s.questions).filter(q => q.type === "file");
    const fileIds = fileQuestions.flatMap(q => Array.isArray(validation.answers[q.id]) ? validation.answers[q.id] as string[] : []);
    if (new Set(fileIds).size !== fileIds.length) throw new FormError("Duplicate files");
    if (fileIds.length) {
      if (!data.uploadSessionId || typeof data.uploadSessionId !== "string") throw new FormError("Upload session required");
      const found = await tx.select().from(assets).where(and(inArray(assets.id, fileIds), eq(assets.formId, form.id), eq(assets.uploadSessionId, data.uploadSessionId), eq(assets.revisionId, revision.id), eq(assets.state, "uploaded"))).for("update");
      if (found.length !== fileIds.length || found.some(file => file.ownerId !== null)) throw new FormError("Files unavailable");
      const { storageClient } = await import("@/lib/storage/client");
      const { client, bucket } = storageClient();
      for (const file of found) {
        const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: file.objectKey }));
        if (head.ContentLength !== file.size || head.ContentType !== file.contentType || !head.ETag) throw new FormError("Uploaded file does not match");
      }
      for (const q of fileQuestions) for (const fileId of (validation.answers[q.id] as string[] | undefined) ?? []) { const file = found.find(a => a.id === fileId)!; if (file.questionId !== q.id || q.validation.maxFileSize && file.size > q.validation.maxFileSize || q.validation.allowedTypes?.length && !q.validation.allowedTypes.includes(file.contentType) && !q.validation.allowedTypes.some(t => t.startsWith(".") && file.filename.toLowerCase().endsWith(t.toLowerCase()))) throw new FormError("File does not meet question requirements"); }
    }
    const [submission] = await tx.insert(submissions).values({ id: id(), formId: form.id, revisionId: revision.id, idempotencyKey: data.idempotencyKey, answers: validation.answers }).returning();
    if (fileIds.length) { await tx.insert(submissionFiles).values(fileIds.map(assetId => ({ submissionId: submission.id, assetId }))); await tx.update(assets).set({ state: "attached", updatedAt: new Date() }).where(inArray(assets.id, fileIds)); }
    return submission;
  });
}


export async function responseAction(ownerId: string, formId: string, submissionId: string, action: string) {
  return getDb().transaction(async tx => {
    const [form] = await tx.select().from(forms).where(and(eq(forms.id, formId), eq(forms.ownerId, ownerId))).for("update");
    if (!form || form.status === "deleted") throw missing();
    const [submission] = await tx.select().from(submissions).where(and(eq(submissions.id, submissionId), eq(submissions.formId, formId))).for("update");
    if (!submission || submission.status === "deleted") throw new FormError("Response not found", 404);
    let status: string;
    if (action === "archive" && submission.status === "active") status = "archived";
    else if (action === "restore" && submission.status === "archived") status = "active";
    else if (action === "delete") status = "deleted";
    else throw new FormError("Invalid response transition", 409);
    await tx.update(submissions).set({ status, deletedAt: status === "deleted" ? new Date() : null }).where(eq(submissions.id, submissionId));
    if (status === "deleted") {
      const files = await tx.select({ assetId: submissionFiles.assetId }).from(submissionFiles).where(eq(submissionFiles.submissionId, submissionId));
      if (files.length) await tx.update(assets).set({ state: "deleted", updatedAt: new Date() }).where(inArray(assets.id, files.map(f => f.assetId)));
    }
    return { id: submissionId, status };
  });
}
