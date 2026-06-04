import { chromium } from 'playwright';

const BASE = 'http://localhost:5173';
const OUT = 'I:/ZEN/screenshots';

const screens = [
  { name: '01-home',        url: '/',                             viewport: { width: 1280, height: 800 } },
  { name: '02-flow-q1',     url: '/#/flow',                       viewport: { width: 1280, height: 800 } },
  { name: '03-flow-q2',     url: '/#/flow',                       viewport: { width: 1280, height: 800 }, step: 1 },
  { name: '04-flow-q3',     url: '/#/flow',                       viewport: { width: 1280, height: 800 }, step: 2 },
  { name: '05-flow-q4',     url: '/#/flow',                       viewport: { width: 1280, height: 800 }, step: 3 },
  { name: '06-results',     url: '/#/results',                    viewport: { width: 1280, height: 800 } },
  { name: '07-koan-view',   url: '/#/koan/the_moon_cannot_be_stolen', viewport: { width: 1280, height: 800 } },
  { name: '08-favorites',   url: '/#/favorites',                  viewport: { width: 1280, height: 800 } },
  { name: '09-home-mobile', url: '/',                             viewport: { width: 390, height: 844 } },
  { name: '10-flow-mobile', url: '/#/flow',                       viewport: { width: 390, height: 844 } },
  { name: '11-results-mobile', url: '/#/results',                 viewport: { width: 390, height: 844 } },
  { name: '12-koan-mobile', url: '/#/koan/the_moon_cannot_be_stolen', viewport: { width: 390, height: 844 } },
];

import { mkdirSync } from 'fs';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

for (const s of screens) {
  await page.setViewportSize(s.viewport);
  await page.goto(BASE + s.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(800);

  // If we need to advance the flow, click through
  if (s.step !== undefined) {
    for (let i = 0; i < s.step; i++) {
      const btns = page.locator('button[aria-pressed]');
      const count = await btns.count();
      if (count > 0) {
        await btns.first().click();
        await page.waitForTimeout(300);
      }
    }
    // Click next/submit
    const nextBtn = page.getByRole('button', { name: /next|continue|result|forward/i });
    if (await nextBtn.isVisible()) {
      await nextBtn.click();
      await page.waitForTimeout(500);
    }
  }

  await page.screenshot({ path: `${OUT}/${s.name}.png`, fullPage: true });
  console.log(`✓ ${s.name}`);
}

await browser.close();
console.log('Done!');
