import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";

const origin = process.env.PRICING_ORIGIN || process.argv[2] || "http://127.0.0.1:3000";
const output = new URL("../../../artifacts/pricing/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : chromium.executablePath()),
  args: ["--no-sandbox"],
});
const errors = [];
const checks = [];
const record = (message) => { checks.push(message); console.log(message); };
const context = await browser.newContext({ viewport: { width: 1440, height: 1200 }, permissions: ["clipboard-read", "clipboard-write"] });
const page = await context.newPage();
page.on("pageerror", (error) => errors.push(error.message));
page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });

async function totals(first, second) {
  await page.waitForFunction(([a, b]) => document.querySelector('[aria-label="Total tahun pertama"]').textContent === a && document.querySelector('[aria-label="Total tahun kedua"]').textContent === `${b}/tahun`, [first, second]);
}

async function revealPage(target) {
  await target.locator('.site-motion[data-motion-ready="true"]').waitFor();
  await target.evaluate(() => document.fonts.ready);
  await target.evaluate(async () => {
    const root = document.documentElement;
    const previous = root.getAttribute("style");
    root.style.scrollBehavior = "auto";
    for (let y = 0; y < root.scrollHeight; y += window.innerHeight * 0.75) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    window.scrollTo(0, 0);
    if (previous === null) root.removeAttribute("style");
    else root.setAttribute("style", previous);
  });
  await target.waitForTimeout(1200);
}

