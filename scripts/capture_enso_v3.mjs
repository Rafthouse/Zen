import { chromium } from 'playwright';
import fs from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const outDir = path.resolve(__dirname, 'enso_captures');

const browser = await chromium.launch({ headless: true });

const ensoSvg = fs.readFileSync('I:/ZEN/src/assets/enso.svg', 'utf8')
  .replace('<svg ', '<svg width="150" height="150" ')
  .replace('<path ', '<path id="ensoPath" ');

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Enso</title>
<style>
body{margin:0;background:#f4f0e8;display:flex;justify-content:center;align-items:center;min-height:100vh}
.card{border:1px solid #ddd;border-radius:16px;padding:40px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.06)}
@keyframes er{from{stroke-dashoffset:178}to{stroke-dashoffset:0}}
#ensoPath{animation:er 3.2s cubic-bezier(0.12,0.72,0.33,1) both}
</style></head><body>
<div class="card">${ensoSvg}</div>
</body></html>`;

fs.writeFileSync('I:/ZEN/enso_captures/enso_test.html', html);

const page = await browser.newPage({ viewport: { width: 400, height: 500 } });

// Helper: load page, pause animation and set dashoffset
async function captureAt(dashoffset, filename) {
  await page.goto('file:///I:/ZEN/enso_captures/enso_test.html', { waitUntil: 'networkidle' });
  await page.waitForTimeout(50);
  // Cancel animation immediately and set fixed state
  await page.evaluate((d) => {
    const p = document.getElementById('ensoPath');
    if (p) {
      p.style.animation = 'none';
      // Force layout
      void p.offsetWidth;
      p.style.strokeDashoffset = String(d);
    }
  }, dashoffset);
  await page.waitForTimeout(100);
  await page.screenshot({ path: path.join(outDir, filename) });
  console.log(`Captured: ${filename} (dashoffset=${dashoffset})`);
}

await captureAt(178, 'frame_00.png');
await captureAt(134, 'frame_25.png');
await captureAt(89, 'frame_50.png');
await captureAt(45, 'frame_75.png');
await captureAt(0, 'frame_100.png');

// Capture live animation sequence
await page.goto('file:///I:/ZEN/enso_captures/enso_test.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(50);
const seqDir = path.join(outDir, 'seq_v2');
fs.mkdirSync(seqDir, { recursive: true });
for (let i = 0; i < 32; i++) {
  await page.screenshot({ path: path.join(seqDir, `s${String(i).padStart(2, '0')}.png`) });
  await page.waitForTimeout(100);
}
console.log('32 live animation frames captured');

await browser.close();
