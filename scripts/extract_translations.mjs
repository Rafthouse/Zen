import fs from 'fs';

// Manually construct valid JSON for chunk_result_b
// All the data is already captured in the agent result, just need to fix formatting

var content = fs.readFileSync('scripts/uk_chunks/chunk_result_b.json', 'utf8');

// The problem: Ukrainian text contains double quotes inside JSON string values
// These are NOT escaped. We need to rebuild.

// Strategy: read line by line, extract id, title_uk, text_uk values
var lines = content.split('\n');
var translations = [];
var current = null;
var inText = false;
var textBuffer = [];

for (var i = 0; i < lines.length; i++) {
  var line = lines[i];
  
  var idMatch = line.match(/"id":\s*"([^"]+)"/);
  if (idMatch) {
    if (current) {
      current.text_uk = textBuffer.join('\n').replace(/^"|\"$/g,'');
      translations.push(current);
    }
    current = { id: idMatch[1] };
    textBuffer = [];
    inText = false;
    continue;
  }
  
  var titleMatch = line.match(/"title_uk":\s*"(.+?)",?\s*$/);
  if (titleMatch && current) {
    current.title_uk = titleMatch[1];
    inText = true;
    textBuffer = [];
    continue;
  }
  
  var textStart = line.match(/"text_uk":\s*"(.*)/);
  if (textStart && current) {
    textBuffer = [textStart[1]];
    inText = true;
    continue;
  }
  
  var textEnd = line.match(/(.*)",?\s*$/);
  if (textEnd && current && inText && line.indexOf('"id":') < 0 && line.indexOf('"title_uk":') < 0) {
    textBuffer.push(textEnd[1]);
  }
}

if (current) {
  current.text_uk = textBuffer.join('\n');
  translations.push(current);
}

console.log('Extracted ' + translations.length + ' translations from broken JSON');

// Write clean JSON
var output = { translations: translations };
fs.writeFileSync('scripts/uk_chunks/chunk_result_b_fixed.json', JSON.stringify(output, null, 2), 'utf8');
console.log('Written fixed file');

// Also check - do the translations include the missing ones?
var ids = translations.map(function(t) { return t.id; });
var expected = ['hyakujos_fox','guteis_finger','joshu_washes_the_bowl','kyogen_mounts_the_tree','everyday_life_is_the_path'];
expected.forEach(function(eid) {
  console.log('  ' + eid + ': ' + (ids.indexOf(eid) >= 0 ? 'FOUND' : 'MISSING'));
});
