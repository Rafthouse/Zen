import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch({ headless: true });

const ensoSvg = fs.readFileSync('I:/ZEN/src/assets/enso.svg', 'utf8');

const svgWithClass = ensoSvg.replace(
  '<path ',
  '<path class="enso__path" '
).replace(
  'stroke="#c5a55a"',
  'stroke="#444"'
);

const htmlContent = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Enso Test</title>
<style>
body{margin:0;background:#f4f0e8;display:flex;justify-content:center;align-items:center;min-height:100vh;flex-direction:column}
svg{max-width:150px}
@keyframes er{from{stroke-dashoffset:178}to{stroke-dashoffset:0}}
.enso__path{animation:er 3.2s cubic-bezier(0.12,0.72,0.33,1) both}
</style></head><body>
<div style="border:1px solid #ddd;border-radius:16px;padding:30px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.06)">
${svgWithClass}
</div>
</body></html>`;

fs.writeFileSync('I:/ZEN/enso_captures/test_page.html', htmlContent);

const page = await browser.newPage({ viewport: { width: 400, height: 500 } });
await page.goto('file:///I:/ZEN/enso_captures/test_page.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(100);

// 0%
await page.evaluate(() => {
  const p = document.querySelector('.enso__path');
  if (p) { p.style.animation = 'none'; p.style.strokeDashoffset = '178'; }
});
await page.screenshot({ path: 'I:/ZEN/enso_captures/f0.png' });
console.log('0%');

// 25%
await page.evaluate(() => {
  const p = document.querySelector('.enso__path');
  if (p) { p.style.strokeDashoffset = '134'; }
});
await page.screenshot({ path: 'I:/ZEN/enso_captures/f25.png' });
console.log('25%');

// 50%
await page.evaluate(() => {
  const p = document.querySelector('.enso__path');
  if (p) { p.style.strokeDashoffset = '89'; }
});
await page.screenshot({ path: 'I:/ZEN/enso_captures/f50.png' });
console.log('50%');

// 75%
await page.evaluate(() => {
  const p = document.querySelector('.enso__path');
  if (p) { p.style.strokeDashoffset = '45'; }
});
await page.screenshot({ path: 'I:/ZEN/enso_captures/f75.png' });
console.log('75%');

// 100%
await page.evaluate(() => {
  const p = document.querySelector('.enso__path');
  if (p) { p.style.strokeDashoffset = '0'; }
});
await page.screenshot({ path: 'I:/ZEN/enso_captures/f100.png' });
console.log('100%');

// Now capture 35 frames of live animation
fs.mkdirSync('I:/ZEN/enso_captures/seq', { recursive: true });
await page.goto('file:///I:/ZEN/enso_captures/test_page.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(50);
for (let i = 0; i < 32; i++) {
  await page.screenshot({ path: `I:/ZEN/enso_captures/seq/s${String(i).padStart(2, '0')}.png` });
  await page.waitForTimeout(100);
}
console.log('32 frames');

await browser.close();
console.log('Done');
