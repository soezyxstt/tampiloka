import { S3Client, DeleteObjectCommand, ListObjectsV2Command } from '@aws-sdk/client-s3';
import pg from 'pg';
import { purgeForm } from './purge-form-retention.mjs';

const grace = 24 * 60 * 60 * 1000;
const cursorPrefix = 'maintenance-cursor:';
export async function scanObjects(db, client, bucket, prefix, apply = true, deadline = Infinity) {
  const saved = await db.query('SELECT key FROM rate_limits WHERE key LIKE $1 LIMIT 1', [cursorPrefix + prefix + '%']);
  const start = saved.rows[0]?.key.slice((cursorPrefix + prefix).length) || undefined;
  const page = await client.send(new ListObjectsV2Command({ Bucket: bucket, Prefix: prefix, StartAfter: start, MaxKeys: 10 }), { abortSignal: AbortSignal.timeout(1500) });
  for (const object of page.Contents ?? []) {
    if (Date.now() >= deadline) throw new Error('Maintenance deadline');
    if (!object.Key || !object.LastModified || Date.now() - object.LastModified.getTime() <= grace) continue;
    // A reference of any state protects the object, including draft and historical assets.
    const ref = await db.query('SELECT 1 FROM assets WHERE object_key = $1 LIMIT 1', [object.Key]);
    if (!ref.rowCount && apply) await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: object.Key }), { abortSignal: AbortSignal.timeout(1500) });
  }
  if (apply) {
    await db.query('DELETE FROM rate_limits WHERE key LIKE $1', [cursorPrefix + prefix + '%']);
    const last = page.IsTruncated && page.Contents?.at(-1)?.Key;
    if (last) await db.query("INSERT INTO rate_limits (key, count, expires_at) VALUES ($1, 0, 'infinity')", [cursorPrefix + prefix + last]);
  }
}

export async function cleanupUploads(db, client, bucket, apply = true, deadline = Infinity) {
  await db.query('BEGIN');
  try {
    const rows = await db.query("SELECT a.id, a.object_key FROM assets a WHERE a.created_at < now() - interval '24 hours' AND (a.state = 'pending' OR (a.state IN ('uploaded','deleted') AND a.upload_session_id IS NOT NULL)) AND NOT EXISTS (SELECT 1 FROM submission_files sf WHERE sf.asset_id = a.id) ORDER BY a.created_at LIMIT 4 FOR UPDATE OF a SKIP LOCKED");
    if (apply) for (const row of rows.rows) {
      if (Date.now() >= deadline) throw new Error('Maintenance deadline');
      await client.send(new DeleteObjectCommand({ Bucket: bucket, Key: row.object_key }), { abortSignal: AbortSignal.timeout(1500) });
      await db.query('DELETE FROM assets WHERE id = $1', [row.id]);
    }
    await db.query(apply ? 'COMMIT' : 'ROLLBACK');
  } catch (error) { await db.query('ROLLBACK'); throw error; }
}

export async function runMaintenance({ apply = true, cleanup = true, retention = true } = {}) {
  const { CMS_DATABASE_URL, CMS_STORAGE_ENDPOINT, CMS_STORAGE_REGION, CMS_STORAGE_ACCESS_KEY_ID, CMS_STORAGE_SECRET_ACCESS_KEY, CMS_STORAGE_BUCKET } = process.env;
  if (!CMS_DATABASE_URL || !CMS_STORAGE_ENDPOINT || !CMS_STORAGE_REGION || !CMS_STORAGE_ACCESS_KEY_ID || !CMS_STORAGE_SECRET_ACCESS_KEY || !CMS_STORAGE_BUCKET) throw new Error('Maintenance configuration missing');
  const db = new pg.Client({ connectionString: CMS_DATABASE_URL, connectionTimeoutMillis: 5000, statement_timeout: 5000 });
  const client = new S3Client({ endpoint: CMS_STORAGE_ENDPOINT, region: CMS_STORAGE_REGION, forcePathStyle: true, maxAttempts: 1, credentials: { accessKeyId: CMS_STORAGE_ACCESS_KEY_ID, secretAccessKey: CMS_STORAGE_SECRET_ACCESS_KEY } });
  const lockDb = new pg.Client({ connectionString: CMS_DATABASE_URL, connectionTimeoutMillis: 5000, statement_timeout: 5000 });
  await lockDb.connect();
  try {
    await lockDb.query('BEGIN');
    const locked = await lockDb.query("SELECT pg_try_advisory_xact_lock(hashtext('form-maintenance')) AS locked");
    if (!locked.rows[0].locked) throw new Error('Maintenance already running');
    await db.connect();
    const deadline = Date.now() + 40000;
    if (cleanup) {
      await cleanupUploads(db, client, CMS_STORAGE_BUCKET, apply, deadline);
      if (Date.now() < deadline) await scanObjects(db, client, CMS_STORAGE_BUCKET, 'incoming/', apply, deadline);
      if (Date.now() < deadline) await scanObjects(db, client, CMS_STORAGE_BUCKET, 'objects/', apply, deadline);
    }
    if (retention && Date.now() < deadline) {
      const forms = await db.query("SELECT id FROM forms WHERE (status = 'deleted' AND updated_at <= now() - interval '30 days') OR EXISTS (SELECT 1 FROM submissions WHERE form_id = forms.id AND status = 'deleted' AND deleted_at <= now() - interval '30 days') ORDER BY updated_at LIMIT 5");
      for (const form of forms.rows) {
        if (Date.now() >= deadline) break;
        await purgeForm(db, key => { if (Date.now() >= deadline) throw new Error('Maintenance deadline'); return client.send(new DeleteObjectCommand({ Bucket: CMS_STORAGE_BUCKET, Key: key }), { abortSignal: AbortSignal.timeout(1500) }); }, form.id, apply);
      }
    }
  } finally { await db.end().catch(() => {}); await lockDb.query('ROLLBACK').catch(() => {}); await lockDb.end(); client.destroy(); }
}
