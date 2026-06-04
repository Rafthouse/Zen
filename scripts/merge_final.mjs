import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

try {
  var data = JSON.parse(fs.readFileSync('scripts/uk_chunks/chunk_result_final.json', 'utf8'));
  var trans = data.translations || [];
  var merged = 0;
  
  trans.forEach(function(t) {
    var idx = k.findIndex(function(x) { return (x.id || x.slug) === t.id; });
    if (idx >= 0) {
      if (!k[idx].title) k[idx].title = {};
      if (!k[idx].text) k[idx].text = {};
      k[idx].title.uk = t.title_uk;
      k[idx].text.uk = t.text_uk;
      merged++;
    }
  });
  
  console.log('Merged: ' + merged + ' / ' + trans.length);
  
  var uk = k.filter(function(x) { return x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0; }).length;
  var missing = k.filter(function(x) { return !(x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0); }).length;
  
  console.log('uk texts: ' + uk + ' / ' + k.length);
  console.log('Missing: ' + missing);
  
  fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
  console.log('Written.');
} catch(e) {
  console.log('Error: ' + e.message);
}
