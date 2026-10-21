import assert from "node:assert/strict";
import { readFile, readdir, stat } from "node:fs/promises";
import { dirname, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = path => readFile(resolve(root, path), "utf8");
const json = async path => JSON.parse((await read(path)).replace(/^\uFEFF/, ""));
async function sources(directory) {
  const entries = await readdir(resolve(root, directory), { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory()
    ? sources(`${directory}/${entry.name}`)
    : /\.(?:tsx?|css)$/.test(entry.name) ? read(`${directory}/${entry.name}`) : ""))).join("\n");
}
const [app, components, layout, css, pkg, business, assets, catalogue, productImages] = await Promise.all([
  sources("app"), sources("components"), read("app/layout.tsx"), read("app/globals.css"),
  json("package.json"), json("research/business.json"), json("research/assets.json"), json("data/menu.json"), json("research/menu/product-image-manifest.json"),
]);
const source = app + components;
assert.equal((source.match(/<h1\b/g) || []).length, 1, "One page-level heading is required, including extracted components");
assert.match(source, /Bukan situs resmi/i, "The independent demo must be disclosed");
assert.match(layout, /robots\s*:\s*\{[^}]*index:\s*false[^}]*follow:\s*false/s, "Search indexing must be disabled");
assert.doesNotMatch(source, /<(?:form|textarea)\b|\bformAction\s*=|\bmethod\s*:\s*["'](?:POST|PUT|PATCH|DELETE)["']/i, "Do not collect or submit data on the prospect's behalf");
assert.match(components, /<Input\s+type="search"/, "Catalogue search must use the reusable input");
assert.doesNotMatch(app, /officialMenu|Lihat menu digital asli|Buka menu digital asli/, "Visitor navigation must use the web catalogue");
assert.match(components, /multiple=\{false\}/, "Event accordion must allow only one open item");
assert.match(components, /aria-pressed=|role=["']tab["']/, "Category controls must expose selection");
assert.match(components, /role=["']status["']|aria-live=/, "Catalogue updates must expose their result count");
assert.match(components, /useReducedMotion/, "Motion must respect user preferences");
assert.match(css, /prefers-reduced-motion/, "CSS motion must respect user preferences");
assert.match(css + components, /focus-visible/, "Keyboard focus must remain visible");
assert.ok(pkg.dependencies.motion && pkg.dependencies.next && pkg.dependencies.react, "Declare standalone runtime dependencies");
assert.ok(!JSON.stringify(pkg).includes("workspace:"), "This app must install independently");
assert.doesNotMatch(source, /from\s+["'](?:@tampiloka|@temura|\.\.\/\.\.\/(?:apps|packages))/, "Source must not depend on sibling apps");
const ids = new Set([...source.matchAll(/\bid=["']([^"']+)["']/g)].map(match => match[1]));
for (const [, anchor] of source.matchAll(/href=["']#([^"']+)["']/g)) assert.ok(ids.has(anchor), `Missing destination: #${anchor}`);
const phone = business.facts.find(fact => fact.field === "phone" && fact.primaryVerified)?.value;
assert.ok(phone && source.includes(`https://wa.me/${phone.replace(/\D/g, "")}`), "WhatsApp must match the primary-verified business contact");
assert.match(source, /Cimanuk[^\n]{0,35}305/, "Keep the verified street address visible");
assert.match(source, /id=["']kunjungi["']/, "Provide a location destination");
assert.match(source, /<iframe\b[^>]*title=/s, "The location map needs an accessible iframe title");
assert.match(source, /maps\.google\.com\/maps|google\.com\/maps\/embed/, "Use a real map, not an illustrative location graphic");
assert.match(source, /output=embed|\/maps\/embed/, "The location map must have an embedded map target");

assert.ok(catalogue.source?.url && /^https:\/\/(?:drive|docs)\.google\.com\//.test(catalogue.source.url), "Record the official Drive PDF source");
assert.ok(catalogue.source.checkedAt && Number.isFinite(Date.parse(catalogue.source.checkedAt)), "Record when the menu was checked");
assert.ok(catalogue.source.priceNote?.trim(), "Explain the source/version limitation of menu prices");
assert.ok(catalogue.source.file, "Keep a local source PDF pointer");
const pdf = resolve(root, catalogue.source.file);
assert.ok(!relative(root, pdf).startsWith(".."), "The source PDF must remain inside this standalone project");
assert.match(catalogue.source.sha256, /^[a-f0-9]{64}$/, "Record the original PDF fingerprint");
const localPdf = await stat(pdf).catch(error => { if (error.code === "ENOENT") return null; throw error; });
if (localPdf) assert.equal((await readFile(pdf)).subarray(0, 5).toString(), "%PDF-", "The retained menu source must be a PDF");
else console.log("Original PDF is kept outside Git; checking committed catalogue/photo provenance.");
assert.ok(Array.isArray(catalogue.categories) && catalogue.categories.length, "Catalogue categories are required");
const categoryIds = new Set();
for (const category of catalogue.categories) {
  assert.ok(category.id && category.label?.trim() && !categoryIds.has(category.id), "Categories need unique IDs and readable labels");
  categoryIds.add(category.id);
}
assert.ok(Array.isArray(catalogue.items) && catalogue.items.length > 7, "The PDF catalogue must go beyond the old seven-item shortlist");
const itemIds = new Set();
assert.equal(productImages.source.file, catalogue.source.file, "Photo extraction and catalogue must point to the same PDF");
const imagePaths = new Set([...source.matchAll(/["'](\/[^"'?#]+\.(?:webp|png|jpe?g|avif|svg|gif))["']/g)].map(match => match[1]));
const priceIsValid = value => typeof value === "number" && Number.isFinite(value) && value > 0;
for (const item of catalogue.items) {
  assert.ok(item.id && !itemIds.has(item.id), `Duplicate or missing product ID: ${item.id}`);
  itemIds.add(item.id);
  assert.ok(item.name?.trim() && typeof item.description === "string", `Missing product text: ${item.id}`);
  assert.ok(categoryIds.has(item.category), `Unknown category on ${item.id}`);
  assert.ok(Number.isInteger(item.page) && item.page >= 1 && item.page <= 31, `Invalid PDF page on ${item.id}`);
  assert.ok(item.price === null || priceIsValid(item.price), `Invalid known price on ${item.id}`);
  if (item.image !== null) {
    assert.ok(typeof item.image === "string" && item.image.startsWith("/") && !item.image.startsWith("//") && !item.image.includes(".."), `Use a local product image on ${item.id}`);
    imagePaths.add(item.image);
    const image = productImages.assets.find(asset => asset.id === item.id);
    assert.ok(image && image.publicImage === item.image && image.sourcePage === item.page, `Photo/page provenance mismatch on ${item.id}`);
    assert.ok(image.width > 0 && image.height > 0 && image.sourceFile && image.sourceObject, `Incomplete photo extraction record on ${item.id}`);
    assert.equal(image.publishable, false, `Product image permission has not been cleared: ${item.id}`);
  }
  if (item.variants !== undefined) {
    assert.ok(Array.isArray(item.variants) && item.variants.length, `Invalid variants on ${item.id}`);
    const labels = new Set();
    for (const variant of item.variants) {
      assert.ok(variant.label?.trim() && !labels.has(variant.label) && priceIsValid(variant.price), `Invalid or duplicate variant on ${item.id}`);
      labels.add(variant.label);
    }
  }
}
assert.ok(catalogue.items.some(item => item.image), "The catalogue must show genuine product photography");
await Promise.all([...imagePaths].map(async path => {
  assert.ok((await stat(resolve(root, `public${path}`))).size > 0, `Missing image: ${path}`);
}));
for (const asset of assets.assets) {
  assert.ok(asset.sourceUrl && asset.attribution && asset.rightsStatus, `Incomplete asset provenance: ${asset.id}`);
  if (asset.rightsStatus === "pending_permission") assert.equal(asset.publishable, false, `Uncleared image marked publishable: ${asset.id}`);
}

const origin = process.argv[2];
if (origin) {
  const url = new URL(origin);
  assert.ok(url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname), "HTTP verification is restricted to the local preview");
  const response = await fetch(url);
  assert.equal(response.status, 200, "Preview must serve successfully");
  const html = await response.text();
  assert.equal((html.match(/<h1\b/g) || []).length, 1, "Served HTML needs one page heading");
  assert.match(html, /<meta\s+name="robots"\s+content="[^"]*noindex/, "Served HTML must declare noindex");
  assert.match(html, /Bukan situs resmi/i, "Served HTML must disclose the demo");
  assert.match(html, /<iframe\b[^>]*title=/, "Served HTML must include the accessible location map");
  assert.match(html, /Cimanuk[^<]{0,35}305/, "Served HTML must contain the actual address");
  for (const [, payload] of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) JSON.parse(payload);
  for (const path of imagePaths) {
    const image = await fetch(new URL(path, url), { method: "HEAD" });
    assert.equal(image.status, 200, `Preview image unavailable: ${path}`);
    assert.match(image.headers.get("content-type") || "", /^image\//, `Invalid image response: ${path}`);
  }
  const product = catalogue.items.find(item => item.image);
  const optimized = await fetch(new URL(`/_next/image?url=${encodeURIComponent(product.image)}&w=640&q=75`, url));
  assert.equal(optimized.status, 200, "Next image optimization must work for catalogue photos");
  assert.match(optimized.headers.get("content-type") || "", /^image\//, "Optimized product response must be an image");
}
console.log(`Demo boundary checks passed (${catalogue.items.length} PDF items, ${imagePaths.size} local images${origin ? ", HTTP verified" : ", static only"}).`);
