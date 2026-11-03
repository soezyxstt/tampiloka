import { mock, test } from "bun:test";
import assert from "node:assert/strict";
import { NextRequest } from "next/server";

class FormError extends Error { constructor(public status: number) { super("Form unavailable"); } }
let failure: number | undefined;
mock.module("@/lib/forms/service", () => ({ FormError, getPublicForm: async () => { if (failure) throw new FormError(failure); } }));
const { default: proxy } = await import("../proxy");

test("closed public forms return 410 without affecting open or unavailable forms", async () => {
  failure = 410;
  const closed = await proxy(new NextRequest("https://tampiloka.site/f/example"));
  assert.equal(closed.status, 410);
  assert.match(await closed.text(), /Formulir sudah ditutup/);
  const head = await proxy(new NextRequest("https://tampiloka.site/f/example", { method: "HEAD" }));
  assert.equal(head.status, 410); assert.equal(await head.text(), "");
  for (failure of [undefined, 404, 503]) {
    const response = await proxy(new NextRequest("https://tampiloka.site/f/example"));
    assert.equal(response.headers.get("x-middleware-next"), "1");
  }
  assert.equal((await proxy(new NextRequest("https://tampiloka.site/admin"))).headers.get("x-middleware-next"), "1");
});
