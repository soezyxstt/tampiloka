import { readFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { join } from "node:path";
import assert from "node:assert/strict";

const root = join(process.cwd(), "public/brand");
const manifest = JSON.parse(readFileSync(join(root, "manifest.json"), "utf8"));
for (const asset of manifest.assets) {
  const bytes = readFileSync(join(root, asset.path));
  if (createHash("sha256").update(bytes).digest("hex") !== asset.sha256) throw new Error(`Changed Figma asset: ${asset.path}`);
  if (asset.path.endsWith(".png")) {
    const width = bytes.readUInt32BE(16), height = bytes.readUInt32BE(20);
    if (asset.path.includes("og-image") && (width !== 1200 || height !== 630)) throw new Error(`Invalid OG size: ${asset.path}`);
  }
}
for (const path of ["app/favicon.ico", "app/apple-icon.png", "app/opengraph-image.png", "public/site.webmanifest"]) {
  if (!existsSync(path)) throw new Error(`Missing metadata file: ${path}`);
}
for (const [target, source] of [
  ["app/apple-icon.png", "icons/light/temura-apple-touch-light.png"],
  ["app/opengraph-image.png", "social/light/temura-og-image-light.png"],
]) {
  assert.deepEqual(readFileSync(target), readFileSync(join(root, source)), target);
}

const favicon = readFileSync("app/favicon.ico");
assert.equal(favicon.readUInt16LE(2), 1, "ICO image type");
assert.equal(favicon.readUInt16LE(4), 4, "ICO has four resolutions");
assert.deepEqual([0, 1, 2, 3].map(i => favicon[6 + i * 16] || 256), [16, 32, 48, 256]);

const webmanifest = JSON.parse(readFileSync("public/site.webmanifest", "utf8"));
for (const icon of webmanifest.icons) if (!existsSync(join("public", icon.src))) throw new Error(`Missing manifest icon: ${icon.src}`);
console.log(`Verified ${manifest.assets.length} original Figma assets, OG image, 4-resolution clean favicon, Apple icon, and manifest.`);
