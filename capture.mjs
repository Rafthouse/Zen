import { chromium } from 'playwright';
import { mkdirSync } from 'fs';

mkdirSync('I:/ZEN/screenshots', { recursive: true });

const browser = await chromium.launch({ headless: true });

async function capture(name, url, viewport, fn) {
  const page = await browser.newPage();
  await page.setViewportSize(viewport);
  // Set dark theme via localStorage
  await page.addInitScript(() => {
    localStorage.setItem('zen-theme', 'dark');
  });
  await page.goto('http://localhost:5173' + url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  if (fn) await fn(page);
  await page.screenshot({ path: `I:/ZEN/screenshots/${name}.png`, fullPage: true });
  console.log('✓ ' + name);
  await page.close();
}

// 1. Home — Desktop
await capture('01-home', '/', { width: 1280, height: 800 });

// 2. Home — Mobile
await capture('02-home-mobile', '/', { width: 390, height: 844 });

// 3. Flow step 1 — Desktop (inner weather)
await capture('03-flow-q1-desktop', '/#/flow', { width: 1280, height: 800 });

// 4. Flow step 2 — after selecting weather + clicking next
await capture('04-flow-q2-desktop', '/#/flow', { width: 1280, height: 800 }, async (page) => {
  // Click first weather option
  await page.locator('.option-card').first().click();
  await page.waitForTimeout(400);
});

// 5. Flow step 3
await capture('05-flow-q3-desktop', '/#/flow', { width: 1280, height: 800 }, async (page) => {
  await page.locator('.option-card').first().click();
  await page.waitForTimeout(400);
  await page.locator('.option-card').first().click();
  await page.waitForTimeout(400);
});

// 6. Flow step 4
await capture('06-flow-q4-desktop', '/#/flow', { width: 1280, height: 800 }, async (page) => {
  await page.locator('.option-card').first().click();
  await page.waitForTimeout(400);
  await page.locator('.option-card').first().click();
  await page.waitForTimeout(400);
  await page.locator('.option-card').first().click();
  await page.waitForTimeout(400);
});

// 7. Results — full flow then navigate
await capture('07-results-desktop', '/#/flow', { width: 1280, height: 800 }, async (page) => {
  // Step 1: fog
  await page.locator('.option-card').nth(0).click();
  await page.waitForTimeout(500);
  // Step 2: searching
  await page.locator('.option-card').nth(2).click();
  await page.waitForTimeout(500);
  // Step 3: myself
  await page.locator('.option-card').nth(0).click();
  await page.waitForTimeout(500);
  // Step 4: short story (index 1)
  await page.locator('.option-card').nth(1).click();
  await page.waitForTimeout(500);
  // Now we should be on results
  await page.waitForTimeout(800);
});

// 8. Koan view
await capture('08-koan-view-desktop', '/#/koan/the_moon_cannot_be_stolen', { width: 1280, height: 800 });

// 9. Favorites
await capture('09-favorites-desktop', '/#/favorites', { width: 1280, height: 800 });

// 10. Koan view — mobile
await capture('10-koan-view-mobile', '/#/koan/empty_cup', { width: 390, height: 844 });

// 11. Results — mobile
await capture('11-results-mobile', '/#/flow', { width: 390, height: 844 }, async (page) => {
  await page.locator('.option-card').nth(0).click();
  await page.waitForTimeout(500);
  await page.locator('.option-card').nth(2).click();
  await page.waitForTimeout(500);
  await page.locator('.option-card').nth(0).click();
  await page.waitForTimeout(500);
  await page.locator('.option-card').nth(1).click();
  await page.waitForTimeout(500);
  await page.waitForTimeout(800);
});

// 12. Flow — mobile
await capture('12-flow-mobile', '/#/flow', { width: 390, height: 844 });

// 13. Flow results full page (taller viewport for koans)
await capture('13-results-full-desktop', '/#/flow', { width: 1280, height: 1080 }, async (page) => {
  await page.locator('.option-card').nth(1).click();
  await page.waitForTimeout(500);
  await page.locator('.option-card').nth(3).click();
  await page.waitForTimeout(500);
  await page.locator('.option-card').nth(2).click();
  await page.waitForTimeout(500);
  await page.locator('.option-card').nth(2).click();
  await page.waitForTimeout(500);
  await page.waitForTimeout(800);
});

// 14. Koan view — long (fallback translation)
await capture('14-koan-fallback', '/#/koan/everyday_mind', { width: 1280, height: 800 });

await browser.close();
console.log('All screenshots done!');
