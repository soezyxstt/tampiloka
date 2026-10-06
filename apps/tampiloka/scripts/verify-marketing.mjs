import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
const images = JSON.parse(await readFile(new URL('./image-manifest.json', import.meta.url), 'utf8'));
assert.equal(new Set(images.map(([id]) => id)).size, images.length, 'Each image needs a unique source');
assert.equal(new Set(images.map(([,name]) => name)).size, images.length, 'Image names must be unique');
const origin = process.env.MARKETING_ORIGIN || process.argv[2] || 'http://localhost:3000';
const generatedDir = fileURLToPath(new URL('../public/generated/', import.meta.url));
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
  assert.ok(html.includes('href="https://wa.me/6282119307102"'), `${route}: WhatsApp contact available`);
  if (route === '/' || route === '/produk') {
    assert.ok(html.includes('bukan proyek klien'), `${route}: concepts disclosed`);
    const projectNames = [...html.matchAll(/<h3[^>]*showcase__project-name[^>]*>([^<]+)<\/h3>/g)].map(([,name]) => name);
    assert.equal(projectNames.length, 6, `${route}: six selected works`);
    assert.equal(projectNames[1], 'Syahril MC', `${route}: Syahril MC is second`);
    assert.ok(html.includes('href="https://syahril-mc.vercel.app/"'), `${route}: Syahril website linked`);
  }
}
assert.match(pages.get('/contact'), /<a[^>]*href="https:\/\/wa\.me\/6282119307102"[^>]*>[\s\S]*?Hubungi via WhatsApp/, 'WhatsApp is the main contact CTA');
const notFoundResponse = await fetch(new URL('/halaman-tidak-tersedia', origin));
assert.equal(notFoundResponse.status, 404, 'Unknown routes return 404');
const notFoundHtml = await notFoundResponse.text();
assert.ok(notFoundHtml.includes('Halaman tidak ditemukan.'), '404 uses the Tampiloka page');
assert.ok(notFoundHtml.includes('Kembali ke beranda') && notFoundHtml.includes('href="/produk"'), '404 provides recovery links');
assert.match(notFoundHtml, /name="robots" content="[^"]*noindex/, '404 is excluded from search');
const industryPage = pages.get('/industri');
assert.equal((industryPage.match(/class="industry-row"/g) || []).length, 7, 'Seven editorial industry sections');
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
for (const [id,name,optional = false] of images) {
  if (optional) {
    try { await access(resolve(generatedDir, `Gemini_Generated_Image_${id}.jpg`)); } catch {
      console.log(`Skipped optional image until its Gemini download is added: ${name}`);
      continue;
    }
  }
  const response = await fetch(new URL(`/images/${name}.webp`, origin));
  assert.equal(response.status, 200, `Missing ${name}`);
  const hash = createHash('sha256').update(Buffer.from(await response.arrayBuffer())).digest('hex');
  assert.ok(!hashes.has(hash), `Duplicate image: ${name}`);
  hashes.add(hash);
}
console.log('Verified six routes, seven industry sections, navigation, semantic landmarks, FAQ, concept disclosure, and public assets.');
