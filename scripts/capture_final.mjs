import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 400, height: 500 } });

const ensoSvg = fs.readFileSync('I:/ZEN/src/assets/enso.svg', 'utf8')
  .replace('<svg ', '<svg width="150" height="150" ');

// Create 5 static pages — no animation, just different dashoffset values
const states = [
  { dash: '178', file: 'captures/start.png', label: '0%' },
  { dash: '134', file: 'captures/early.png', label: '25%' },
  { dash: '89', file: 'captures/mid.png', label: '50%' },
  { dash: '45', file: 'captures/late.png', label: '75%' },
  { dash: '0', file: 'captures/done.png', label: '100%' },
];

fs.mkdirSync('I:/ZEN/enso_captures/captures', { recursive: true });

for (const s of states) {
  // Write a unique HTML file per state — absolute static, no animation
  const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Enso ${s.label}</title>
<style>
body{margin:0;background:#f4f0e8;display:flex;justify-content:center;align-items:center;min-height:100vh}
.card{border:1px solid #ddd;border-radius:16px;padding:40px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.06)}
</style></head><body>
<div class="card">${ensoSvg.replace('<path ', `<path stroke-dasharray="178" stroke-dashoffset="${s.dash}" `)}</div>
</body></html>`;
  const htmlFile = `I:/ZEN/enso_captures/enso_${s.file.replace('captures/', '').replace('.png', '')}.html`;
  fs.writeFileSync(htmlFile, html);
  
  await page.goto('file:///' + htmlFile, { waitUntil: 'networkidle' });
  await page.waitForTimeout(200);
  await page.screenshot({ path: `I:/ZEN/enso_captures/${s.file}` });
  console.log(`${s.label}: ${s.file}`);
}

// Now capture live animation with a JS pause
const animHtml = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Enso Anim</title>
<style>
body{margin:0;background:#f4f0e8;display:flex;justify-content:center;align-items:center;min-height:100vh}
.card{border:1px solid #ddd;border-radius:16px;padding:40px;background:#fff;box-shadow:0 2px 12px rgba(0,0,0,0.06)}
@keyframes er{from{stroke-dashoffset:178}to{stroke-dashoffset:0}}
#ep{animation:er 3.2s cubic-bezier(0.12,0.72,0.33,1) both}
</style></head><body>
<div class="card">${ensoSvg.replace('<path ', '<path id="ep" ')}</div>
</body></html>`;
fs.writeFileSync('I:/ZEN/enso_captures/enso_anim.html', animHtml);

// Live sequence
await page.goto('file:///I:/ZEN/enso_captures/enso_anim.html', { waitUntil: 'networkidle' });
await page.waitForTimeout(50);
const seqDir = 'I:/ZEN/enso_captures/seq_v3';
fs.mkdirSync(seqDir, { recursive: true });
for (let i = 0; i < 32; i++) {
  await page.screenshot({ path: `I:/ZEN/enso_captures/seq_v3/s${String(i).padStart(2, '0')}.png` });
  await page.waitForTimeout(100);
}
console.log('32 live frames');

await browser.close();
