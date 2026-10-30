import assert from 'node:assert/strict';
import { chromium } from 'playwright';

const origin = process.argv[2] || 'http://localhost:3100';
const browser = await chromium.launch({ headless: true });
try {
  for (const width of [1440, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 1000 }, reducedMotion: 'no-preference' });
    for (const [path, id] of [['/templates', 'template-level'], ['/paket', 'estimate-care']]) {
      await page.goto(`${origin}${path}`, { waitUntil: 'networkidle' });
      await page.locator('.site-loader').waitFor({ state: 'hidden' });
      const trigger = page.locator(`#${id}`);
      await trigger.scrollIntoViewIfNeeded();
      await trigger.click();
      const popup = page.locator('[data-slot="select-content"]');
      await popup.waitFor({ state: 'visible' });
      const opening = await popup.evaluate((element, triggerId) => {
        const style = getComputedStyle(element);
        const anchor = document.getElementById(triggerId).getBoundingClientRect();
        const rect = element.getBoundingClientRect();
        return {
          animation: style.animationName,
          duration: parseFloat(style.animationDuration),
          enterOpacity: style.getPropertyValue('--tw-enter-opacity').trim(),
          alignment: element.dataset.alignTrigger,
          anchorBottom: anchor.bottom,
          anchorTop: anchor.top,
          top: rect.top,
          bottom: rect.bottom,
          side: element.dataset.side,
        };
      }, id);
      assert.match(opening.animation, /enter/, `${path}: opening animation runs`);
      assert.ok(opening.duration >= 0.15, `${path}: opening is perceptible`);
      assert.equal(opening.alignment, 'false', 'Popup uses dropdown positioning');
      assert.equal(opening.enterOpacity, '0', 'Opening fades from transparent');
      if (opening.side === 'bottom') assert.ok(opening.top >= opening.anchorBottom, 'Popup is below the trigger');
      else assert.ok(opening.bottom <= opening.anchorTop, 'Popup flips above when space is limited');
      await page.keyboard.press('Escape');
      await page.locator('[data-slot="select-content"][data-closed]').waitFor({ state: 'attached' });
      assert.match(await popup.evaluate(element => getComputedStyle(element).animationName), /exit/, 'Closing animation runs before the popup hides');
      await popup.waitFor({ state: 'hidden' });
      await page.emulateMedia({ reducedMotion: 'reduce' });
      await trigger.click();
      await popup.waitFor({ state: 'visible' });
      assert.equal(await popup.evaluate(element => getComputedStyle(element).animationName), 'none', 'Reduced motion disables animation');
      await page.keyboard.press('Escape');
      await popup.waitFor({ state: 'hidden' });
      await page.emulateMedia({ reducedMotion: 'no-preference' });
    }
    await page.close();
  }
  console.log('Verified animated opening/closing, popup positioning, and reduced motion on gallery and pricing at desktop/mobile widths.');
} finally {
  await browser.close();
}
