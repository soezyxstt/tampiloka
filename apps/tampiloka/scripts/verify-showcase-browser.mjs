import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium } from 'playwright';

const origin = process.env.MARKETING_ORIGIN || process.argv[2] || 'http://localhost:3000';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : chromium.executablePath()),
  args: ['--no-sandbox'],
});

try {
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    const page = await browser.newPage({ viewport });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    // Isolate scheduling from third-party uptime, analytics, and animation work.
    await page.route('**/*', (route) => {
      const request = route.request();
      if (request.isNavigationRequest() && request.frame().parentFrame()) {
        return route.fulfill({ contentType: 'text/html', body: '<h1>Demo</h1><div id="cerita">Section</div>' });
      }
      return route.continue();
    });
    await page.goto(origin, { waitUntil: 'networkidle' });
    const previews = page.locator('.showcase__site iframe');
    assert.ok(await previews.count() <= 1, 'Landing never starts more than one embedded demo');
    const first = page.locator('.showcase__site').first();
    await first.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 1);
    await first.locator('img').evaluate((image) => image.decode());
    assert.ok(await first.locator('img').evaluate((image) => image.naturalWidth > 0), 'Inactive preview has a real poster');

    await page.evaluate(async () => {
      for (let index = 0; index < 12; index++) {
        window.scrollBy(0, 2);
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    });
    assert.equal(await previews.count(), 0, 'Scrolling suspends every background demo');
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 1);

    // Exercise several viewport transitions; lazy iframes must not accumulate.
    for (const index of [3, 4, 0]) {
      await page.locator('.showcase__site').nth(index).scrollIntoViewIfNeeded();
      await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 1);
      assert.equal(await previews.count(), 1, 'Only one visible demo can run');
    }

    const toggle = page.locator('.showcase__motion-toggle');
    await toggle.click();
    assert.equal(await previews.count(), 0, 'Pause unmounts demo scripts');
    await first.scrollIntoViewIfNeeded();
    await page.waitForTimeout(450);
    assert.equal(await previews.count(), 0, 'Scroll cannot override Pause');
    await toggle.click();
    await first.scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 1);

    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 0);
    await page.emulateMedia({ reducedMotion: 'no-preference' });
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 1);

    const setHidden = (hidden) => page.evaluate((value) => {
      Object.defineProperty(document, 'hidden', { configurable: true, value });
      document.dispatchEvent(new Event('visibilitychange'));
    }, hidden);
    await setHidden(true);
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 0);
    await setHidden(false);
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 1);

    await page.locator('.showcase__open').first().click();
    await page.locator('.showcase-sheet__frame').waitFor();
    assert.equal(await previews.count(), 0, 'Dialog has exclusive ownership of the live demo');
    assert.equal(await page.locator('iframe').count(), 1, 'Only the interactive dialog iframe remains');
    await setHidden(true);
    await page.waitForFunction(() => document.querySelectorAll('iframe').length === 0);
    await setHidden(false);
    await page.locator('.showcase-sheet__frame').waitFor();
    await page.keyboard.press('Escape');
    await page.locator('.showcase-sheet__frame').waitFor({ state: 'detached' });

    await page.goto(new URL('/en/work?kind=prospect-demo', origin).toString(), { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: 'Prospect demos', exact: true }).waitFor();
    await page.waitForFunction(() => document.querySelectorAll('.showcase__project').length === 6);
    assert.equal(await page.getByText('Demo for a prospective client', { exact: false }).count(), 6);
    await page.getByRole('button', { name: 'Portfolio', exact: true }).click();
    assert.equal(await page.locator('.showcase__project').count(), 5);
    assert.equal(new URL(page.url()).searchParams.get('kind'), null, 'Portfolio is the default URL state');
    await page.goBack();
    await page.waitForFunction(() => document.querySelectorAll('.showcase__project').length === 6);
    await page.locator('.showcase__site').first().scrollIntoViewIfNeeded();
    await page.waitForFunction(() => document.querySelectorAll('.showcase__site iframe').length === 1);
    assert.match(await previews.getAttribute('src'), /historia/);
    assert.deepEqual(errors, [], 'Showcase flows have no uncaught errors');
    console.log(`Verified preview lifecycle at ${viewport.width}px: scroll, concurrency, Pause, reduced motion, hidden tab, dialog, and filters.`);
    await page.close();
  }
} finally {
  await browser.close();
}
