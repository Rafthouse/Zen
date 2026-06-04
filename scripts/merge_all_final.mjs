import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// Agent A: koans at indices 10-51 (42 koans)
try {
  var content = fs.readFileSync('scripts/uk_chunks/chunk_result_a.json', 'utf8');
  var parts = content.split('"id":');
  var countA = 0;
  var posA = [10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,
    30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51];
  for (var i = 1; i < parts.length && i-1 < posA.length; i++) {
    var idx = posA[i-1];
    var titleMatch = parts[i].match(/"title_uk":\s*"((?:[^"\\]|\\.)*)"/);
    var textStart = parts[i].indexOf('"text_uk":');
    if (textStart < 0) continue;
    var after = parts[i].slice(textStart + 10);
    var fq = after.indexOf('"');
    if (fq < 0) continue;
    var rest = after.slice(fq + 1);
    var endIdx = rest.lastIndexOf('"');
    if (endIdx < 0) continue;
    var title = titleMatch ? titleMatch[1] : '';
    var text = rest.slice(0, endIdx);
    if (!k[idx].title) k[idx].title = {};
    if (!k[idx].text) k[idx].text = {};
    k[idx].title.uk = title;
    k[idx].text.uk = text;
    countA++;
  }
  console.log('A: ' + countA);
} catch(e) { console.log('A error: ' + e.message); }

// Agent B: match by id (61 translations)
try {
  var b = JSON.parse(fs.readFileSync('scripts/uk_chunks/chunk_result_b_fixed.json', 'utf8'));
  var countB = 0;
  b.translations.forEach(function(t) {
    var idx = k.findIndex(function(x) { return (x.id || x.slug) === t.id; });
    if (idx >= 0) {
      if (!k[idx].title) k[idx].title = {};
      if (!k[idx].text) k[idx].text = {};
      k[idx].title.uk = t.title_uk;
      k[idx].text.uk = t.text_uk;
      countB++;
    }
  });
  console.log('B: ' + countB);
} catch(e) { console.log('B error: ' + e.message); }

// Agent C: match by id (38 translations)
try {
  var c = JSON.parse(fs.readFileSync('scripts/uk_chunks/chunk_result_c.json', 'utf8'));
  var countC = 0;
  c.translations.forEach(function(t) {
    var idx = k.findIndex(function(x) { return (x.id || x.slug) === t.id; });
    if (idx >= 0) {
      if (!k[idx].title) k[idx].title = {};
      if (!k[idx].text) k[idx].text = {};
      k[idx].title.uk = t.title_uk;
      k[idx].text.uk = t.text_uk;
      countC++;
    }
  });
  console.log('C: ' + countC);
} catch(e) { console.log('C error: ' + e.message); }

// Agent D: Book of Equanimity at indices 187-286 (100 koans)
try {
  var contentD = fs.readFileSync('scripts/uk_chunks/chunk_result_d.json', 'utf8');
  var partsD = contentD.split('"id":');
  var countD = 0;
  for (var di = 1; di < partsD.length; di++) {
    var titleMatchD = partsD[di].match(/"title_uk":\s*"((?:[^"\\]|\\.)*)"/);
    var textStartD = partsD[di].indexOf('"text_uk":');
    if (textStartD < 0) continue;
    var afterD = partsD[di].slice(textStartD + 10);
    var fqD = afterD.indexOf('"');
    if (fqD < 0) continue;
    var restD = afterD.slice(fqD + 1);
    var endIdxD = restD.lastIndexOf('"');
    if (endIdxD < 0) continue;
    var titleD = titleMatchD ? titleMatchD[1] : '';
    var textD = restD.slice(0, endIdxD);
    var posD = di - 1;
    var idxD = 187 + posD;
    if (idxD < k.length) {
      if (!k[idxD].title) k[idxD].title = {};
      if (!k[idxD].text) k[idxD].text = {};
      k[idxD].title.uk = titleD;
      k[idxD].text.uk = textD;
      countD++;
    }
  }
  console.log('D: ' + countD);
} catch(e) { console.log('D error: ' + e.message); }

var uk = k.filter(function(x) { return x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0; }).length;
console.log('Total: ' + uk + '/' + k.length);

fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
console.log('Done');
