import { chromium } from "playwright";
import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";

const outputDir = path.resolve("artifacts/visual-test");
fs.mkdirSync(outputDir, { recursive: true });

async function smoothScroll(page, targetY, durationMs = 2500) {
  const startY = await page.evaluate(() => window.scrollY);
  const diff = targetY - startY;
  const steps = 30;
  const stepDelay = Math.max(10, Math.floor(durationMs / steps));
  for (let i = 1; i <= steps; i++) {
    const progress = i / steps;
    const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
    const currentY = startY + diff * ease;
    await page.evaluate((y) => window.scrollTo(0, y), currentY);
    await page.waitForTimeout(stepDelay);
  }
}

async function runVisualWalkthrough() {
  console.log("🚀 Launching Edge browser for visual walkthroughs...");
  const browser = await chromium.launch({
    channel: "msedge",
    headless: true,
  });

  // ==========================================
  // 1. TAMPILOKA WALKTHROUGH
  // ==========================================
  console.log("\n🎬 [1/2] Recording Tampiloka Walkthrough (http://localhost:3000)...");
  const tampilokaContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 800 },
    },
  });

  const tampilokaPage = await tampilokaContext.newPage();
  await tampilokaPage.goto("http://localhost:3000", { waitUntil: "domcontentloaded", timeout: 45000 });
  await tampilokaPage.waitForTimeout(3000); // Allow loader & initial reveals
  await tampilokaPage.screenshot({ path: path.join(outputDir, "tampiloka-1-hero.png") });

  console.log("  - Hovering and reading hero...");
  await tampilokaPage.waitForTimeout(1000);

  console.log("  - Scrolling down to showcase...");
  await smoothScroll(tampilokaPage, 750, 2000);
  await tampilokaPage.waitForTimeout(1000);
  await tampilokaPage.screenshot({ path: path.join(outputDir, "tampiloka-2-showcase.png") });

  console.log("  - Interacting with showcase card...");
  const firstTampilokaCard = tampilokaPage.locator(".showcase__open").first();
  if (await firstTampilokaCard.count() > 0) {
    await firstTampilokaCard.hover();
    await tampilokaPage.waitForTimeout(800);
    console.log("  - Opening showcase preview sheet...");
    await firstTampilokaCard.click();
    await tampilokaPage.waitForTimeout(2200);
    await tampilokaPage.screenshot({ path: path.join(outputDir, "tampiloka-3-showcase-sheet.png") });

    // Close preview sheet
    const closeBtn = tampilokaPage.locator(".showcase-sheet__header button, button[aria-label*='Tutup']").first();
    if (await closeBtn.count() > 0) {
      await closeBtn.click();
      await tampilokaPage.waitForTimeout(1000);
    }
  }

  console.log("  - Scrolling past studio services...");
  await smoothScroll(tampilokaPage, 2200, 2500);
  await tampilokaPage.waitForTimeout(1000);

  console.log("  - Scrolling to FAQ...");
  const faqSection = tampilokaPage.locator(".faq-section");
  if (await faqSection.count() > 0) {
    const faqY = await faqSection.evaluate((el) => el.getBoundingClientRect().top + window.scrollY - 100);
    await smoothScroll(tampilokaPage, faqY, 2000);
    await tampilokaPage.waitForTimeout(800);
    await tampilokaPage.screenshot({ path: path.join(outputDir, "tampiloka-4-faq.png") });

    console.log("  - Clicking FAQ accordion...");
    const faqTriggers = tampilokaPage.locator(".faq-trigger");
    if (await faqTriggers.count() > 0) {
      await faqTriggers.first().click();
      await tampilokaPage.waitForTimeout(900);
      if (await faqTriggers.count() > 1) {
        await faqTriggers.nth(1).click();
        await tampilokaPage.waitForTimeout(900);
      }
    }
  }

  console.log("  - Scrolling to Footer...");
  const pageHeight = await tampilokaPage.evaluate(() => document.body.scrollHeight);
  await smoothScroll(tampilokaPage, pageHeight, 2000);
  await tampilokaPage.waitForTimeout(1500);
  await tampilokaPage.screenshot({ path: path.join(outputDir, "tampiloka-5-footer.png") });

  console.log("  - Testing scroll-up to reveal header...");
  await smoothScroll(tampilokaPage, pageHeight - 600, 1000);
  await tampilokaPage.waitForTimeout(1200);

  const tampilokaVideoPath = await tampilokaPage.video().path();
  await tampilokaPage.close();
  await tampilokaContext.close();

  const finalTampilokaVideo = path.join(outputDir, "tampiloka-walkthrough.webm");
  if (fs.existsSync(tampilokaVideoPath)) {
    fs.renameSync(tampilokaVideoPath, finalTampilokaVideo);
    console.log(`  ✅ Tampiloka video saved to: ${finalTampilokaVideo}`);
  }

  // ==========================================
  // 2. TEMURA WALKTHROUGH
  // ==========================================
  console.log("\n🎬 [2/2] Recording Temura Walkthrough (http://localhost:3001)...");
  const temuraContext = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    recordVideo: {
      dir: outputDir,
      size: { width: 1280, height: 800 },
    },
  });

  const temuraPage = await temuraContext.newPage();
  await temuraPage.goto("http://localhost:3001", { waitUntil: "domcontentloaded", timeout: 45000 });
  await temuraPage.waitForTimeout(3000); // Allow brand loader & initial reveals
  await temuraPage.screenshot({ path: path.join(outputDir, "temura-1-hero.png") });

  console.log("  - Hovering and reading hero...");
  await temuraPage.waitForTimeout(1000);

  console.log("  - Scrolling down to 'Pilihan desain' showcase...");
  const designSection = temuraPage.locator("#desain");
  if (await designSection.count() > 0) {
    const designY = await designSection.evaluate((el) => el.getBoundingClientRect().top + window.scrollY - 80);
    await smoothScroll(temuraPage, designY, 2000);
    await temuraPage.waitForTimeout(1000);
    await temuraPage.screenshot({ path: path.join(outputDir, "temura-2-desain.png") });

    console.log("  - Interacting with Temura design showcase card...");
    const firstTemuraCard = temuraPage.locator(".showcase__open").first();
    if (await firstTemuraCard.count() > 0) {
      await firstTemuraCard.hover();
      await temuraPage.waitForTimeout(800);
      console.log("  - Opening Temura design preview sheet drawer...");
      await firstTemuraCard.click();
      await temuraPage.waitForTimeout(2500); // Wait for live preview to load
      await temuraPage.screenshot({ path: path.join(outputDir, "temura-3-showcase-sheet.png") });

      // Close preview sheet
      const closeBtn = temuraPage.locator(".showcase-sheet__header button, button[aria-label*='Tutup']").first();
      if (await closeBtn.count() > 0) {
        await closeBtn.click();
        await temuraPage.waitForTimeout(1000);
      }
    }
  }

  console.log("  - Scrolling down to 'Paket undangan'...");
  const paketSection = temuraPage.locator("#paket");
  if (await paketSection.count() > 0) {
    const paketY = await paketSection.evaluate((el) => el.getBoundingClientRect().top + window.scrollY - 80);
    await smoothScroll(temuraPage, paketY, 2000);
    await temuraPage.waitForTimeout(1200);
    await temuraPage.screenshot({ path: path.join(outputDir, "temura-4-paket.png") });
  }

  console.log("  - Scrolling to 'Tiga langkah'...");
  const langkahSection = temuraPage.locator("#langkah");
  if (await langkahSection.count() > 0) {
    const langkahY = await langkahSection.evaluate((el) => el.getBoundingClientRect().top + window.scrollY - 80);
    await smoothScroll(temuraPage, langkahY, 1500);
    await temuraPage.waitForTimeout(1000);
  }

  console.log("  - Scrolling to 'Tanya jawab' (FAQ)...");
  const temuraFaq = temuraPage.locator("#faq");
  if (await temuraFaq.count() > 0) {
    const faqY = await temuraFaq.evaluate((el) => el.getBoundingClientRect().top + window.scrollY - 80);
    await smoothScroll(temuraPage, faqY, 1800);
    await temuraPage.waitForTimeout(1000);
    await temuraPage.screenshot({ path: path.join(outputDir, "temura-5-faq.png") });

    console.log("  - Clicking Temura Base UI Accordion triggers...");
    const faqTriggers = temuraPage.locator(".faq-trigger");
    if (await faqTriggers.count() > 0) {
      await faqTriggers.first().click();
      await temuraPage.waitForTimeout(900);
      if (await faqTriggers.count() > 1) {
        await faqTriggers.nth(1).click();
        await temuraPage.waitForTimeout(900);
      }
    }
  }

  console.log("  - Scrolling to Footer...");
  const temuraHeight = await temuraPage.evaluate(() => document.body.scrollHeight);
  await smoothScroll(temuraPage, temuraHeight, 2000);
  await temuraPage.waitForTimeout(1500);
  await temuraPage.screenshot({ path: path.join(outputDir, "temura-6-footer.png") });

  console.log("  - Testing scroll-up to reveal header...");
  await smoothScroll(temuraPage, temuraHeight - 600, 1000);
  await temuraPage.waitForTimeout(1200);

  const temuraVideoPath = await temuraPage.video().path();
  await temuraPage.close();
  await temuraContext.close();

  const finalTemuraVideo = path.join(outputDir, "temura-walkthrough.webm");
  if (fs.existsSync(temuraVideoPath)) {
    fs.renameSync(temuraVideoPath, finalTemuraVideo);
    console.log(`  ✅ Temura video saved to: ${finalTemuraVideo}`);
  }

  await browser.close();

  // ==========================================
  // 3. FFMPEG CONVERSIONS & SIDE-BY-SIDE
  // ==========================================
  console.log("\n🎞️  Processing videos with ffmpeg...");
  try {
    const tampilokaMp4 = path.join(outputDir, "tampiloka-walkthrough.mp4");
    const temuraMp4 = path.join(outputDir, "temura-walkthrough.mp4");
    const sideBySideMp4 = path.join(outputDir, "comparison-side-by-side.mp4");

    if (fs.existsSync(finalTampilokaVideo)) {
      console.log("  - Converting Tampiloka to MP4...");
      execSync(`ffmpeg -y -i "${finalTampilokaVideo}" -c:v libx264 -pix_fmt yuv420p "${tampilokaMp4}"`, { stdio: "ignore" });
    }

    if (fs.existsSync(finalTemuraVideo)) {
      console.log("  - Converting Temura to MP4...");
      execSync(`ffmpeg -y -i "${finalTemuraVideo}" -c:v libx264 -pix_fmt yuv420p "${temuraMp4}"`, { stdio: "ignore" });
    }

    if (fs.existsSync(tampilokaMp4) && fs.existsSync(temuraMp4)) {
      console.log("  - Creating side-by-side comparison video...");
      execSync(
        `ffmpeg -y -i "${tampilokaMp4}" -i "${temuraMp4}" -filter_complex "[0:v]scale=640:400[left];[1:v]scale=640:400[right];[left][right]hstack=inputs=2[v]" -map "[v]" -c:v libx264 -pix_fmt yuv420p "${sideBySideMp4}"`,
        { stdio: "ignore" }
      );
      console.log(`  ✅ Side-by-side comparison video saved to: ${sideBySideMp4}`);
    }
  } catch (err) {
    console.warn("  ⚠️ ffmpeg conversion note:", err.message);
  }

  console.log("\n✨ Visual testing and recording completed successfully!");
}

runVisualWalkthrough().catch((err) => {
  console.error("❌ Error in visual walkthrough:", err);
  process.exit(1);
});
