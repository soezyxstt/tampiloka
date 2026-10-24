import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

const origin = process.env.MARKETING_ORIGIN || process.argv[2] || 'http://localhost:3000';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : chromium.executablePath()),
  args: ['--no-sandbox'],
});
const socialSelector = 'a[href*="wa.me"], a[href*="instagram.com"], a[href*="x.com/"], a[href*="linkedin.com"]';
const headerStyle = (page) => page.locator('.header-contact-link').first().evaluate((link) => {
  const style = getComputedStyle(link);
  return Object.fromEntries(['borderRadius', 'backgroundColor', 'color', 'fontFamily', 'fontSize', 'padding', 'boxShadow'].map((key) => [key, style[key]]));
});

try {
  for (const width of [1440, 390, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(new URL('/contact', origin).toString(), { waitUntil: 'networkidle' });
    const baseline = await headerStyle(page);
    for (const path of ['/contact', '/en/contact', '/paket', '/en/pricing']) {
      await page.goto(new URL(path, origin).toString(), { waitUntil: 'networkidle' });
      assert.deepEqual(await headerStyle(page), baseline, `${path}: shared navbar appearance at ${width}px`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `${path}: no horizontal overflow`);
      if (width < 768) {
        const menu = await page.locator('.header-menu-trigger').boundingBox();
        assert.ok(menu && menu.x >= 0 && menu.x + menu.width <= width, `${path}: mobile menu is fully inside the viewport`);
      }
      assert.doesNotMatch(await page.locator('body').innerText(), /\+?62[\s-]*821[\s-]*1930[\s-]*7102|0821[\s-]*1930[\s-]*7102/, `${path}: phone number is hidden`);
      const links = page.locator(socialSelector);
      assert.ok(await links.count(), `${path}: contact actions exist`);
      for (const link of await links.all()) {
        assert.ok(await link.getAttribute('aria-label'), `${path}: icon has accessible name`);
        assert.equal((await link.textContent()).trim(), '', `${path}: social action uses only an icon`);
        assert.equal(await link.locator('svg[aria-hidden="true"]').count(), 1);
        const rect = await link.boundingBox();
        if (rect && rect.width && rect.height) {
          assert.ok(rect.width >= 40 && rect.height >= 40, `${path}: icon touch target`);
        }
      }
      if (path.endsWith('contact')) {
        assert.equal(await page.locator('.contact-page__social, .inner-page__end-link').count(), 0);
        assert.equal(await page.locator('.inner-page__intro a[href^="mailto:"]').count(), 2, 'Email icon and address remain together with main contact content');
      } else {
        const heading = page.locator('#domain-title');
        await heading.waitFor({ state: 'attached' });
        await page.waitForFunction(() => document.querySelector('#domain-title')?.hasAttribute('data-reveal'));
        assert.ok((await heading.evaluate((node) => getComputedStyle(node).transitionDuration)).includes('0.75s'), 'Pricing uses shared reveal duration');
        await heading.scrollIntoViewIfNeeded();
        await page.waitForFunction(() => document.querySelector('#domain-title')?.getAttribute('data-revealed') === 'true');
        await page.emulateMedia({ reducedMotion: 'reduce' });
        assert.equal(await heading.evaluate((node) => getComputedStyle(node).opacity), '1', 'Reduced motion keeps content readable');
        await page.emulateMedia({ reducedMotion: 'no-preference' });
      }
    }
    if (width === 1440) {
      // CSS from a visited route stays loaded during client navigation.
      await page.locator('.header-desktop-nav a[href="/en/about"]').click();
      await page.waitForURL((url) => url.pathname === '/en/about');
      assert.deepEqual(await headerStyle(page), baseline, 'Pricing stylesheet does not alter navbar after navigation');
      await page.locator('.header-desktop-nav a[href="/en/pricing"]').click();
      await page.waitForURL((url) => url.pathname === '/en/pricing');
      await page.locator('#domain-title').scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelector('#domain-title')?.getAttribute('data-revealed') === 'true');
    }
    assert.deepEqual(errors, []);
    console.log(`Verified shared navbar, icon-only contact links, number visibility, pricing motion, and navigation at ${width}px.`);
    await page.close();
  }
} finally {
  await browser.close();
}
