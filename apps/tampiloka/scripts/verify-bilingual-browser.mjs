import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { chromium, devices } from 'playwright';

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

  await desktop.goto(new URL('/paket', origin).toString(), { waitUntil: 'networkidle' });
  const estimateState = '/paket?plan=signature&domain=own&care=plus&addons=section%3A2#estimasi-signature';
  await desktop.goto(new URL(estimateState, origin).toString(), { waitUntil: 'networkidle' });
  assert.equal(await desktop.locator('input[name="paket"][value="signature"]').isChecked(), true, 'Valid plan query restores its calculator choice');
  assert.equal(await desktop.locator('#estimate-domain').getAttribute('data-value'), 'own', 'Valid domain query restores its calculator choice');
  assert.equal(await desktop.locator('#estimate-care').getAttribute('data-value'), 'plus', 'Valid care query restores its calculator choice');
  assert.equal(await desktop.locator('#addon-section').inputValue(), '2', 'Valid add-on query restores its quantity');
  const beforeLocaleSwitch = new URL(desktop.url());
  assert.equal(beforeLocaleSwitch.hash, '#estimasi-signature', 'Calculator keeps its selected plan anchor');

  await desktop.goto(new URL('/paket?plan=nope&domain=invalid&care=unknown&addons=not-real:999#estimasi-nope', origin).toString(), { waitUntil: 'networkidle' });
  assert.equal(await desktop.locator('input[name="paket"][value="menu"]').isChecked(), true, 'Invalid plan and hash values fall back to the default plan');
  assert.equal(await desktop.locator('#estimate-domain').getAttribute('data-value'), 'com', 'Invalid domain falls back to the default domain');
  assert.equal(await desktop.locator('#estimate-care').getAttribute('data-value'), 'none', 'Invalid care falls back to no subscription');
  assert.equal(await desktop.locator('#addon-section').inputValue(), '0', 'Invalid add-on values are ignored');

  await desktop.goto(new URL('/paket', origin).toString(), { waitUntil: 'networkidle' });
  await desktop.locator('a[href="#estimasi-essential"]').first().click();
  await desktop.waitForURL((url) => url.hash === '#estimasi-essential');
  assert.equal(new URL(desktop.url()).searchParams.get('plan'), 'essential', 'Plan anchor updates the selected calculator plan');
  assert.equal(await desktop.locator('input[name="paket"][value="essential"]').isChecked(), true, 'Plan anchor updates calculator controls');

  await desktop.goto(new URL(estimateState, origin).toString(), { waitUntil: 'networkidle' });
  const currentBeforeLocaleSwitch = new URL(desktop.url());

  const englishLink = desktop.getByRole('link', { name: /switch to english|english/i }).first();
  assert.ok(await englishLink.count(), 'Language switch exposes a direct English link');
  await englishLink.click();
  await desktop.waitForURL((url) => url.pathname === '/en/pricing');
  assert.equal(await desktop.locator('html').getAttribute('lang'), 'en', 'Language switch updates the page language');
  assert.equal(await desktop.getByRole('heading', { name: 'Business website packages.', exact: true }).count(), 1);
  assert.equal(new URL(desktop.url()).search, currentBeforeLocaleSwitch.search, 'Language switch preserves calculator query state');
  assert.equal(new URL(desktop.url()).hash, currentBeforeLocaleSwitch.hash, 'Language switch preserves the calculator section hash');

  const selectedPlan = desktop.locator('input[name="paket"]').nth(1);
  await selectedPlan.check();
  await desktop.waitForFunction(() => new URL(location.href).searchParams.has('plan'));
  await desktop.goBack({ waitUntil: 'networkidle' });
  assert.equal(new URL(desktop.url()).pathname, '/paket', 'Browser back returns to Indonesian pricing');
  assert.equal(await desktop.locator('html').getAttribute('lang'), 'id', 'Browser back restores Indonesian locale');
  assert.equal(new URL(desktop.url()).search, currentBeforeLocaleSwitch.search, 'Calculator state survives locale switch and browser back');
  assert.equal(new URL(desktop.url()).hash, currentBeforeLocaleSwitch.hash, 'Browser back restores the calculator anchor');
  assert.equal(new URL(desktop.url()).searchParams.get('plan'), 'signature', 'Browser back restores the selected plan');
  assert.equal(new URL(desktop.url()).searchParams.get('domain'), 'own', 'Browser back restores the selected domain');
  assert.equal(await desktop.locator('#estimate-care').getAttribute('data-value'), currentBeforeLocaleSwitch.searchParams.get('care'), 'Calculator restores the URL state in its controls');
  assert.equal(await desktop.locator('#estimate-domain').getAttribute('data-value'), currentBeforeLocaleSwitch.searchParams.get('domain'), 'Calculator restores the domain in its controls');
  assert.equal(await desktop.locator('#addon-section').inputValue(), '2', 'Calculator restores add-on quantity after Back');

  const keyboardPage = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  await keyboardPage.goto(new URL('/en/services', origin).toString(), { waitUntil: 'networkidle' });
  await keyboardPage.keyboard.press('Tab');
  const firstFocus = await keyboardPage.evaluate(() => ({ tag: document.activeElement?.tagName, text: document.activeElement?.textContent?.trim() }));
  assert.equal(firstFocus.tag, 'A', 'First keyboard stop is an accessible skip link');
  assert.match(firstFocus.text, /skip|content/i, 'Skip link is translated for English');

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

  assert.deepEqual(pageErrors, [], 'Browser flow has no uncaught page errors');
  console.log('Verified desktop language switching, pricing URL state and browser back, keyboard skip link, mobile navigation/overflow, and direct English content without JavaScript.');
} finally {
  await browser.close();
}
