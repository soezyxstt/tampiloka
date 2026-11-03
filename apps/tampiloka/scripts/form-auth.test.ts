import { getAdminSession, requireAdmin, isAllowedAdmin } from "../lib/auth/index";
import assert from "node:assert/strict";
import { test } from "node:test";
test("missing configuration fails closed", async () => {
  delete process.env.ADMIN_EMAIL_ALLOWLIST;
  assert.equal(await getAdminSession(), null);
  await assert.rejects(requireAdmin(), /UNAUTHORIZED/);
  assert.equal(isAllowedAdmin("owner@example.com"), false);
});
test("allowlist matches complete normalized addresses only", () => {
  process.env.ADMIN_EMAIL_ALLOWLIST = "Owner@Example.com, second@example.com";
  assert.equal(isAllowedAdmin("owner@example.com"), true);
  assert.equal(isAllowedAdmin("xowner@example.com"), false);
  delete process.env.ADMIN_EMAIL_ALLOWLIST;
});
