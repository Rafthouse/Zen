import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// Extract all untranslated koans into a list for translation
var untranslated = [];
k.forEach(function(x, i) {
  var hasUk = x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0;
  if (!hasUk) {
    var enTitle = (x.title && x.title.en) || '';
    var enText = (x.text && x.text.en) || '';
    untranslated.push({
      idx: i,
      id: x.id || x.slug || ('koan_' + i),
      enTitle: enTitle,
      enText: enText
    });
  }
});

console.log('Untranslated count:', untranslated.length);

// Save as JSON for batch processing
fs.writeFileSync('scripts/uk_batch.json', JSON.stringify(untranslated, null, 2), 'utf8');
console.log('Saved to scripts/uk_batch.json');

// Show first 3 for reference
untranslated.slice(0, 3).forEach(function(x) {
  console.log('\n[' + x.idx + '] ' + x.id);
  console.log('  Title: ' + x.enTitle.slice(0, 80));
  console.log('  Text preview: ' + x.enText.slice(0, 120) + '...');
});
