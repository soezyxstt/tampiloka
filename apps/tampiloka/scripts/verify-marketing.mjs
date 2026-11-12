import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const images = JSON.parse(await readFile(new URL('./image-manifest.json', import.meta.url), 'utf8'));
assert.equal(new Set(images.map(([id]) => id)).size, images.length, 'Each image needs a unique source');
assert.equal(new Set(images.map(([, name]) => name)).size, images.length, 'Image names must be unique');
const origin = process.env.MARKETING_ORIGIN || process.argv[2] || 'http://localhost:3000';
const seoOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tampiloka.site').origin;
const generatedDir = fileURLToPath(new URL('../public/generated/', import.meta.url));
const routePairs = [
  ['/', '/en'],
  ['/layanan', '/en/services'],
  ['/paket', '/en/pricing'],
  ['/produk', '/en/work'],
  ['/templates', '/en/templates'],
  ['/industri', '/en/industries'],
  ['/tentang', '/en/about'],
  ['/contact', '/en/contact'],
];
const englishSignals = new Map([
  ['/en', 'A web studio for'],
  ['/en/services', 'Tampiloka services.'],
  ['/en/pricing', 'Business website packages.'],
  ['/en/work', 'digital invitations.'],
  ['/en/templates', 'Templates'],
  ['/en/industries', 'Websites for your industry.'],
  ['/en/about', 'About Tampiloka.'],
  ['/en/contact', 'project'],
]);
const pages = new Map();
const localizedPaths = (localeIndex) => routePairs.map((pair) => pair[localeIndex]);
const absolute = (path) => new URL(path, seoOrigin).toString();
const assertSamePublicUrl = (actual, expected, message) => {
  assert.ok(actual, `${message}: URL is present`);
  const actualUrl = new URL(actual);
  const expectedUrl = new URL(expected);
  const normalizedPath = (pathname) => pathname.length > 1 ? pathname.replace(/\/$/, '') : '/';
  assert.equal(actualUrl.origin, expectedUrl.origin, `${message}: origin`);
  assert.equal(normalizedPath(actualUrl.pathname), normalizedPath(expectedUrl.pathname), `${message}: pathname`);
  assert.equal(actualUrl.search, expectedUrl.search, `${message}: query`);
  assert.equal(actualUrl.hash, expectedUrl.hash, `${message}: hash`);
};
const attr = (html, name, value) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const match = html.match(new RegExp(`<link\\b(?=[^>]*\\b${name}=["']${escaped}["'])[^>]*\\bhref=["']([^"']+)["'][^>]*>`, 'i'));
  return match?.[1];
};
const meta = (html, key, value) => {
  const escaped = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`<meta\\b(?=[^>]*\\b${key}=["']${escaped}["'])[^>]*\\bcontent=["']([^"']+)["'][^>]*>`, 'i').exec(html)?.[1];
};

