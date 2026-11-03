import { test } from 'node:test';
import assert from 'node:assert/strict';
import { cleanupUploads, scanObjects } from '../lib/storage/maintenance.mjs';

test('orphan scan checks current asset references and advances bounded cursor', async () => {
  const queries = []; const sent = [];
  const db = { async query(sql, args) { queries.push([sql,args]); if (sql.startsWith('SELECT key')) return {rows: []}; if (sql.startsWith('SELECT 1')) return {rowCount: args[0] === 'objects/protected' ? 1 : 0}; return {rows: []}; } };
  const client = { async send(cmd) { sent.push(cmd); if (cmd.constructor.name === 'ListObjectsV2Command') return {IsTruncated:true, Contents:[{Key:'objects/protected',LastModified:new Date(0)},{Key:'objects/orphan',LastModified:new Date(0)},{Key:'objects/new',LastModified:new Date()}]}; } };
  await scanObjects(db, client, 'bucket', 'objects/');
  assert.deepEqual(sent.filter(x => x.constructor.name === 'DeleteObjectCommand').map(x => x.input.Key), ['objects/orphan']);
  assert.equal(sent[0].input.MaxKeys, 10);
  assert.ok(queries.some(([sql,args]) => sql.startsWith('INSERT INTO rate_limits') && args[0].endsWith('objects/new')));
});

test('storage failure rolls back cleanup without deleting asset reference', async () => {
  const calls = [];
  const db = {async query(sql) {calls.push(sql); if (sql.startsWith('SELECT a.id')) return {rows:[{id:'a',object_key:'objects/a'}]}; return {rows:[]};}};
  await assert.rejects(cleanupUploads(db, {send:async () => {throw Error('unavailable');}}, 'bucket'));
  assert.equal(calls.at(-1), 'ROLLBACK');
  assert.equal(calls.some(sql => sql.startsWith('DELETE FROM assets')), false);
  assert.match(calls[1], /NOT EXISTS \(SELECT 1 FROM submission_files/);
  assert.match(calls[1], /'uploaded','deleted'/);
});
