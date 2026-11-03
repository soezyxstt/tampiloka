import { test } from "node:test";
import assert from "node:assert/strict";
import { purgeForm } from "./purge-form-retention.mjs";
test("storage failure rolls back before deleting database references", async () => {
 const calls = [];
 const db = { async query(sql) { calls.push(sql); if (sql.startsWith("SELECT id, status")) return { rows: [{ id: "f", status: "deleted", expired: true }] }; if (sql.startsWith("SELECT id FROM submissions")) return { rows: [{ id: "s" }] }; if (sql.startsWith("SELECT a.id, a.object_key")) return { rows: [{ id: "a", object_key: "k" }] }; return { rows: [] }; } };
 await assert.rejects(purgeForm(db, async () => { throw new Error("storage down"); }, "f", true));
 assert.equal(calls.at(-1), "ROLLBACK"); assert.equal(calls.some(sql => sql.startsWith("DELETE")), false);
});
test("dry run does not delete storage or database rows", async () => {
 const calls = []; const db = { async query(sql) { calls.push(sql); if (sql.startsWith("SELECT id, status")) return { rows: [{ id: "f", status: "deleted", expired: true }] }; return { rows: [] }; } };
 await purgeForm(db, () => { throw new Error("unexpected"); }, "f", false);
 assert.equal(calls.at(-1), "ROLLBACK"); assert.equal(calls.some(sql => sql.startsWith("DELETE")), false);
});
