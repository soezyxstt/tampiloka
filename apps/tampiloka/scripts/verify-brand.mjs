import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";

const root = new URL("../", import.meta.url);
const read = (file) => readFileSync(new URL(file, root));
const json = (file) => JSON.parse(read(file).toString().replace(/^\uFEFF/, ""));
const manifest = json("public/brand/manifest.json");
const assets = [...manifest.files, ...manifest.additionalFiles];
for (const asset of assets) {
  const bytes = read(`public/brand/${asset.path}`);
  assert.equal(createHash("sha256").update(bytes).digest("hex"), asset.sha256, asset.path);
}
for (const [target, source] of [
  ["app/apple-icon.png", "icons/light/tampiloka-apple-touch-light.png"],
  ["app/opengraph-image.png", "social/light/tampiloka-og-image-light.png"],
]) {
  assert.deepEqual(read(target), read(`public/brand/${source}`), target);
}
const favicon = read("app/favicon.ico");
assert.equal(favicon.readUInt16LE(2), 1, "ICO image type");
assert.equal(favicon.readUInt16LE(4), 4, "ICO has four resolutions");
assert.deepEqual([0, 1, 2, 3].map(i => favicon[6 + i * 16] || 256), [16, 32, 48, 256]);
for (const icon of json("public/site.webmanifest").icons) {
  assert(read(`public${icon.src}`).length > 0, icon.src);
}

const css = read("../../packages/brand-system/styles.css").toString();
assert(!css.includes("--font-sans: var(--font-sans)"));
const tokens = json("public/brand/tokens/brand-tokens.json").typography;
const mobile = css.match(/\/\* Tampiloka typography[\s\S]*?:root \{([^}]+)\}/)[1];
const desktop = css.match(/@media \(min-width: 48rem\) \{\s*:root \{([^}]+)\}/)[1];
for (const [name, spec] of Object.entries(tokens.desktop)) {
  const utility = css.match(new RegExp(`@utility type-${name} \\{([^}]+)\\}`))?.[1];
  assert(utility, name);
  const fontVariable = spec.fontFamily === "Manrope" ? "--font-manrope" : "--font-inter";
  for (const declaration of [
    `font-family: var(${fontVariable})`,
    `font-size: var(--type-${name}-size)`,
    `font-weight: ${spec.fontWeight};`,
    `line-height: ${spec.lineHeight};`,
    `letter-spacing: ${spec.letterSpacing};`,
  ]) assert(utility.includes(declaration), `${name}: ${declaration}`);
  assert(mobile.includes(`--type-${name}-size: ${tokens.mobile[name].fontSize / 16}rem;`), name);
  if (spec.fontSize !== tokens.mobile[name].fontSize) {
    assert(desktop.includes(`--type-${name}-size: ${spec.fontSize / 16}rem;`), name);
  }
}
console.log(`Verified ${assets.length} brand assets, app metadata copies, manifest icons, and 15 responsive typography styles.`);
