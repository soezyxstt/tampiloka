import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const images = JSON.parse(await readFile(new URL('./image-manifest.json', import.meta.url), 'utf8'));
assert.equal(new Set(images.map(([id]) => id)).size, images.length, 'Each image needs a unique source');
assert.equal(new Set(images.map(([,name]) => name)).size, images.length, 'Image names must be unique');
const origin = process.argv[2] || 'http://localhost:3001';
const routes = ['/', '/produk', '/layanan', '/industri', '/tentang', '/contact'];
const pages = new Map();
for (const route of routes) {
  const response = await fetch(new URL(route, origin));
  assert.equal(response.status, 200, `${route} must load`);
  const html = await response.text();
  pages.set(route, html);
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: one h1`);
  assert.equal((html.match(/<main\b/g) || []).length, 1, `${route}: one main landmark`);
  assert.ok(!/Garut|Bandung/.test(html), `${route}: regional target stays internal`);
  for (const href of routes.slice(1)) assert.ok(html.includes(`href="${href}"`), `${route}: missing nav ${href}`);
  assert.ok(html.includes('faq-section'), `${route}: FAQ available`);
  if (route === '/' || route === '/produk') assert.ok(html.includes('bukan proyek klien'), `${route}: concepts disclosed`);
}
const industryPage = pages.get('/industri');
assert.equal((industryPage.match(/class="industry-row"/g) || []).length, 6, 'Six editorial industry sections');
assert.ok(!industryPage.includes('industry-card'), 'Industries use editorial sections');
assert.ok(industryPage.includes('Preview konsep untuk ilustrasi'), 'Industry previews disclose concept status');
for (const [,html] of pages) {
  for (const [,href] of html.matchAll(/href="(\/(?:layanan|industri)#[^"]+)"/g)) {
    const [route,id] = href.split('#');
    assert.ok(pages.get(route).includes(`id="${id}"`), `Broken section link: ${href}`);
  }
}
for (const asset of ['/favicon.ico', '/apple-icon.png', '/opengraph-image.png', '/site.webmanifest', '/brand/logos/light/tampiloka-horizontal-light.svg']) assert.equal((await fetch(new URL(asset, origin))).status, 200, `Missing ${asset}`);
const hashes = new Set();
for (const [,name] of images) {
  const response = await fetch(new URL(`/images/${name}.webp`, origin));
  assert.equal(response.status, 200, `Missing ${name}`);
  const hash = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
  assert.ok(!hashes.has(hash), `Duplicate image: ${name}`);
  hashes.add(hash);
}
console.log('Verified six routes, navigation, semantic landmarks, FAQ, concept disclosure, and public assets.');