for (let index = 0; index < routePairs.length; index += 1) {
  const [idPath, enPath] = routePairs[index];
  for (const [locale, path] of [['id', idPath], ['en', enPath]]) {
    const response = await fetch(new URL(path, origin));
    assert.equal(response.status, 200, `${path} must load directly`);
    const html = await response.text();
    const visibleHtml = html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');
    pages.set(path, html);
    assert.match(html, new RegExp(`<html\\b[^>]*\\blang=["']${locale === 'id' ? 'id' : 'en'}["']`, 'i'), `${path}: document language`);
    assert.equal((html.match(/<h1\b/g) || []).length, 1, `${path}: one h1`);
    assert.equal((html.match(/<main\b/g) || []).length, 1, `${path}: one main landmark`);
    assert.ok(!/Garut|Bandung/.test(html), `${path}: regional target stays internal`);
    const canonical = attr(html, 'rel', 'canonical');
    assertSamePublicUrl(canonical, absolute(path), `${path}: self canonical`);
    assertSamePublicUrl(attr(html, 'hreflang', 'id'), absolute(idPath), `${path}: Indonesian hreflang`);
    assertSamePublicUrl(attr(html, 'hreflang', 'en'), absolute(enPath), `${path}: English hreflang`);
    assertSamePublicUrl(attr(html, 'hreflang', 'x-default'), absolute(idPath), `${path}: x-default points to Indonesian default`);
    assert.equal(meta(html, 'property', 'og:locale'), locale === 'id' ? 'id_ID' : 'en_US', `${path}: Open Graph locale`);
    if (idPath === '/templates') {
      assert.match(html, /<title>[^<]*Template[^<]*\| Tampiloka<\/title>/i, `${path}: localized template SEO title`);
    }
    const header = html.slice(html.indexOf('<header'), html.indexOf('</header>') + '</header>'.length);
    const workHref = locale === 'id' ? '/produk' : '/en/work';
    const templatesHref = locale === 'id' ? '/templates' : '/en/templates';
    assert.ok(header.indexOf(`href="${workHref}"`) >= 0 && header.indexOf(`href="${templatesHref}"`) > header.indexOf(`href="${workHref}"`), `${path}: template navigation follows work`);
    assert.ok(html.includes(`"inLanguage":"${locale === 'id' ? 'id-ID' : 'en'}"`), `${path}: structured data language`);
    assert.ok(html.includes('faq-section'), `${path}: FAQ available`);
    assert.ok(html.includes('href="https://wa.me/6282119307102"'), `${path}: WhatsApp contact available`);
    assert.ok(!/\+?62[\s-]*821[\s-]*1930[\s-]*7102|0821[\s-]*1930[\s-]*7102/.test(visibleHtml.replace(/<[^>]*>/g, '')), `${path}: contact number is not displayed`);
    for (const expectedPath of localizedPaths(locale === 'id' ? 0 : 1).slice(1)) {
      assert.ok(html.includes(`href="${expectedPath}"`), `${path}: missing ${locale} navigation to ${expectedPath}`);
    }
    if (locale === 'en') {
      assert.ok(visibleHtml.includes(englishSignals.get(path)), `${path}: English page-specific copy is present`);
      assert.ok(visibleHtml.includes('Frequently asked questions.'), `${path}: English FAQ copy is present`);
      for (const untranslated of [
        'Langsung ke isi halaman',
        'Kembali ke beranda',
        'Halaman tidak ditemukan.',
        'Pertanyaan umum.',
        'Layanan Tampiloka.',
        'Paket website bisnis.',
        'Bicarakan proyek Anda.',
        'Tentang Tampiloka.',
        'Contoh tampilan untuk ilustrasi, bukan proyek klien.',
        'Apa yang perlu disiapkan sebelum mulai?',
      ]) {
        assert.ok(!visibleHtml.includes(untranslated), `${path}: Indonesian copy leaked into English page: ${untranslated}`);
      }
      assert.ok(html.includes('href="/"') || html.includes('href="/en"'), `${path}: language switch can return to Indonesian`);
    }
    if (idPath === '/' || idPath === '/produk') {
      if (idPath === '/') assert.ok(visibleHtml.replace(/<[^>]*>/g, '').includes(locale === 'id' ? 'Konsep /' : 'Concept /'), `${path}: concise concept category retained`);
      const projectNames = [...html.matchAll(/<h3[^>]*showcase__project-name[^>]*>([^<]+)<\/h3>/g)].map(([, name]) => name);
      assert.equal(projectNames.length, 5, `${path}: curated homepage or default portfolio selection`);
      assert.ok(projectNames.includes('Syahril MC'), `${path}: Syahril MC is showcased`);
      assert.ok(html.includes('href="https://syahril.tampiloka.site/"'), `${path}: Syahril website linked`);
      assert.ok(projectNames.includes('Ginalist'), `${path}: Ginalist showcased`);
      assert.ok(html.includes('href="https://ginalist.tampiloka.site/"'), `${path}: Ginalist website linked`);
      const portfolioUrls = idPath === '/produk'
        ? ['https://www.zyxacademy.com/', 'https://iamitb.org/', 'https://www.pamokagarut.com/']
        : ['https://www.zyxacademy.com/'];
      for (const url of portfolioUrls) {
        assert.ok(html.includes(`href="${url}"`), `${path}: ${url} linked`);
      }
    }
  }
}

