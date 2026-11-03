import { GET } from "../app/api/admin/forms/route";
import { test } from "node:test";
import assert from "node:assert/strict";
test("admin form API rejects unauthenticated requests", async () => {
 delete process.env.ADMIN_EMAIL_ALLOWLIST;
 const response = await GET(new Request("http://localhost/api/admin/forms"));
 assert.equal(response.status, 401);
 assert.deepEqual(await response.json(), { error: "Unauthorized" });
});

test("request body is bounded before parsing", async () => {
 const { readJson } = await import("../lib/forms/http");
 const request = new Request("http://localhost/", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ value: "x".repeat(1_000_001) }) });
 await assert.rejects(readJson(request), (error: unknown) => error instanceof Error && "status" in error && error.status === 413);
});
