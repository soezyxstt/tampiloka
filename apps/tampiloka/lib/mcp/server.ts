import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import { and, eq, ne } from 'drizzle-orm';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getDb } from '@/lib/db';
import { assets, forms } from '@/lib/db/schema';
import { formSchema } from '@/lib/forms/schema';
import { createForm, formAction, getForm, listForms, listResponses, responseAction, updateForm, FormError } from '@/lib/forms/service';
import { adminUpload } from '@/lib/storage/uploads';
import { storageClient } from '@/lib/storage/client';

const id = z.string().uuid();
const result = (value: unknown) => ({ content: [{ type: 'text' as const, text: JSON.stringify(value) }] });
const run = async (fn: () => Promise<unknown>) => {
  try { return result(await fn()); }
  catch (error) {
    if (!(error instanceof FormError)) console.error('MCP tool failed', error);
    return { isError: true, content: [{ type: 'text' as const, text: error instanceof FormError ? error.message : 'Service unavailable' }] };
  }
};

export function createMcpServer(ownerId: string) {
  const server = new McpServer({ name: 'tampiloka-forms', version: '1.0.0' });
  server.registerResource('form-schema', 'tampiloka://forms/schema', { description: 'JSON Schema for a complete form draft, including sections, images, routing, question types, validations and settings.', mimeType: 'application/json' }, async uri => ({ contents: [{ uri: uri.href, mimeType: 'application/json', text: JSON.stringify(z.toJSONSchema(formSchema)) }] }));
  server.registerTool('get_form_schema', { description: 'Get the JSON Schema for a full form draft. Cross-field validation and publish checks are enforced by the server.', annotations: { readOnlyHint: true } }, async () => result(z.toJSONSchema(formSchema)));
  server.registerTool('list_forms', { description: 'List your forms.', annotations: { readOnlyHint: true } }, () => run(() => listForms(ownerId)));
  server.registerTool('get_form', { description: 'Get the full draft, settings, status and draftVersion. Read before updating.', inputSchema: { formId: id }, annotations: { readOnlyHint: true } }, ({ formId }) => run(() => getForm(ownerId, formId)));
  server.registerTool('create_form', { description: 'Create a blank or wedding form.', inputSchema: { title: z.string().min(1).max(500), template: z.enum(['blank', 'wedding']).optional() } }, ({ title, template }) => run(() => createForm(ownerId, title, template)));
  server.registerTool('update_form', { description: 'Replace the full draft and/or update title, slug or settings. Supply draftVersion from get_form as expectedVersion. Read tampiloka://forms/schema for the draft structure. Publish to apply changes to respondents.', inputSchema: { formId: id, expectedVersion: z.number().int().positive(), draft: z.record(z.string(), z.unknown()).optional(), title: z.string().optional(), slug: z.string().optional(), settings: z.record(z.string(), z.unknown()).optional() } }, ({ formId, ...input }) => run(() => updateForm(ownerId, formId, input)));
  server.registerTool('form_action', { description: 'Publish, close, reopen, archive, delete or duplicate a form.', inputSchema: { formId: id, action: z.enum(['publish', 'close', 'reopen', 'archive', 'delete', 'duplicate']) }, annotations: { destructiveHint: true } }, ({ formId, action }) => run(() => formAction(ownerId, formId, action)));
  server.registerTool('list_responses', { description: 'List active and archived responses and their original revision schemas. Responses may contain sensitive information.', inputSchema: { formId: id }, annotations: { readOnlyHint: true } }, ({ formId }) => run(() => listResponses(ownerId, formId)));
  server.registerTool('response_action', { description: 'Archive, restore or soft-delete a response.', inputSchema: { formId: id, submissionId: id, action: z.enum(['archive', 'restore', 'delete']) }, annotations: { destructiveHint: true } }, ({ formId, submissionId, action }) => run(() => responseAction(ownerId, formId, submissionId, action)));
  server.registerTool('start_image_upload', { description: 'Create a temporary signed POST for a JPEG, PNG, GIF or WebP image. POST all returned fields and the file to the returned URL, then call complete_image_upload. Do not disclose the signed fields.', inputSchema: { formId: id, filename: z.string(), contentType: z.enum(['image/jpeg', 'image/png', 'image/gif', 'image/webp']), size: z.number().int().positive() } }, ({ formId, ...file }) => run(() => adminUpload(ownerId, { action: 'start', formId, ...file })));
  server.registerTool('complete_image_upload', { description: 'Verify and finish an image upload. Use assetId in the draft for header, logo, question or option images.', inputSchema: { formId: id, assetId: id } }, ({ formId, assetId }) => run(() => adminUpload(ownerId, { action: 'complete', formId, assetId })));
  server.registerTool('get_file_download', { description: 'Get a short-lived download URL for an owned form asset or response file. Treat the URL as a secret.', inputSchema: { assetId: id }, annotations: { readOnlyHint: true } }, ({ assetId }) => run(async () => {
    const [row] = await getDb().select({ asset: assets }).from(assets).innerJoin(forms, eq(forms.id, assets.formId)).where(and(eq(assets.id, assetId), eq(forms.ownerId, ownerId), ne(forms.status, 'deleted')));
    if (!row || !['uploaded', 'attached'].includes(row.asset.state)) throw new FormError('File unavailable', 404);
    const { client, bucket } = storageClient();
    return { url: await getSignedUrl(client, new GetObjectCommand({ Bucket: bucket, Key: row.asset.objectKey, ResponseContentDisposition: 'attachment', ResponseContentType: 'application/octet-stream' }), { expiresIn: 60 }) };
  }));
  return server;
}
