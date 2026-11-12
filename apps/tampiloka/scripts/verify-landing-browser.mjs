import assert from 'node:assert/strict';
import { mkdir } from 'node:fs/promises';
import { chromium } from 'playwright';

const origin = process.argv[2] || 'http://localhost:3000';
const output = process.argv[3];
if (output) await mkdir(output, { recursive: true });
const browser = await chromium.launch();
try {
  for (const width of [390, 768, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    for (const [path, about, contact, features] of [
      ['/', '/tentang', '/contact', 'Contoh fiturnya'],
      ['/en', '/en/about', '/en/contact', 'Example features'],
    ]) {
      await page.goto(new URL(path, origin).href, { waitUntil: 'load' });
      await page.locator('.site-loader').waitFor({ state: 'detached' });
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.solution-teaser').count(), 3);
      assert.equal(await page.locator('.hero-stage__caption, .solution-teasers__note, .template-discovery__disclosure, .studio-visual-caption').count(), 0);
      if (width < 768) {
        assert.equal(await page.locator('.landing-page .showcase__project:visible').count(), 2, 'Mobile keeps a short work selection');
        assert.equal(await page.locator('.landing-page .studio-services:visible, .landing-page .studio-industries:visible, .solution-teaser__visual:visible').count(), 0, 'Mobile removes repeated sections and large decorative previews');
        assert.ok(await page.evaluate(() => document.documentElement.scrollHeight < 8000), 'Mobile page stays below the previous 12,071px layout');
      }
      assert.equal(await page.locator('.hero-actions a').first().getAttribute('href'), contact);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${path}: overflow at ${width}`);
      if (output) await page.screenshot({ path: `${output}/hero-${path === '/' ? 'id' : 'en'}-${width}.png` });
      if (width >= 768) {
        const before = await page.locator('.hero-stage__sheet--front').evaluate(el => getComputedStyle(el).transform);
        await page.evaluate(() => scrollTo({ top: 250, behavior: 'instant' }));
        await page.waitForFunction(previous => getComputedStyle(document.querySelector('.hero-stage__sheet--front')).transform !== previous, before);
      }
      const trigger = page.getByRole('button', { name: features, exact: true }).first();
      await trigger.scrollIntoViewIfNeeded();
      await trigger.focus();
      await page.keyboard.press('Enter');
      await page.waitForFunction(() => document.querySelector('.solution-teaser__trigger')?.getAttribute('aria-expanded') === 'true');
      assert.ok(await trigger.evaluate(el => el === document.activeElement), 'Keyboard focus stays on disclosure');
      await page.keyboard.press('Space');
      await page.waitForFunction(() => document.querySelector('.solution-teaser__trigger')?.getAttribute('aria-expanded') === 'false');
      await page.waitForTimeout(1400);
      if (output) await page.screenshot({ path: `${output}/solutions-${path === '/' ? 'id' : 'en'}-${width}.png` });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      assert.equal(await page.locator('.hero-stage__sheet--front').evaluate(el => getComputedStyle(el).animationName), 'none');
      assert.equal(await page.locator('.hero-stage__sheet--front').evaluate(el => getComputedStyle(el).transform), 'none');
      assert.equal(await page.locator('.solution-teasers__intro').evaluate(el => getComputedStyle(el).position), 'static');
      await page.emulateMedia({ reducedMotion: 'no-preference' });
      // Client navigation catches styles that persist after leaving the landing page.
      const aboutLink = page.locator(`a[href="${about}"]:visible`).first();
      await aboutLink.scrollIntoViewIfNeeded();
      await aboutLink.click();
      await page.waitForURL(new URL(about, origin).href);
      await page.waitForLoadState('networkidle');
      const cta = page.locator('.about-visual-section a');
      assert.equal(await cta.getAttribute('href'), contact);
      assert.equal(await page.locator('.inner-page__end-link').count(), 0);
      await cta.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1400);
      if (output) await page.screenshot({ path: `${output}/about-${path === '/' ? 'id' : 'en'}-${width}.png` });
      await page.reload();
      assert.equal(await page.locator('.about-process-action a').getAttribute('href'), contact);
      assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      const languageLink = page.locator('.language-switcher a:visible').last();
      assert.ok((await languageLink.getAttribute('aria-label')).includes('EN'), 'Accessible language label includes visible abbreviation');
      if (path === '/') {
        await page.evaluate(() => history.replaceState(null, '', '?source=qa#cara-kerja'));
        await languageLink.click();
        await page.waitForURL(new URL('/en/about?source=qa#cara-kerja', origin).href);
      }
    }
    assert.deepEqual(errors, [], `No runtime errors at ${width}`);
    await page.close();
  }
  const page = await browser.newPage({ javaScriptEnabled: false });
  await page.goto(origin);
  assert.ok(await page.locator('#hero-title').isVisible(), 'No-JS hero remains readable');
  assert.equal(await page.locator('.solution-teaser').count(), 3, 'No-JS solution summaries are server rendered');
  console.log('Landing/about: ID/EN, 390/768/1440, keyboard disclosures, CTA destinations, client navigation, reload, reduced motion, no-JS and runtime checks passed.');
} finally {
  await browser.close();
}