for (const path of ['/contact', '/en/contact']) {
  const html = pages.get(path);
  const whatsappLinks = [...html.matchAll(/<a\b([^>]*href="https:\/\/wa\.me\/6282119307102"[^>]*)>([\s\S]*?)<\/a>/g)];
  assert.ok(whatsappLinks.length, `${path}: WhatsApp contact remains available`);
  for (const [, attributes, content] of whatsappLinks) {
    assert.match(attributes, /aria-label="[^"]*WhatsApp[^"]*"/i, `${path}: icon link has an accessible name`);
    assert.match(content, /<svg\b/, `${path}: contact action uses an icon`);
    assert.equal(content.replace(/<[^>]*>/g, '').trim(), '', `${path}: contact action has no visible platform text`);
  }
  assert.ok(!html.includes('contact-page__social'), `${path}: no separate social section`);
  assert.ok(!html.includes('inner-page__end-link'), `${path}: no redundant home link`);
}
for (const [locale, path] of [['id', '/halaman-tidak-tersedia'], ['en', '/en/page-not-found']]) {
  const response = await fetch(new URL(path, origin));
  assert.equal(response.status, 404, `${path} returns a real HTTP 404`);
  const html = await response.text();
  assert.match(html, /name="robots" content="[^\"]*noindex/i, `${path} is excluded from search`);
  assert.match(html, new RegExp(`<html\\b[^>]*\\blang=["']${locale === 'id' ? 'id' : 'en'}["']`, 'i'), `${path}: localized 404 document language`);
  assert.ok(locale === 'id' ? html.includes('Halaman tidak ditemukan.') : /Page not found/i.test(html), `${path}: localized 404 copy`);
}

const industryPage = pages.get('/industri');
assert.equal((industryPage.match(/class="industry-row"/g) || []).length, 7, 'Seven editorial industry sections');
assert.ok(!industryPage.includes('industry-card'), 'Industries use editorial sections');
assert.ok(industryPage.includes('Contoh tampilan untuk ilustrasi'), 'Industry previews disclose concept status');
assert.ok(pages.get('/en/industries').includes('These illustrative designs are concepts, not client projects.'), 'English industry previews disclose concept status');
for (const [path, html] of pages) {
  for (const [, href] of html.matchAll(/href="(\/(?:layanan|industri|services|industries)#[^"]+)"/g)) {
    const [route, id] = href.split('#');
    assert.ok(pages.get(route)?.includes(`id="${id}"`), `${path}: broken section link ${href}`);
  }
}
const localizedFooterAnchors = [
  ...['service-website', 'service-digital-product', 'service-development', 'service-branding'].map((id) => [`/en/services#${id}`, '/en/services', id]),
  ...['industry-food', 'industry-fashion', 'industry-portfolio-architecture', 'industry-small-business', 'industry-technology', 'industry-enterprise', 'industry-wedding'].map((id) => [`/en/industries#${id}`, '/en/industries', id]),
];
for (const [localeIndex, path] of routePairs.flatMap((pair) => pair.map((path, localeIndex) => [localeIndex, path]))) {
  const html = pages.get(path);
  const footerStart = html.indexOf('<footer');
  const footerEnd = html.indexOf('</footer>', footerStart);
  assert.ok(footerStart >= 0 && footerEnd > footerStart, `${path}: footer landmark exists`);
  const footer = html.slice(footerStart, footerEnd + '</footer>'.length);
  for (const href of localizedPaths(localeIndex).slice(1)) {
    assert.ok(footer.includes(`href="${href}"`), `${path}: footer uses localized route ${href}`);
  }
}
for (const [href, route, id] of localizedFooterAnchors) {
  for (const path of localizedPaths(1)) assert.ok(pages.get(path).includes(`href="${href}"`), `${path}: footer link uses localized route ${href}`);
  assert.ok(pages.get(route).includes(`id="${id}"`), `${href}: target section exists on the English page`);
}

const sitemapResponse = await fetch(new URL('/sitemap.xml', origin));
assert.equal(sitemapResponse.status, 200, 'Sitemap loads');
const sitemap = await sitemapResponse.text();
const urlEntries = [...sitemap.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, entry]) => entry);
assert.equal(urlEntries.length, routePairs.length * 2, 'Sitemap has all localized pages');
const sitemapLocations = urlEntries.map((entry) => /<loc>([^<]+)<\/loc>/.exec(entry)?.[1]);
assert.equal(new Set(sitemapLocations).size, routePairs.length * 2, 'Sitemap URLs are unique');
assert.deepEqual([...sitemapLocations].sort(), routePairs.flatMap((pair) => pair.map(absolute)).sort(), 'Sitemap contains exactly the Indonesian and English route sets');
for (const [index, entry] of urlEntries.entries()) {
  const [idPath, enPath] = routePairs[Math.floor(index / 2)];
  const expectedEntryPath = index % 2 === 0 ? idPath : enPath;
  assertSamePublicUrl(sitemapLocations[index], absolute(expectedEntryPath), `${expectedEntryPath}: sitemap location`);
  assert.ok(entry.indexOf('<loc>') < entry.indexOf('<lastmod>'), 'loc precedes lastmod');
  assert.ok(entry.indexOf('<lastmod>') < entry.indexOf('<changefreq>'), 'lastmod precedes changefreq');
  assert.ok(entry.indexOf('<changefreq>') < entry.indexOf('<priority>'), 'changefreq precedes priority');
  assert.ok(!entry.includes('<image:image>') || entry.indexOf('<priority>') < entry.indexOf('<image:image>'), 'image extension follows standard elements');
  const expectedAlternates = { id: absolute(idPath), en: absolute(enPath), 'x-default': absolute(idPath) };
  for (const [code, expected] of Object.entries(expectedAlternates)) {
    const href = new RegExp(`hreflang="${code}" href="([^"]+)"`).exec(entry)?.[1];
    assertSamePublicUrl(href, expected, `${expectedEntryPath}: sitemap ${code} alternate`);
  }
}

for (const asset of ['/favicon.ico', '/apple-icon.png', '/opengraph-image.png', '/site.webmanifest', '/brand/logos/light/tampiloka-horizontal-light.svg']) {
  assert.equal((await fetch(new URL(asset, origin))).status, 200, `Missing ${asset}`);
}
const hashes = new Set();
for (const [id, name, optional = false] of images) {
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
console.log('Verified localized routes, 404 status and indexing, canonical/hreflang/OG language, sitemap alternates, navigation, FAQ, and public assets.');
