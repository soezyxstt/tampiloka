import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium, devices } from 'playwright';
import { encodeEstimate, estimateDefaults } from '../lib/estimate-url.mjs';

const origin = process.env.MARKETING_ORIGIN || process.argv[2] || 'http://localhost:3000';
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROMIUM_EXECUTABLE_PATH || process.env.CHROMIUM_PATH || (existsSync('/usr/bin/chromium') ? '/usr/bin/chromium' : chromium.executablePath()),
  args: ['--no-sandbox'],
});
const desktop = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const pageErrors = [];
desktop.on('pageerror', (error) => pageErrors.push(error.message));

try {
  await desktop.goto(new URL('/templates?view=all#gallery', origin).toString(), { waitUntil: 'networkidle' });
  await desktop.locator('.language-switcher a[lang="en"]').first().click();
  await desktop.waitForURL((url) => url.pathname === '/en/templates');
  assert.equal(new URL(desktop.url()).search, '?view=all', 'Template locale switch preserves the query');
  assert.equal(new URL(desktop.url()).hash, '#gallery', 'Template locale switch preserves the hash');
  await desktop.locator('.language-switcher a[lang="id"]').first().click();
  await desktop.waitForURL((url) => url.pathname === '/templates');

  const response = await desktop.goto(new URL('/en/pricing', origin).toString(), { waitUntil: 'networkidle' });
  assert.equal(response?.status(), 200, 'English pricing loads in a browser');
  assert.equal(await desktop.locator('html').getAttribute('lang'), 'en', 'English route sets document language');
  assert.equal(await desktop.locator('h1').count(), 1, 'English pricing has one h1');

  const estimate = encodeEstimate({ ...estimateDefaults, levels: { school: 1 }, values: { ...estimateDefaults.values, students: '120' } });
  assert.ok(estimate, 'Fixture contains a valid estimate');
  const estimateUrl = new URL('/paket?source=browser&family=school#estimasi', origin);
  estimateUrl.searchParams.set('estimate', estimate);
  await desktop.goto(estimateUrl.toString(), { waitUntil: 'networkidle' });
  assert.equal(await desktop.locator('#pricing-family').getAttribute('data-value'), 'school', 'Family query selects education');
  assert.equal(await desktop.locator('#estimate-plan-school').getAttribute('data-value'), '1', 'Valid estimate restores the school package');
  assert.equal(await desktop.locator('#estimate-students').inputValue(), '120', 'Valid estimate restores capacity');

  await desktop.goto(new URL('/paket?family=invalid&estimate=invalid#estimasi', origin).toString(), { waitUntil: 'networkidle' });
  assert.equal(await desktop.locator('#pricing-family').getAttribute('data-value'), 'cafe', 'Invalid family falls back to cafe');
  await desktop.getByRole('button', { name: 'Butuh kombinasi layanan? Hitung biaya' }).click();
  assert.equal(await desktop.locator('#estimate-plan-cafe').getAttribute('data-value'), '0', 'Invalid estimate restores the default package');

  await desktop.goto(estimateUrl.toString(), { waitUntil: 'networkidle' });
  await desktop.locator('#pricing-family').click();
  await desktop.getByRole('option', { name: 'Toko dan brand lokal', exact: true }).click();
  assert.equal(new URL(desktop.url()).searchParams.get('family'), 'commerce', 'Family selection updates the URL');
  const englishLink = desktop.locator('.language-switcher a[lang="en"]').first();
  await desktop.waitForFunction(() => new URL(document.querySelector('.language-switcher a[lang="en"]').href).searchParams.get('family') === 'commerce');
  const target = new URL(await englishLink.getAttribute('href'), origin);
  assert.equal(target.pathname, '/en/pricing', 'Rendered English href uses the localized route');
  assert.equal(target.search, new URL(desktop.url()).search, 'Rendered href preserves updated family and unrelated query');
  assert.equal(target.hash, '#estimasi', 'Rendered href preserves the hash for modified clicks');
  const currentBeforeLocaleSwitch = new URL(desktop.url());
  await englishLink.click();
  await desktop.waitForURL((url) => url.pathname === '/en/pricing');
  assert.equal(await desktop.locator('html').getAttribute('lang'), 'en', 'Language switch updates the page language');
  assert.equal(await desktop.getByRole('heading', { name: 'Packages for your business.', exact: true }).count(), 1);
  assert.equal(new URL(desktop.url()).search, currentBeforeLocaleSwitch.search, 'Language switch preserves estimate and family');
  assert.equal(new URL(desktop.url()).hash, currentBeforeLocaleSwitch.hash, 'Language switch preserves the hash');
  assert.equal(await desktop.locator('#estimate-plan-school').getAttribute('data-value'), '1', 'Estimate survives language switch');
  await desktop.getByLabel('Stores and local brands', { exact: true }).check();
  await desktop.waitForFunction(() => JSON.parse(new URL(location.href).searchParams.get('estimate')).levels.commerce === 0);
  await desktop.goBack({ waitUntil: 'networkidle' });
  assert.equal(await desktop.getByLabel('Stores and local brands', { exact: true }).isChecked(), false, 'Browser back restores the prior estimate selection');
  assert.equal(new URL(desktop.url()).pathname, '/en/pricing', 'Estimate history remains on English pricing');
  await desktop.goBack({ waitUntil: 'networkidle' });
  assert.equal(new URL(desktop.url()).pathname, '/paket', 'Browser back returns to Indonesian pricing');
  assert.equal(await desktop.locator('html').getAttribute('lang'), 'id', 'Browser back restores Indonesian locale');
  assert.equal(new URL(desktop.url()).search, currentBeforeLocaleSwitch.search, 'Browser back restores query state');
  assert.equal(new URL(desktop.url()).hash, currentBeforeLocaleSwitch.hash, 'Browser back restores the anchor');
  assert.equal(await desktop.locator('#estimate-students').inputValue(), '120', 'Browser back restores estimate capacity');

  const keyboardPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await keyboardPage.goto(new URL('/en/services', origin).toString(), { waitUntil: 'networkidle' });
  await keyboardPage.keyboard.press('Tab');
  const firstFocus = await keyboardPage.evaluate(() => ({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim() }));
  assert.equal(firstFocus.tag, 'A', 'First keyboard stop is an accessible skip link');
  assert.match(firstFocus.text, /skip|content/i, 'Skip link is translated for English');

  const serviceToggle = keyboardPage.getByRole('button', { name: 'Open service categories', exact: true });
  await serviceToggle.focus();
  await keyboardPage.keyboard.press('Enter');
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'true', 'Keyboard opens services');
  assert.equal(await keyboardPage.getByRole('link', { name: 'Cafes and restaurants' }).first().getAttribute('href'), '/en/services#kafe-restoran');
  await keyboardPage.keyboard.press('Escape');
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'false', 'Escape closes services');
  assert.equal(await serviceToggle.evaluate(element => element === document.activeElement), true, 'Escape restores trigger focus');
  await serviceToggle.hover();
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'true', 'Hover opens services');
  assert.equal(await keyboardPage.getByRole('link', { name: 'Services', exact: true }).first().getAttribute('aria-current'), 'page', 'Services link indicates the current page');
  await serviceToggle.click();
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'true', 'First click pins the hover-open menu');
  await serviceToggle.click();
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'false', 'Second click closes the pinned menu');
  await serviceToggle.click();
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'true', 'Click opens the closed menu');
  await keyboardPage.locator('main').click({ position: { x: 5, y: 5 } });
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'false', 'Outside click closes services');
  await keyboardPage.evaluate(() => {
    const input = document.createElement('input'); input.id = 'escape-focus-check'; document.querySelector('main').append(input);
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') document.body.dataset.escapeReached = 'yes'; }, { once: true });
  });
  await keyboardPage.locator('#escape-focus-check').focus();
  await serviceToggle.hover();
  await keyboardPage.keyboard.press('Escape');
  assert.equal(await serviceToggle.getAttribute('aria-expanded'), 'false', 'Escape closes a hover-open menu');
  assert.equal(await keyboardPage.locator('#escape-focus-check').evaluate(element => element === document.activeElement), true, 'Hover-open menu does not steal unrelated focus');
  assert.equal(await keyboardPage.locator('body').getAttribute('data-escape-reached'), 'yes', 'Escape reaches unrelated controls');

  const tablet = await browser.newPage({ viewport: { width: 820, height: 900 }, hasTouch: true });
  await tablet.goto(new URL('/en/services', origin).toString(), { waitUntil: 'networkidle' });
  const tabletToggle = tablet.getByRole('button', { name: 'Open service categories', exact: true });
  await tabletToggle.tap();
  assert.equal(await tabletToggle.getAttribute('aria-expanded'), 'true', 'Touch opens tablet services');
  await tablet.getByRole('link', { name: 'Online stores', exact: true }).first().tap();
  assert.equal(new URL(tablet.url()).hash, '#toko-online', 'Tablet field link navigates to the section');

  const mobile = await browser.newPage({ ...devices['iPhone 13'] });
  await mobile.goto(new URL('/en/pricing', origin).toString(), { waitUntil: 'networkidle' });
  const overflow = await mobile.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  assert.equal(overflow, false, 'English pricing has no horizontal overflow at mobile width');
  const menuButton = mobile.getByRole('button', { name: /menu|navigation/i }).first();
  assert.ok(await menuButton.count(), 'Mobile navigation has a keyboard and screen-reader labeled menu control');
  const mobileLanguageLink = mobile.getByRole('link', { name: /ganti ke bahasa indonesia|bahasa indonesia/i }).first();
  assert.equal(await mobileLanguageLink.getAttribute('href'), '/paket', 'Mobile language switch links directly to Indonesian pricing');
  await menuButton.click();
  assert.ok(await mobile.getByRole('link', { name: /pricing|paket/i }).count(), 'Mobile navigation has a pricing route');
  const mobileServices = mobile.getByRole('button', { name: 'Open service categories', exact: true });
  await mobileServices.click();
  assert.equal(await mobileServices.getAttribute('aria-expanded'), 'true', 'Mobile services expand');
  await mobile.keyboard.press('Escape');
  assert.equal(await mobileServices.getAttribute('aria-expanded'), 'false', 'Escape closes the mobile dropdown');
  await mobileServices.click();
  await mobile.locator('#header-subnav-mobile').getByRole('link', { name: 'Online stores', exact: true }).click();
  assert.equal(new URL(mobile.url()).pathname, '/en/services', 'Mobile field link navigates to services');
  assert.equal(new URL(mobile.url()).hash, '#toko-online', 'Mobile field link retains its section');

  const noJs = await browser.newPage({ javaScriptEnabled: false });
  const noJsNotFound = await noJs.goto(new URL('/en/this-page-does-not-exist', origin).toString(), { waitUntil: 'domcontentloaded' });
  assert.equal(noJsNotFound?.status(), 404, 'Unknown English route returns an HTTP 404 without JavaScript');
  assert.equal(await noJs.locator('html').getAttribute('lang'), 'en', 'No-JS English 404 has the correct document language');
  assert.match(await noJs.locator('body').innerText(), /Page not found/i, 'No-JS English 404 copy is localized');
  assert.ok(await noJs.locator('meta[name="robots"][content*="noindex"]').count(), 'No-JS 404 is excluded from search');
  const recoveryLink = noJs.locator('a.inner-page__cta');
  assert.equal(await recoveryLink.evaluate((link) => link.tagName), 'A', 'English 404 recovery is a native anchor without JavaScript');
  assert.match(await recoveryLink.innerText(), /Back to home/i, 'English 404 recovery link has visible translated text');
  assert.equal(await recoveryLink.getAttribute('href'), '/en', 'English 404 links directly to the English home page');
  await Promise.all([noJs.waitForURL((url) => url.pathname === '/en'), recoveryLink.click()]);
  assert.equal(await noJs.locator('html').getAttribute('lang'), 'en', 'The no-JS 404 recovery link works');
  const noJsResponse = await noJs.goto(new URL('/en/work', origin).toString(), { waitUntil: 'domcontentloaded' });
  assert.equal(noJsResponse?.status(), 200, 'English content loads with JavaScript disabled');
  assert.equal(await noJs.locator('html').getAttribute('lang'), 'en', 'No-JS English route has the right language');
  assert.ok(await noJs.locator('.language-switcher a[lang="id"]').count(), 'No-JS page has a direct Indonesian language link');
  assert.ok(await noJs.locator('.language-switcher a[lang="en"]').count(), 'No-JS page has a direct English language link');
  const noJsServices = noJs.locator('.header-desktop-nav a[href="/en/services"]');
  assert.ok(await noJsServices.count(), 'Desktop services route is a native link without JavaScript');
  await Promise.all([noJs.waitForURL((url) => url.pathname === '/en/services'), noJsServices.first().click()]);
  assert.equal(await noJs.locator('h1').innerText(), 'Tampiloka services.', 'No-JS services link reaches the current page');

  assert.deepEqual(pageErrors, [], 'Browser flow has no uncaught page errors');
  console.log('Verified desktop language switching, pricing URL state and browser back, keyboard skip link, mobile navigation/overflow, and direct English content without JavaScript.');
} finally {
  await browser.close();
}
