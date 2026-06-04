/**
 * Merge French Mumonkan into koans.json.
 * Mumonkan cases are indices 101-148 (0-indexed) in our 287 koan array.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const frCache = JSON.parse(readFileSync(resolve(__dirname, 'french_mumonkan_cache.json'), 'utf8'));
const koans = JSON.parse(readFileSync(resolve(__dirname, '..', 'src', 'data', 'koans.json'), 'utf8'));

// Mumonkan starts at index 101 (0-indexed) - after 101 Zen Stories
const MUMONKAN_START = 101;
const MUMONKAN_END = 148; // 48 cases, 0-indexed: 101 to 148 inclusive

let matched = 0;
let skipped = 0;
let errors = [];

for (let i = MUMONKAN_START; i <= MUMONKAN_END; i++) {
  const koan = koans[i];
  const caseNum = i - MUMONKAN_START + 1; // 1-48
  const frEntry = frCache[caseNum];
  
  if (!frEntry) {
    errors.push(`#${caseNum}: no French entry found`);
    skipped++;
    continue;
  }
  
  if (!koan) {
    errors.push(`#${caseNum}: no koan at index ${i}`);
    skipped++;
    continue;
  }
  
  // Set French title
  if (!koan.title) koan.title = {};
  koan.title.fr = frEntry.title;
  
  // Set French text with metadata
  if (!koan.text) koan.text = {};
  koan.text.fr = {
    text: frEntry.text,
    source_type: "human_translation",
    translator: "Jacques Prestreau",
    source_reference: "Wúménguān (無門關), comp. Wumen Huikai 1228 — La Barrière sans porte",
    language: "fr"
  };
  
  matched++;
}

writeFileSync(resolve(__dirname, '..', 'src', 'data', 'koans.json'), JSON.stringify(koans, null, 2), 'utf8');

console.log('=== FRENCH MUMONKAN MERGE ===');
console.log(`Matched: ${matched}`);
console.log(`Skipped: ${skipped}`);
console.log(`Errors: ${errors.length}`);

// Verify
const saved = JSON.parse(readFileSync(resolve(__dirname, '..', 'src', 'data', 'koans.json'), 'utf8'));
const withFr = saved.filter(k => k.title?.fr).length;
const withFrText = saved.filter(k => k.text?.fr).length;
console.log(`\nVerification:`);
console.log(`  title.fr: ${withFr}/${saved.length}`);
console.log(`  text.fr:  ${withFrText}/${saved.length}`);
console.log(`  title.pl: ${saved.filter(k => k.title?.pl).length}/${saved.length}`);
console.log(`  title.en: ${saved.filter(k => k.title?.en).length}/${saved.length}`);

// Examples
for (let i = 0; i < 2; i++) {
  const k = saved[MUMONKON_START + i];
  console.log(`\n#${i+1}: "${k.title.en}" → FR: "${k.title.fr}"`);
  if (k.text.fr) {
    console.log(`  text: ${k.text.fr.text.substring(0, 100)}...`);
    console.log(`  translator: ${k.text.fr.translator}`);
  }
}
