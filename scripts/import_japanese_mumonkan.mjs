import fs from 'fs';

const koans = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));
const rawCache = JSON.parse(fs.readFileSync('scripts/japanese_mumonkan_raw.json', 'utf8'));

// Step 1: REVERT the incorrect import from the previous script
// The previous script overwrote indices 101-148 with rawCache[1-48]
// But rawCache[1] = Mumonkan Case 1 (should go to koans[9])
// rawCache[2] = Mumonkan Case 2 (should go to koans[100])
// rawCache[3-48] = Cases 3-48 (should go to koans[101-147])

// First, tell me what's currently in koans before reverting
console.log('=== CURRENT STATE (before revert) ===');
console.log('ja at [9] joshu_mu:', koans[9].text.ja.slice(0, 60), '...');
console.log('ja at [100] hyakujos_fox:', (koans[100].text.ja || '').slice(0, 60), '...');
console.log('ja at [101] guteis_finger:', (koans[101].text.ja || '').slice(0, 60), '...');

// REVERT: set all these back to empty strings
// indices 101-148 currently have rawCache[1-48] which is WRONG
const toRevert = [];
for (let i = 101; i <= 148; i++) {
  toRevert.push(i);
}
console.log('\nRe-actively clearing indices 101-148...');
toRevert.forEach(idx => {
  if (koans[idx] && koans[idx].text) {
    koans[idx].text.ja = '';
  }
});

// Also clear index 9 (joshu_mu had ja from before, keep it? It had real ja text!)
// joshu_mu at idx 9 already had ja text (257 chars) from the original 10 (101 Zen Stories)
// That text is DIFFERENT from what's in rawCache[1] (which is Mumonkan Case 1)
// So keep the existing ja at idx 9 (it's the 101 Zen Stories version)

// Also check if rawCache[1] matches what koans[9] had
console.log('\n=== COMPARING joshu_mu ja ===');
console.log('Existing koans[9].text.ja:', koans[9].text.ja.slice(0, 80), '...');
console.log('rawCache[1] text:', rawCache['1'].text.slice(0, 80), '...');
// They're different sources, keep both

// Step 2: CORRECT import based on source field
const mapping = [];
koans.forEach((k, idx) => {
  if (k.source && k.source.includes('Mumonkan')) {
    const caseMatch = k.source.match(/Case (\d+)/);
    if (caseMatch) {
      const caseNum = parseInt(caseMatch[1]);
      // rawCache has cases 1-48
      // Case 1 -> rawCache['1']
      // Case 49 (ambans addition) is a special case
      if (caseNum >= 1 && caseNum <= 48) {
        mapping.push({ idx, id: k.id, caseNum, raw: rawCache[caseNum.toString()] });
      } else if (caseNum === 49) {
        // Amban's addition is not in the original 48, skip
        mapping.push({ idx, id: k.id, caseNum, raw: null, note: 'Case 49 not in original 48' });
      }
    }
  }
});

console.log('\n=== CORRECTED MAPPING ===');
console.log('Total Mumonkan koans with mapping:', mapping.length);

// Apply correct texts
let imported = 0;
let skipped = 0;
let hadJa = 0;

mapping.forEach(m => {
  if (!m.raw || !m.raw.text || m.raw.text.trim().length === 0) {
    if (m.note) {
      console.log('  [' + m.idx + '] ' + m.id + ' - ' + m.note + ' - SKIP');
    } else {
      console.log('  [' + m.idx + '] ' + m.id + ' Case ' + m.caseNum + ' - raw empty - SKIP');
    }
    skipped++;
    return;
  }

  const currentJa = koans[m.idx].text.ja || '';
  if (currentJa.trim().length > 0) {
    console.log('  [' + m.idx + '] ' + m.id + ' Case ' + m.caseNum + ' - already has ja (' + currentJa.trim().length + ' chars) - KEEP');
    hadJa++;
    return;
  }

  // Clean the text
  let cleaned = m.raw.text;
  const aTagIdx = cleaned.lastIndexOf('<a');
  if (aTagIdx >= 0) cleaned = cleaned.slice(0, aTagIdx).trim();
  cleaned = cleaned.replace(/<[^>]+>/g, '').trim();

  koans[m.idx].text.ja = cleaned;
  imported++;
  console.log('  [' + m.idx + '] ' + m.id + ' Case ' + m.caseNum + ' - imported (' + cleaned.length + ' chars)');
});

// Audit after
const jaAfter = koans.filter(k => k.text && typeof k.text.ja === 'string' && k.text.ja.trim().length > 0).length;

console.log('\n=== IMPORT SUMMARY ===');
console.log('  Imported new:', imported);
console.log('  Already had:', hadJa);
console.log('  Skipped:', skipped);

// Save
fs.writeFileSync('src/data/koans.json', JSON.stringify(koans, null, 2), 'utf8');
console.log('\nkoans.json saved');

// Final audit
const finalJa = koans.filter(k => k.text && typeof k.text.ja === 'string' && k.text.ja.trim().length > 0).length;
console.log('\n=== FINAL AUDIT ===');
console.log('ja texts:', finalJa, '/ 287');

// Spot check
console.log('\n=== SPOT CHECK ===');
[9, 100, 101, 147].forEach(idx => {
  const k = koans[idx];
  if (!k) return;
  const ja = k.text.ja || '';
  console.log('\n[' + idx + '] ' + k.id + ' (' + (k.title?.en || '') + ')');
  console.log('  ja:', ja.slice(0, 150));
  if (ja.length > 150) console.log('  ... (' + ja.length + ' chars)');
});
