import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// Fix pl, fr, ja wrapper objects  
var count_pl = 0, count_fr = 0, count_ja = 0;

k.forEach(function(x){
  if (!x.text) return;
  
  // pl: extract from wrapper
  var plv = x.text.pl;
  if (plv && typeof plv === 'object' && plv.text !== undefined) {
    x.text.pl = typeof plv.text === 'string' ? plv.text : '';
    count_pl++;
  }
  
  // fr: extract from wrapper  
  var frv = x.text.fr;
  if (frv && typeof frv === 'object' && frv.text !== undefined) {
    x.text.fr = typeof frv.text === 'string' ? frv.text : '';
    count_fr++;
  }
  
  // ja: extract from wrapper
  var jav = x.text.ja;
  if (jav && typeof jav === 'object' && jav.text !== undefined) {
    x.text.ja = typeof jav.text === 'string' ? jav.text : '';
    count_ja++;
  }
});

console.log('Unwrapped: pl=' + count_pl + ' fr=' + count_fr + ' ja=' + count_ja);

// Verify
var bad = 0;
k.forEach(function(x, i){
  if (x.text) {
    Object.keys(x.text).forEach(function(lang){
      if (typeof x.text[lang] !== 'string') {
        if (bad < 5) console.log('Still bad: koans[' + i + '].text.' + lang + ' = ' + typeof x.text[lang]);
        bad++;
      }
    });
  }
});
console.log('Remaining bad text fields:', bad);

var stats = {en:0,pl:0,fr:0,ja:0,uk:0};
k.forEach(function(x){
  if (x.text && x.text.en) stats.en++;
  if (x.text && typeof x.text.pl === 'string' && x.text.pl.length > 0) stats.pl++;
  if (x.text && typeof x.text.fr === 'string' && x.text.fr.length > 0) stats.fr++;
  if (x.text && typeof x.text.ja === 'string' && x.text.ja.length > 0) stats.ja++;
  if (x.text && x.text.uk) stats.uk++;
});
console.log('Text coverage:', JSON.stringify(stats));

fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
console.log('Written.');
