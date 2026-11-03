import { strict as assert } from "node:assert";
import { test } from "node:test";
import { MAX_FILE_SIZE, validateUpload, matchesFileSignature } from "./policy";

test("upload policy rejects dangerous names, types and invalid sizes", () => {
  const file = { filename: "photo.jpg", contentType: "image/jpeg", size: 42 };
  assert.equal(validateUpload(file), true);
  assert.equal(validateUpload({ ...file, filename: "../photo.jpg" }), false);
  assert.equal(validateUpload({ ...file, contentType: "image/svg+xml" }), false);
  assert.equal(validateUpload({ ...file, size: MAX_FILE_SIZE + 1 }), false);
  assert.equal(validateUpload(file, { allowedTypes: [".pdf"] }), false);
  assert.equal(validateUpload(file, { allowedTypes: [".jpg"], maxFileSize: 41 }), false);
});

test("content and extension must both match supported formats", () => {
  const pdf = new TextEncoder().encode("%PDF-1.7");
  assert.equal(matchesFileSignature(pdf, "application/pdf"), true);
  assert.equal(matchesFileSignature(pdf, "image/png"), false);
  assert.equal(matchesFileSignature(new TextEncoder().encode("not a pdf"), "application/pdf"), false);
  assert.equal(validateUpload({ filename: "spoof.pdf", contentType: "image/png", size: 10 }, { allowedTypes: [".pdf"] }), false);
  assert.equal(validateUpload({ filename: "file.txt", contentType: "text/plain", size: 10 }), false);
});