try {
  const response = await page.goto(`${origin}/paket`);
  assert.equal(response.status(), 200);
  assert.equal(await page.locator("h1").count(), 1);
  assert.equal(await page.locator("main").count(), 1);
  assert.equal(await page.locator(".pricing-card").count(), 4);
  assert.deepEqual(await page.locator("s.pricing-card__original").allTextContents(), ["Rp1.665.000", "Rp2.831.667", "Rp4.165.000"]);
  assert.deepEqual(await page.locator(".pricing-card__price > p").allTextContents(), ["Rp999k", "Rp1.699k", "Rp2.499k", "Sesuai kebutuhan"]);
  assert(await page.locator(".pricing-button").first().evaluate((element) => {
    const radius = getComputedStyle(element).borderRadius;
    return radius.includes("infinity") || Number.parseFloat(radius) >= 999;
  }), "CTAs use the shared pill button shape");
  assert.equal(await page.locator(".pricing-page .lucide-sparkles, .pricing-page .type-overline, .pricing-page .pricing-launch").count(), 0);
  const fontState = await page.evaluate(async () => { await document.fonts.ready; return [...document.fonts].filter((font) => font.status === "loaded").map((font) => font.family); });
  assert(fontState.some((name) => /Inter/.test(name)), "Inter loads");
  assert(fontState.some((name) => /Manrope/.test(name)), "Manrope loads");
  record("Page, semantic landmarks, 40% promotional prices, and brand fonts render.");

  // These are the four independently specified examples in the pricing brief.
  await totals("Rp1.998.000", "Rp598.000");
  await page.locator("#estimate-care").selectOption("care");
  await totals("Rp2.946.000", "Rp1.546.000");
  await page.getByRole("radio", { name: /Signature/ }).check();
  await page.locator("#estimate-care").selectOption("plus");
  await totals("Rp4.946.000", "Rp2.746.000");
  await page.getByRole("radio", { name: /Essential/ }).check();
  await page.locator("#estimate-domain").selectOption("subdomain");
  await page.locator("#estimate-care").selectOption("none");
  await totals("Rp999.000", "Rp299.000");
  record("All four year-one/year-two examples match the supplied brief.");

  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page.getByText("Fitur website", { exact: true }).click();
  await page.locator("#addon-cart").check();
  await page.getByRole("button", { name: "Tambah Halaman tambahan", exact: true }).click();
  await totals("Rp2.846.000", "Rp598.000");
  await page.getByRole("button", { name: "Tambah Halaman tambahan", exact: true }).click();
  await totals("Rp3.195.000", "Rp598.000");
  await page.locator("#addon-reservation").check();
  await totals("Rp3.444.000", "Rp598.000");
  await page.getByRole("radio", { name: /Signature/ }).check();
  await totals("Rp3.995.000", "Rp598.000");
  assert(await page.locator("#addon-reservation").isDisabled(), "Included Signature reservation cannot be charged again");
  assert(!(await page.locator("#addon-reservation").isChecked()));
  await page.getByText("Konten & tampilan", { exact: true }).click();
  await page.getByRole("button", { name: "Tambah Tambahan 10 item katalog", exact: true }).click();
  await totals("Rp4.094.000", "Rp598.000");
  await page.getByRole("radio", { name: /Essential/ }).check();
  assert(await page.locator("#addon-catalog").isDisabled());
  await totals("Rp2.495.000", "Rp598.000");
  record("Add-on quantities, one-time fees, and prevention of duplicate/incompatible features work.");

  await page.locator("#estimate-domain").selectOption("co-id");
  await totals("Rp2.595.000", "Rp698.000");
  await page.locator("#estimate-domain").selectOption("own");
  await totals("Rp2.196.000", "Rp299.000");
  await page.getByRole("button", { name: "Salin estimasi", exact: true }).click();
  const copied = await page.evaluate(() => navigator.clipboard.readText());
  assert(copied.includes("Total tahun pertama: Rp2.196.000"));
  assert(copied.includes("di luar estimasi"));
  assert(copied.includes("Halaman tambahan × 2: Rp698.000"));
  const whatsapp = new URL(await page.getByRole("link", { name: "Bahas lewat WhatsApp" }).getAttribute("href"));
  assert.equal(whatsapp.origin, "https://wa.me");
  assert(whatsapp.searchParams.get("text").includes(copied));
  // Exercise the actual clipboard failure path without opening an external service.
  await page.evaluate(() => { navigator.clipboard.writeText = async () => { throw new Error("Clipboard unavailable"); }; });
  await page.getByRole("button", { name: "Estimasi tersalin", exact: true }).click();
  await page.locator("#estimate-copy-text").waitFor({ state: "visible" });
  assert.equal(await page.locator("#estimate-copy-text").inputValue(), copied);
  record("Domain renewals, clipboard copy/fallback, and the prepared WhatsApp quotation match the estimate.");

  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await totals("Rp1.998.000", "Rp598.000");
  await page.getByRole("link", { name: "Pilih Essential", exact: true }).click();
  await page.waitForFunction(() => document.querySelector('input[name="paket"]:checked').value === "essential");
  await page.getByRole("radio", { name: /Menu/ }).check();
  await page.getByRole("link", { name: "Pilih Essential", exact: true }).click();
  await page.waitForFunction(() => document.querySelector('input[name="paket"]:checked').value === "essential");
  const reloadUrl = page.url();
  await page.reload();
  await page.waitForFunction(() => document.querySelector('input[name="paket"]:checked').value === "essential");
  assert(reloadUrl.endsWith("#estimasi-essential"));
  await page.getByRole("button", { name: "Reset", exact: true }).click();
  await page.getByRole("button", { name: "Apakah menu bisa saya ubah sendiri?", exact: true }).click();
  await page.getByText(/Essential, Menu, dan Signature tidak memiliki dashboard/).waitFor({ state: "visible" });
  const sitemap = await (await context.request.get(`${origin}/sitemap.xml`)).text();
  assert(sitemap.includes("/paket</loc>"));
  const services = await (await context.request.get(`${origin}/layanan`)).text();
  assert(services.includes("Lihat paket website kafe"));
  record("Package CTAs, URL deep links, reset, package FAQ, services link, and sitemap work.");

  for (const width of [320, 390, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    const layout = await page.evaluate(() => ({ viewport: innerWidth, document: document.documentElement.scrollWidth }));
    assert(layout.document <= layout.viewport, `${width}px: page must not overflow (${layout.document}px)`);
  }
  await page.setViewportSize({ width: 1440, height: 1200 });
  await page.goto(`${origin}/paket`);
  await revealPage(page);
  await page.screenshot({ path: new URL("laptop.png", output).pathname });
  await page.screenshot({ path: new URL("laptop-full.png", output).pathname, fullPage: true });
  await page.locator("#estimasi").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  await page.locator(".pricing-estimate-section").screenshot({ path: new URL("laptop-calculator.png", output).pathname, style: ".site-header, .skip-link { visibility: hidden !important; }" });

  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 1100 }, isMobile: true, deviceScaleFactor: 1 });
  const mobile = await mobileContext.newPage();
  mobile.on("pageerror", (error) => errors.push(error.message));
  await mobile.goto(`${origin}/paket`);
  await revealPage(mobile);
  await mobile.screenshot({ path: new URL("mobile.png", output).pathname });
  await mobile.screenshot({ path: new URL("mobile-full.png", output).pathname, fullPage: true });
  await mobile.locator("#estimasi").scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(1200);
  await mobile.locator(".pricing-estimate-section").screenshot({ path: new URL("mobile-calculator.png", output).pathname, style: ".site-header, .skip-link { visibility: hidden !important; }" });
  await mobile.getByRole("button", { name: "Buka navigasi", exact: true }).click();
  await mobile.locator('.header-sheet__nav a[href="/paket"]').waitFor({ state: "visible" });
  await mobile.getByRole("button", { name: "Tutup navigasi", exact: true }).click();
  await mobile.emulateMedia({ reducedMotion: "reduce" });
  await mobile.reload();
  const motion = await mobile.locator(".pricing-card").first().evaluate((element) => getComputedStyle(element).transitionDuration);
  assert(motion.split(",").every((duration) => parseFloat(duration) === 0), "Reduced-motion preference disables transitions");
  assert.equal(errors.length, 0, `Browser errors: ${errors.join("; ")}`);
  record("No page overflow at 320/390/768/1024/1440px; mobile navigation, reduced motion, and clean browser console verified.");
  await writeFile(new URL("verification.json", output), JSON.stringify({ origin, checks, errors, fonts: fontState }, null, 2));
  console.log(`Screenshots: ${output.pathname}`);
} catch (error) {
  console.error("Browser errors:", errors);
  throw error;
} finally {
  await browser.close();
}
