import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch({ headless: true });

// Read the approved SVG asset
const ensoSvg = fs.readFileSync('I:/ZEN/src/assets/enso.svg', 'utf8')
  .replace('<svg ', '<svg width="150" height="150" ')
  .replace('<path ', '<path class="enso__path" ');

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Enso</title>
<style>
body{margin:0;background:#f4f0e8;display:flex;justify-content:center;align-items:center;min-height:100vh}
.card{border:1px solid #ddd;border-radius:16px;padding:40px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.06)}
@keyframes er{from{stroke-dashoffset:178}to{stroke-dashoffset:0}}
.enso__path{animation:er 3.2s cubic-bezier(0.12,0.72,0.33,1) both}
</style></head><body>
<div class="card">${ensoSvg}</div>
</body></html>`;

fs.writeFileSync('I:/ZEN/enso_captures/enso_test.html', html);

const page = await browser.newPage({ viewport: { width: 400, height: 500 } });
await page.goto('file:///I:/ZEN/enso_captures/enso_test.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(200);

// Verify SVG rendered
const info = await page.evaluate(() => {
  const el = document.querySelector('.enso__path');
  if (!el) return { err: 'no path' };
  const r = el.getBoundingClientRect();
  return { w: r.width, h: r.height, x: r.x, y: r.y, dash: getComputedStyle(el).strokeDashoffset };
});
console.log('Info:', JSON.stringify(info));

if (info.w > 0) {
  // 0%
  await page.evaluate(() => { const p = document.querySelector('.enso__path'); if (p) { p.style.animation = 'none'; p.style.strokeDashoffset = '178'; } });
  await page.screenshot({ path: 'I:/ZEN/enso_captures/f0_v2.png' });
  console.log('0%');

  // 25%
  await page.evaluate(() => { const p = document.querySelector('.enso__path'); if (p) p.style.strokeDashoffset = '134'; });
  await page.screenshot({ path: 'I:/ZEN/enso_captures/f25_v2.png' });
  console.log('25%');

  // 50%
  await page.evaluate(() => { const p = document.querySelector('.enso__path'); if (p) p.style.strokeDashoffset = '89'; });
  await page.screenshot({ path: 'I:/ZEN/enso_captures/f50_v2.png' });
  console.log('50%');

  // 75%
  await page.evaluate(() => { const p = document.querySelector('.enso__path'); if (p) p.style.strokeDashoffset = '45'; });
  await page.screenshot({ path: 'I:/ZEN/enso_captures/f75_v2.png' });
  console.log('75%');

  // 100%
  await page.evaluate(() => { const p = document.querySelector('.enso__path'); if (p) p.style.strokeDashoffset = '0'; });
  await page.screenshot({ path: 'I:/ZEN/enso_captures/f100_v2.png' });
  console.log('100%');

  // Capture live animation sequence
  fs.mkdirSync('I:/ZEN/enso_captures/seq_v2', { recursive: true });
  await page.goto('file:///I:/ZEN/enso_captures/enso_test.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(50);
  for (let i = 0; i < 32; i++) {
    await page.screenshot({ path: `I:/ZEN/enso_captures/seq_v2/s${String(i).padStart(2, '0')}.png` });
    await page.waitForTimeout(100);
  }
  console.log('32 frames');
} else {
  console.log('SVG not visible');
}

await browser.close();
