import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { chromium } from "playwright";
import { families } from "../lib/service-pricing.mjs";
import { chooseSelect } from "./select-test-helper.mjs";

const origin = process.env.PRICING_ORIGIN || process.argv[2] || "http://127.0.0.1:3000";
const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : chromium.executablePath()), args: ["--no-sandbox"] });
const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await context.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const money = n => `Rp${new Intl.NumberFormat("id-ID").format(n * 1000)}`;
try {
  const response = await page.goto(`${origin}/paket`);
  assert.equal(response.status(), 200);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator("main").count(), 1);
  assert.deepEqual(await page.locator(".service-card strong").allTextContents(), ["Rp249.000", "Rp499.000", "Rp899.000", "Rp1.490.000"]);
  const picker = page.locator("#pricing-family");
  await picker.focus();
  await page.keyboard.press("Enter");
  const listbox = page.getByRole("listbox");
  await listbox.waitFor({ state: "visible" });
  assert.equal(await listbox.locator('[role="option"][data-value="cafe"]').getAttribute("aria-selected"), "true");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Enter");
  assert.equal(await picker.getAttribute("data-value"), "commerce");
  await picker.press("Enter");
  await page.keyboard.press("Escape");
  await listbox.waitFor({ state: "hidden" });
  assert.equal(await picker.getAttribute("data-value"), "commerce");

  for (const family of families) {
    await chooseSelect(page, picker, family.id);
    assert.equal(await page.locator("#family-title").textContent(), family.name[0]);
    const cards = page.locator(".service-family .service-card");
    assert.equal(await cards.count(), family.plans.length);
    for (let i = 0; i < family.plans.length; i++) {
      const plan = family.plans[i], card = cards.nth(i);
      assert.equal(await card.locator("h3").textContent(), plan[0]);
      assert.equal(await card.locator("strong").textContent(), money(plan[4]));
      assert((await card.locator(".service-prices").innerText()).includes(money(plan[6])));
      assert((await card.locator(".service-prices").innerText()).includes(money(plan[7])));
      assert((await card.locator(".service-prices").innerText()).includes(`${money(plan[5])} / bulan`));
      const url = new URL(await card.locator("a").getAttribute("href"));
      assert.equal(url.origin + url.pathname, "https://wa.me/6282119307102");
      assert.equal(url.searchParams.get("text"), `Halo, saya ingin membahas paket ${plan[0]} — ${family.name[0]}.`);
    }
    const table = page.getByRole("region", { name: "Tabel perbandingan paket" });
    assert.equal(await table.locator("tbody tr").count(), family.rows.length);
    for (let i = 0; i < family.rows.length; i++) {
      const row = table.locator("tbody tr").nth(i), [label, values] = family.rows[i];
      assert.equal(await row.locator("th").textContent(), label[0]);
      assert.deepEqual(await row.locator("td").allTextContents(), values.map(v => v === 1 ? "✓" : v === 0 ? "—" : v));
    }
    assert.equal(await page.locator(".scope-note").innerText().then(text => text.startsWith(family.scope[0])), true);
  }
  await chooseSelect(page, picker, "operations");
  assert.equal(await page.locator(".service-family .service-card").count(), 3);
  assert.equal(await page.getByText("Sesuai penawaran", { exact: true }).count(), 3);
  assert((await page.locator(".service-family").innerText()).includes("sedang direncanakan"));
  console.log("Families, promotional prices, limits, comparison tables and package WhatsApp links verified.");

  await page.getByRole("button", { name: "Butuh kombinasi layanan? Hitung biaya" }).click();
  const estimate = page.locator("#estimasi");
  await estimate.waitFor({ state: "visible" });
  const summary = estimate.locator(".service-summary");
  assert((await summary.innerText()).includes("Rp717.000"));
  const expected = ["Perkiraan biaya", "Kafe dan restoran: Pesanan Staf (pilihan awal: Pesanan Staf)", "Satu layanan", "Outlet kafe/restoran: 1", "Tanpa absensi staf", "Tanpa website tambahan", "Tanpa pembayaran online tambahan", "Penyiapan sekali: Rp249.000", "Langganan / bulan: Rp39.000", "3 bulan di muka: Rp117.000", "Tahun pertama: Rp717.000", "Belum termasuk domain, perangkat, internet, biaya transaksi, pesan berbayar, pajak bila berlaku, pemindahan data yang rumit dan pekerjaan khusus."].join("\n");
  const whatsapp = new URL(await summary.getByRole("link", { name: "Diskusikan estimasi lewat WhatsApp" }).getAttribute("href"));
  assert.equal(whatsapp.origin + whatsapp.pathname, "https://wa.me/6282119307102");
  assert.equal(whatsapp.searchParams.get("text"), expected);
  await estimate.getByText("Lokasi, kapasitas, dan tambahan", { exact: true }).click();
  await page.locator("#estimate-outlets").fill("0");
  assert.equal(await page.locator("#estimate-outlets").getAttribute("aria-invalid"), "true");
  assert.equal(await summary.getByRole("link", { name: "Diskusikan estimasi lewat WhatsApp" }).count(), 0);
  await page.locator("#estimate-outlets").fill("1");
  await estimate.getByLabel("Toko dan brand lokal", { exact: true }).check();
  await estimate.getByLabel("Ya, usaha, situs dan akun pembayaran sama").check();
  await estimate.getByLabel("Produk siap jual dan sumber stok sama").check();
  assert((await summary.innerText()).includes("Integrasi standar produk dan stok"));
  await estimate.getByLabel("Toko dan brand lokal", { exact: true }).uncheck();
  assert.equal(await estimate.getByText("Untuk usaha yang sama?", { exact: true }).count(), 0);
  console.log("Optional calculator, validation, shared scope and exact WhatsApp summary verified without sending.");

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${width}px overflow`);
  }
  await page.goto(`${origin}/en/pricing`);
  assert.equal(await page.locator("h1").textContent(), "Packages for your business.");
  assert.equal(await page.locator("#family-title").textContent(), "Cafes and restaurants");
  assert.deepEqual(errors, [], "No uncaught browser errors");
  console.log("Responsive widths and English page verified.");
} finally {
  await browser.close();
}
