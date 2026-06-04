import fs from 'fs';

const outDir = 'I:/ZEN/enso_captures';

// Read image files as base64 for inline display
const start = fs.readFileSync(outDir + '/captures/start.png').toString('base64');
const early = fs.readFileSync(outDir + '/captures/early.png').toString('base64');
const mid = fs.readFileSync(outDir + '/captures/mid.png').toString('base64');
const late = fs.readFileSync(outDir + '/captures/late.png').toString('base64');
const done = fs.readFileSync(outDir + '/captures/done.png').toString('base64');

const seqFrames = [];
for (let i = 0; i < 32; i++) {
  seqFrames.push(fs.readFileSync(`${outDir}/seq_v3/s${String(i).padStart(2, '0')}.png`).toString('base64'));
}

const html = `<!DOCTYPE html>
<html><head><meta charset="utf-8"><title>Enso Reveal — Proof</title>
<style>
body{margin:0;background:#f4f0e8;font-family:Georgia,serif;display:flex;flex-direction:column;align-items:center;padding:40px}
h1{font-size:28px;font-weight:400;margin:0}
h2{font-size:18px;font-weight:400;color:#666;margin:5px 0 30px}
.grid{display:flex;gap:25px;flex-wrap:wrap;justify-content:center}
.card{background:#fff;border-radius:16px;padding:20px;box-shadow:0 2px 12px rgba(0,0,0,0.08);text-align:center;width:190px}
.card img{width:150px;height:150px;border-radius:8px;background:#faf8f4}
.label{font-size:14px;color:#444;margin-top:10px}
.sub{font-size:12px;color:#999}
hr{border:none;border-top:1px solid #ddd;width:80%;margin:30px 0}
.playback{text-align:center}
.playback canvas{border:2px solid #ddd;border-radius:12px;max-width:350px;margin-top:10px}
.info{color:#999;font-size:13px}
.note{max-width:600px;text-align:center;color:#666;font-size:15px;line-height:1.6;margin:10px 0}
</style></head><body>
<h1>Enso Reveal</h1>
<h2>CSS stroke-dashoffset reveal of approved enso.svg — 3.2s</h2>

<div class="grid">
  <div class="card"><img src="data:image/png;base64,${start}"><div class="label">0%</div><div class="sub">Before animation</div></div>
  <div class="card"><img src="data:image/png;base64,${early}"><div class="label">25%</div><div class="sub">~0.8s</div></div>
  <div class="card"><img src="data:image/png;base64,${mid}"><div class="label">50%</div><div class="sub">~1.6s</div></div>
  <div class="card"><img src="data:image/png;base64,${late}"><div class="label">75%</div><div class="sub">~2.4s</div></div>
  <div class="card"><img src="data:image/png;base64,${done}"><div class="label">100%</div><div class="sub">3.2s</div></div>
</div>

<p class="note">The approved enso.svg path (M14 66 C22 80 ...) is the artwork.<br>
Its stroke-dashoffset animates from 178 → 0, revealing the existing path.<br>
No synthetic geometry. No procedural redraw. The source asset is the visual.</p>

<hr>

<div class="playback">
<h2>Live Playback</h2>
<p class="info">32 frames captured from actual browser render at ~10fps</p>
<canvas id="c"></canvas>
</div>

<script>
var c=document.getElementById('c'),ctx=c.getContext('2d'),total=${seqFrames.length},idx=0,loaded=0,imgs=[];
var data=['${seqFrames.join("','")}'];
for(var i=0;i<total;i++){(function(n){
  var img=new Image();
  img.onload=function(){
    if(!loaded){c.width=150;c.height=150}
    if(++loaded===total){
      function tick(){ctx.clearRect(0,0,150,150);ctx.drawImage(imgs[idx],0,0);idx=(idx+1)%total;setTimeout(tick,100)}
      tick();
    }
  };
  img.src='data:image/png;base64,'+data[n];
  imgs.push(img);
})(i)}
</script>
</body></html>`;

fs.writeFileSync(outDir + '/proof.html', html);
console.log('Created proof.html');
