import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// 1. Polish — merge from polish_koans_cache.json
var plCache = JSON.parse(fs.readFileSync('scripts/polish_koans_cache.json', 'utf8'));
var plMerged = 0;
k.forEach(function(x){
  var id = x.id || x.slug;
  var entry = plCache[id];
  if (!entry) return;
  if (!x.title) x.title = {};
  if (!x.text) x.text = {};
  if (entry.plTitle) x.title.pl = entry.plTitle;
  if (entry.text) x.text.pl = entry.text;
  plMerged++;
});
console.log('Polish merged:', plMerged);

// 2. French — merge from french_mumonkan_cache.json
var frCache = JSON.parse(fs.readFileSync('scripts/french_mumonkan_cache.json', 'utf8'));
var frMerged = 0;
k.forEach(function(x){
  var id = x.id || x.slug;
  var entry = frCache[id];
  if (!entry) return;
  if (!x.title) x.title = {};
  if (!x.text) x.text = {};
  if (entry.frTitle) x.title.fr = entry.frTitle;
  if (entry.text) x.text.fr = entry.text;
  frMerged++;
});
console.log('French merged:', frMerged);

// 3. Japanese — merge from japanese_mumonkan_cache.json
var jaCache = JSON.parse(fs.readFileSync('scripts/japanese_mumonkan_cache.json', 'utf8'));
var jaMerged = 0;
k.forEach(function(x){
  var id = x.id || x.slug;
  var entry = jaCache[id];
  if (!entry) return;
  if (!x.title) x.title = {};
  if (!x.text) x.text = {};
  if (entry.jaTitle) x.title.ja = entry.jaTitle;  // we already set correct ones, but keep if cache has them
  if (entry.text) x.text.ja = entry.text;
  jaMerged++;
});
console.log('Japanese merged:', jaMerged);

// Check coverage
var stats = {en:0, pl:0, fr:0, ja:0, uk:0};
k.forEach(function(x){
  if (x.text && x.text.en) stats.en++;
  if (x.text && x.text.pl) stats.pl++;
  if (x.text && x.text.fr) stats.fr++;
  if (x.text && x.text.ja) stats.ja++;
  if (x.text && x.text.uk) stats.uk++;
});
console.log('Coverage (text):', JSON.stringify(stats));

fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
console.log('Done');
