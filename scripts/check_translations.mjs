import { readFileSync } from 'fs';
const data = JSON.parse(readFileSync('src/data/koans.json', 'utf8'));

// Pick 5 koans
const indices = [0, 10, 20, 50, 100];
for (const i of indices) {
  const k = data[i];
  if (!k) { console.log('Koan ' + i + ' not found'); continue; }
  console.log('=== Koan #' + (i+1) + ': ' + k.slug + ' ===');
  console.log('en:', k.title?.en || '(missing)');
  console.log('uk:', k.title?.uk || '(MISSING)');
  console.log('pl:', k.title?.pl || '(MISSING)');
  console.log('fr:', k.title?.fr || '(MISSING)');
  console.log('ja:', k.title?.ja || '(MISSING)');
  console.log('');

  // Check text fields
  for (const lang of ['uk','pl','fr','ja']) {
    if (k.text?.[lang]) {
      console.log('  text.' + lang + ' exists');
    }
  }
  console.log('');
}

// Summary counts
console.log('=== SUMMARY ===');
const total = data.length;
for (const lang of ['uk','pl','fr','ja']) {
  const withTitle = data.filter(k => k.title?.[lang]).length;
  const withText = data.filter(k => k.text?.[lang]).length;
  console.log(lang + ': titles=' + withTitle + '/' + total + ', texts=' + withText + '/' + total);
}
