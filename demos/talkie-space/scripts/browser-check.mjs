import { chromium } from 'playwright';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import assert from 'node:assert/strict';

const output = fileURLToPath(new URL('../../../artifacts/demo-redesign/talkie-space/', import.meta.url));
mkdirSync(output, { recursive: true });
const menu = JSON.parse(readFileSync(new URL('../data/menu.json', import.meta.url)));
const categories = [...new Set(menu.map(item => item.category))];
const browser = await chromium.launch({ headless: true, channel: 'chrome' });
const results = [];
const errors = [];
const escape = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
const categoryTab = (page, category) => page.getByRole('tab', {name: new RegExp(`^${escape(category)}\\s*${menu.filter(item => item.category === category).length}$`)});
const checkCount = async (page, count) => {
  await page.waitForFunction(expected => document.querySelectorAll('.menu-item').length === expected, count);
  assert.equal(await page.locator('.menu-item').count(), count);
};
try {
  for (const width of [1440, 320, 390, 768]) {
    const page = await browser.newPage({ viewport: { width, height: 900 }, deviceScaleFactor: 1 });
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto('http://127.0.0.1:3028', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    await checkCount(page, menu.filter(item => item.category === 'Kopi').length);
    assert.equal(await page.locator('h1').count(), 1);
    assert.equal(await page.evaluate(() => scrollY), 0);
    if (width < 900) {
      await page.waitForFunction(() => {
        const list = document.querySelector('[role="tablist"]');
        const selected = list?.querySelector('[aria-selected="true"]');
        if (!list || !selected) return false;
        const bounds = list.getBoundingClientRect();
        const item = selected.getBoundingClientRect();
        return item.left >= bounds.left - 1 && item.right <= bounds.right + 1;
      });
    }
    assert.equal(await page.getByRole('combobox').count(), 0);
    assert.equal(await page.getByRole('tablist').getAttribute('aria-orientation'), width >= 900 ? 'vertical' : 'horizontal');
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await page.screenshot({ path: `${output}/${width}-hero.png` });
    const map = page.getByTitle('Lokasi Talkie Space di Jalan Suherman 52, Garut');
    assert.equal(await map.count(), 1);
    assert.equal(await map.getAttribute('src'), 'https://www.google.com/maps?q=Talkie+Space+Jl.+Suherman+52+Garut&z=16&output=embed');
    assert.equal(await map.getAttribute('loading'), 'lazy');
    await page.locator('#menu').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `${output}/${width}-catalogue.png` });
    let reachable = 0;
    for (const category of categories) {
      await categoryTab(page, category).click();
      const expected = menu.filter(item => item.category === category);
      await checkCount(page, expected.length);
      assert.equal(await page.getByRole('tabpanel').count(), 1);
      assert.deepEqual(await page.locator('.menu-item h4').allTextContents(), expected.map(item => item.name));
      reachable += expected.length;
    }
    assert.equal(reachable, menu.length);
    await categoryTab(page, 'Kopi').click();
    if (width < 900) {
      await page.getByRole('button', { name: 'Buka pencarian' }).click();
      await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Cari di semua menu');
    }
    const input = page.getByRole('textbox', { name: 'Cari di semua menu' });
    await input.fill('sapi');
    const expectedSearch = menu.filter(item => `${item.name} ${item.category} ${item.description}`.toLocaleLowerCase('id').includes('sapi'));
    await checkCount(page, expectedSearch.length);
    assert.equal(await page.getByRole('tab', { name: /^Hasil pencarian/ }).getAttribute('aria-selected'), 'true');
    await input.fill('zzzz-no-menu');
    await checkCount(page, 0);
    assert(await page.getByText('Belum menemukan menunya?').isVisible());
    await page.getByRole('button', { name: 'Reset pencarian' }).click();
    await checkCount(page, menu.filter(item => item.category === 'Kopi').length);
    if (width < 900) {
      await input.press('Escape');
      await page.waitForFunction(() => document.activeElement?.getAttribute('aria-label') === 'Buka pencarian');
    }
    await categoryTab(page, 'Kopi').focus();
    await page.keyboard.press(width >= 900 ? 'ArrowDown' : 'ArrowRight');
    await page.waitForFunction(() => document.activeElement?.getAttribute('role') === 'tab' && document.activeElement?.getAttribute('aria-selected') === 'true');
    await page.getByRole('link', { name: 'Pilih sarapan' }).click();
    await checkCount(page, menu.filter(item => item.category === 'Sarapan').length);
    if (width < 900) {
      await page.locator('.menu-item').last().scrollIntoViewIfNeeded();
      const position = await page.locator('.category-navigation').evaluate(element => ({top: element.getBoundingClientRect().top, position: getComputedStyle(element).position}));
      assert.equal(position.position, 'sticky');
      assert(position.top >= -1 && position.top < 150);
      await page.locator('#visit').scrollIntoViewIfNeeded();
      assert((await page.locator('.category-navigation').boundingBox()).y < 0);
    }
    for (const image of await page.locator('img').all()) {
      await image.scrollIntoViewIfNeeded();
      await image.evaluate(element => element.decode());
    }
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({ path: `${output}/${width}-page.png`, fullPage: true });
    assert.equal(await page.locator('meta[name=robots]').getAttribute('content'), 'noindex, nofollow');
    results.push({width, reachable, defaultCategory:'Kopi', defaultRendered:12, searchAcrossAll:true, keyboard:true, scopedSticky:true, overflow:false});
    await page.close();
  }
  const reduced = await browser.newPage({ viewport: {width:390,height:900}, reducedMotion:'reduce' });
  await reduced.goto('http://127.0.0.1:3028', {waitUntil:'networkidle'});
  assert.equal(await reduced.locator('html').evaluate(element => getComputedStyle(element).scrollBehavior), 'auto');
  assert(await reduced.locator('h1').isVisible());
  await reduced.screenshot({path:`${output}/reduced-motion.png`});
  await reduced.close();
  assert.equal(errors.length, 0, errors.join('\n'));
  writeFileSync(`${output}/browser.json`, JSON.stringify({results,errors,reducedMotion:true},null,2));
  console.log('PASS: 4 widths; all 94 products reachable; active category only; global search; tabs keyboard; mobile focus/Escape; scoped sticky; no overflow or browser errors.');
} finally {
  writeFileSync(`${output}/browser-errors.json`, JSON.stringify(errors,null,2));
  await browser.close();
}
