import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';
import { chooseSelect } from './select-test-helper.mjs';

const origin = process.env.MARKETING_ORIGIN || process.argv[2] || 'http://localhost:3000';
const output = new URL('../../../artifacts/templates-qa/', import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true });
const headerStyle = page => page.locator('.header-contact-link').first().evaluate(link => {
  const style = getComputedStyle(link);
  return Object.fromEntries(['borderRadius', 'backgroundColor', 'color', 'fontFamily', 'fontSize'].map(key => [key, style[key]]));
});
try {
  for (const width of [1440, 1024, 901, 768, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    await page.goto(`${origin}/contact`, { waitUntil: 'networkidle' });
    const baselineHeader = await headerStyle(page);
    await page.goto(`${origin}/templates`, { waitUntil: 'networkidle' });
    await page.locator('.site-loader').waitFor({ state: 'hidden' });
    assert.deepEqual(await headerStyle(page), baselineHeader, 'Gallery uses the shared header styles');
    assert.ok(await page.locator('h1').evaluate(async heading => {
      const font = `700 48px ${getComputedStyle(heading).fontFamily}`;
      await document.fonts.load(font, heading.textContent);
      return document.fonts.check(font, heading.textContent);
    }), 'Heading font loads');
    assert.match(await page.locator('.templates-page__intro').evaluate(node => getComputedStyle(node).transitionDuration), /0.75s/, 'Gallery uses shared reveal motion');
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.locator('.template-gallery__item').count(), 13);
    assert.equal(await page.locator('.template-gallery__item.site-card[data-slot="card"]').count(), 13, 'Every template uses the shared Card');
    const fieldStyle = locator => locator.evaluate(field => {
      const style = getComputedStyle(field);
      return Object.fromEntries(['height', 'borderRadius', 'borderColor', 'backgroundColor', 'fontFamily', 'fontSize', 'padding'].map(key => [key, style[key]]));
    });
    const gallerySelectStyle = await fieldStyle(page.locator('#template-family'));
    assert.equal(await page.locator('iframe').count(), 0, 'Gallery previews stay static');
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `No overflow at ${width}px`);
    const desktopNav = page.locator('.header-desktop-nav');
    if (await desktopNav.isVisible()) {
      const bounds = await desktopNav.boundingBox();
      assert.ok(bounds.x >= 0 && bounds.x + bounds.width <= width, `Header fits at ${width}px`);
    } else {
      await page.locator('.header-menu-trigger').click();
      await page.locator('.header-sheet__nav a[href="/templates"]').click();
      await page.locator('.header-sheet').waitFor({ state: 'hidden' });
    }
    const family = page.getByLabel('Jenis template', { exact: true });
    await chooseSelect(page, family, 'cafe');
    assert.equal(await page.locator('.template-gallery__item').count(), 9);
    assert.equal(await page.getByLabel('Fitur toko online', { exact: true }).count(), 0);
    await chooseSelect(page, family, 'commerce');
    assert.equal(await page.locator('.template-gallery__item').count(), 4);
    await chooseSelect(page, page.getByLabel('Fitur toko online', { exact: true }), 'advanced');
    for (const href of await page.locator('.template-gallery__image').evaluateAll(links => links.map(link => link.href))) {
      assert.equal(new URL(href).searchParams.get('level'), 'advanced');
    }
    const search = page.getByLabel('Cari template', { exact: true });
    await search.fill('Atelier');
    assert.equal(await page.locator('.template-gallery__item').count(), 1);
    await search.fill('tidak-ada-template-ini');
    assert.equal(await page.locator('.template-gallery__item').count(), 0);
    await page.getByRole('button', { name: 'Tampilkan semua', exact: true }).click();
    assert.equal(await page.locator('.template-gallery__item').count(), 13);
    await page.locator('.template-gallery').scrollIntoViewIfNeeded();
    for (const image of await page.locator('.template-gallery__image img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(image => image.decode());
    }
    if (width === 1440 || width === 390) {
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await page.evaluate(() => scrollTo({ top: 0, behavior: 'instant' }));
      await page.waitForFunction(() => scrollY === 0);
      await page.screenshot({ path: new URL(`gallery-${width}.png`, output).pathname.replace(/^\/([A-Z]:)/, '$1'), fullPage: true, animations: 'disabled' });
    }
    await page.goto(`${origin}/paket`, { waitUntil: 'networkidle' });
    assert.deepEqual(await fieldStyle(page.locator('#estimate-domain')), gallerySelectStyle, 'Pricing and gallery use the same select field appearance');
    assert.deepEqual(errors, [], 'No browser runtime errors');
    await page.close();
  }
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  await page.goto(`${origin}/templates`, { waitUntil: 'networkidle' });
  await page.getByRole('link', { name: 'Switch to English', exact: true }).first().click();
  await page.waitForURL('**/en/templates');
  assert.equal(await page.locator('html').getAttribute('lang'), 'en');
  assert.equal(await page.getByRole('heading', { name: 'Website templates.', exact: true }).count(), 1);
  assert.equal(await page.locator('.template-gallery__item').count(), 13);
  await chooseSelect(page, page.getByLabel('Template type', { exact: true }), 'cafe');
  assert.equal(await page.locator('.template-gallery__item').count(), 9);
  await page.close();
  console.log('Verified template gallery filters, search, demo links, images, locale, reduced motion, and six responsive widths.');
} finally {
  await browser.close();
}
