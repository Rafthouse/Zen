import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// Agent E translates koans with indices 52-118 (67 koans) and 149-186 (38 koans)
// The agent uses KOAN_X ids with X = the actual koans.json index
// Map: KOAN_52 through KOAN_118, KOAN_149 through KOAN_186

try {
  var data = JSON.parse(fs.readFileSync('scripts/uk_chunks/chunk_result_e.json', 'utf8'));
  var trans = data.translations || [];
  var merged = 0;
  
  trans.forEach(function(t) {
    // Parse id format: KOAN_X
    var idxMatch = t.id && t.id.match(/^KOAN_(\d+)$/);
    if (!idxMatch) {
      // Also try direct id match
      var idx = k.findIndex(function(x) { return (x.id || x.slug) === t.id; });
      if (idx >= 0) {
        if (!k[idx].title) k[idx].title = {};
        if (!k[idx].text) k[idx].text = {};
        k[idx].title.uk = t.title_uk;
        k[idx].text.uk = t.text_uk;
        merged++;
      }
      return;
    }
    
    var targetIdx = parseInt(idxMatch[1]);
    if (targetIdx >= 0 && targetIdx < k.length) {
      if (!k[targetIdx].title) k[targetIdx].title = {};
      if (!k[targetIdx].text) k[targetIdx].text = {};
      if (t.title_uk) k[targetIdx].title.uk = t.title_uk;
      if (t.text_uk) k[targetIdx].text.uk = t.text_uk;
      merged++;
    }
  });
  
  console.log('Merged: ' + merged + ' translations');
  
  var ukCount = k.filter(function(x) { return x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0; }).length;
  var ukTitle = k.filter(function(x) { return x.title && typeof x.title.uk === 'string' && x.title.uk.length > 0; }).length;
  
  console.log('uk texts: ' + ukCount + ' / ' + k.length);
  console.log('uk titles: ' + ukTitle + ' / ' + k.length);
  
  // Check remaining
  var missing = k.filter(function(x) { return !(x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0); });
  console.log('Remaining untranslated: ' + missing.length);
  
  fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
  console.log('Written.');
} catch(e) {
  console.log('Error: ' + e.message);
}
