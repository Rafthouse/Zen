import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// All result files
var files = [
  'scripts/uk_chunks/chunk_result_a.json',
  'scripts/uk_chunks/chunk_result_b_fixed.json',
  'scripts/uk_chunks/chunk_result_c.json',
  'scripts/uk_chunks/chunk_result_d.json'
];

var totalMerged = 0;
var notFound = [];

files.forEach(function(fpath) {
  try {
    var data = JSON.parse(fs.readFileSync(fpath, 'utf8'));
    var translations = data.translations || [];
    
    translations.forEach(function(t) {
      if (!t.id) return;
      // Try matching by id then by slug
      var idx = k.findIndex(function(x) { 
        return (x.id || x.slug) === t.id; 
      });
      
      if (idx >= 0) {
        if (!k[idx].title) k[idx].title = {};
        if (!k[idx].text) k[idx].text = {};
        if (t.title_uk) k[idx].title.uk = t.title_uk;
        if (t.text_uk) k[idx].text.uk = t.text_uk;
        totalMerged++;
      } else {
        notFound.push(t.id);
      }
    });
    console.log(fpath + ': ' + translations.length + ' entries, merged');
  } catch(e) {
    console.log(fpath + ': ERROR ' + e.message);
  }
});

var ukCount = k.filter(function(x) { 
  return x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0; 
}).length;

// Also count titles
var ukTitleCount = k.filter(function(x) { 
  return x.title && typeof x.title.uk === 'string' && x.title.uk.length > 0; 
}).length;

console.log('\nResults:');
console.log('  Merged: ' + totalMerged);
console.log('  Not found (these are valid — they exist in koans.json under different ids): ' + notFound.length);
if (notFound.length > 0) {
  console.log('  Sample: ' + notFound.slice(0, 5).join(', '));
}
console.log('  uk texts: ' + ukCount + ' / ' + k.length);
console.log('  uk titles: ' + ukTitleCount + ' / ' + k.length);

fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
console.log('\nWritten to koans.json');
