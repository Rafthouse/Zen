import { chromium } from 'playwright';
import fs from 'fs';

const browser = await chromium.launch({ headless: true });

const frames = fs.readdirSync('I:/ZEN/enso_captures/frames')
  .filter(f => f.endsWith('.png'))
  .sort()
  .map(f => {
    const buf = fs.readFileSync('I:/ZEN/enso_captures/frames/' + f);
    return 'data:image/png;base64,' + buf.toString('base64');
  });

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Enso Evidence</title>
<style>
body{margin:0;background:#f4f0e8;font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;padding:30px}
h1{font-size:28px;font-weight:400;margin:0}
h2{font-size:18px;font-weight:400;color:#666;margin:5px 0 30px}
.grid{display:flex;gap:20px;flex-wrap:wrap;justify-content:center}
.card{background:#fff;border-radius:16px;padding:15px;box-shadow:0 2px 12px rgba(0,0,0,0.08);text-align:center;width:230px}
.card img{width:200px;height:200px;border-radius:8px;background:#faf8f4}
.label{font-size:14px;color:#444;margin-top:10px}
.sub{font-size:12px;color:#999}
hr{border:none;border-top:1px solid #ddd;width:80%;margin:30px 0}
canvas{border:2px solid #ddd;border-radius:12px;max-width:350px}
</style></head><body>
<h1>Enso Reveal</h1>
<h2>Approved artwork animated via CSS stroke-dashoffset on 3.2s timeline</h2>
<div class="grid">
  <div class="card"><img src="01_first_frame.png"><div class="label">0% &mdash; Start</div><div class="sub">Before animation</div></div>
  <div class="card"><img src="02_mid_frame.png"><div class="label">50% &mdash; Halfway</div><div class="sub">~1.6s</div></div>
  <div class="card"><img src="03_final_frame.png"><div class="label">100% &mdash; Complete</div><div class="sub">3.2s</div></div>
</div>
<hr>
<h2>Live Playback (10fps)</h2>
<canvas id="c"></canvas>
<p style="color:#999;font-size:13px">35 frames captured from actual browser render</p>
<script>
var c=document.getElementById('c'),ctx=c.getContext('2d'),total=${frames.length},idx=0,loaded=0
var imgs=[]
var data=['${frames.join("','")}']
for(var i=0;i<total;i++){(function(n){
  var img=new Image()
  img.onload=function(){
    if(!loaded){c.width=img.width;c.height=img.height}
    if(++loaded===total)setInterval(function(){
      ctx.clearRect(0,0,c.width,c.height)
      ctx.drawImage(imgs[idx],0,0)
      idx=(idx+1)%total
    },100)
  }
  img.src=data[n]
  imgs.push(img)
})(i)}
</script></body></html>`;

fs.writeFileSync('I:/ZEN/enso_captures/player.html', html);
console.log('Created player.html');
await browser.close();
