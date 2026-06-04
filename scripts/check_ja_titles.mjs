import fs from 'fs';
var k=JSON.parse(fs.readFileSync('src/data/koans.json','utf8'));
var cache=JSON.parse(fs.readFileSync('scripts/japanese_mumonkan_cache.json','utf8'));

var mumonkan=k.filter(function(x){return x.source==='mumonkan'});
console.log('Mumonkan koans:',mumonkan.length);

mumonkan.forEach(function(x){
  var entry=cache[x.slug];
  if(!entry) return;
  var cacheTitle=(entry.jaTitle||entry.title||'').trim();
  var ourTitle=(x.title&&x.title.ja||'').trim();
  if(ourTitle!==cacheTitle){
    console.log('DIFF: '+x.slug);
    console.log('  our:   "'+ourTitle+'"');
    console.log('  cache: "'+cacheTitle+'"');
  }
});

console.log('\n=== Full ja titles from koans.json ===');
mumonkan.forEach(function(x){
  console.log(x.slug+': "'+(x.title&&x.title.ja||'')+'"');
});
