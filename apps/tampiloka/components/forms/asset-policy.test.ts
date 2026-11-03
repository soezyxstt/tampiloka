import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { canReadFormImage } from "./asset-policy";
import { createBlankForm } from "@/lib/forms/schema";

describe("form image access", () => {
  const form = { ownerId: "owner", status: "published" };
  const image = { id: "image", ownerId: "owner", state: "uploaded", uploadSessionId: null, contentType: "image/png" };
  const revision = { ...createBlankForm(), headerAssetId: "image" };
  test("only published references are anonymous", () => {
    assert.equal(canReadFormImage(image, form, revision), true);
    assert.equal(canReadFormImage(image, form, createBlankForm()), false);
    assert.equal(canReadFormImage(image, { ...form, status: "closed" }, revision), false);
    assert.equal(canReadFormImage(image, form, null), false);
  });
  test("owner can preview drafts but respondent and unsafe files remain private", () => {
    assert.equal(canReadFormImage(image, { ...form, status: "draft" }, null, "owner"), true);
    assert.equal(canReadFormImage(image, form, null, "other"), false);
    assert.equal(canReadFormImage({ ...image, uploadSessionId: "session" }, form, revision, "owner"), false);
    assert.equal(canReadFormImage({ ...image, contentType: "image/svg+xml" }, form, revision, "owner"), false);
    assert.equal(canReadFormImage({ ...image, state: "pending" }, form, revision, "owner"), false);
    assert.equal(canReadFormImage(image, { ...form, status: "deleted" }, revision, "owner"), false);
  });
});
