// One locked form per transaction serializes retention with submissions and uploads.
export async function purgeForm(db, removeObject, formId, apply) {
  await db.query('BEGIN');
  try {
    const form = (await db.query("SELECT id, status, updated_at <= now() - interval '30 days' AS expired FROM forms WHERE id = $1 FOR UPDATE", [formId])).rows[0];
    if (!form) { await db.query('ROLLBACK'); return 0; }
    const purgeWhole = form.status === 'deleted' && form.expired;
    const responses = await db.query("SELECT id FROM submissions WHERE form_id = $1 AND ($2 OR (status = 'deleted' AND deleted_at <= now() - interval '30 days')) ORDER BY created_at LIMIT 1 FOR UPDATE", [formId, purgeWhole]);
    const ids = responses.rows.map(row => row.id);
    const files = ids.length
      ? await db.query('SELECT a.id, a.object_key FROM assets a JOIN submission_files sf ON sf.asset_id = a.id WHERE sf.submission_id = ANY($1::text[]) LIMIT 4 FOR UPDATE OF a', [ids])
      : purgeWhole ? await db.query('SELECT id, object_key FROM assets WHERE form_id = $1 LIMIT 4 FOR UPDATE', [formId]) : { rows: [] };
    if (apply) {
      for (const file of files.rows) await removeObject(file.object_key);
      const fileIds = files.rows.map(row => row.id);
      await db.query('DELETE FROM submission_files WHERE asset_id = ANY($1::text[])', [fileIds]);
      await db.query('DELETE FROM assets WHERE id = ANY($1::text[])', [fileIds]);
      if (ids.length) await db.query('DELETE FROM submissions WHERE id = ANY($1::text[]) AND NOT EXISTS (SELECT 1 FROM submission_files WHERE submission_id = submissions.id)', [ids]);
      if (purgeWhole && !ids.length && !files.rows.length) {
        await db.query('DELETE FROM form_slugs WHERE form_id = $1', [formId]);
        await db.query('DELETE FROM form_revisions WHERE form_id = $1', [formId]);
        await db.query('DELETE FROM forms WHERE id = $1', [formId]);
      }
    }
    await db.query(apply ? 'COMMIT' : 'ROLLBACK');
    return ids.length;
  } catch (error) { await db.query('ROLLBACK'); throw error; }
}
