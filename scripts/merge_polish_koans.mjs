/**
 * Merge Polish translations from cache into koans.json
 *
 * This script:
 * 1. Reads the Polish cache (scripts/polish_koans_cache.json)
 * 2. Maps each cached koan by its index (1-101) to the matching koan in koans.json
 * 3. Writes title.pl and text.pl fields with proper metadata
 *
 * Metadata stored per koan:
 *   text.pl: {
 *     "text": "...story...",
 *     "source_type": "human_translation",
 *     "translator": "Wydawnictwo Zysk i S-ka (1998) / przewodnikduchowy.pl",
 *     "source_reference": "Shasekishū (沙石集), Mujū Dōkyō (1283)",
 *     "language": "pl"
 *   }
 *   title.pl: "Polish Title"
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = resolve(__dirname, 'polish_koans_cache.json');
const KOANS_FILE = resolve(__dirname, '..', 'src', 'data', 'koans.json');
const BACKUP_FILE = resolve(__dirname, '..', 'src', 'data', 'koans_backup_pre_pl.json');

if (!existsSync(CACHE_FILE)) {
  console.error('ERROR: Cache file not found! Run fetch_polish_koans (sub-agent) first.');
  console.error('Expected at:', CACHE_FILE);
  process.exit(1);
}

const cache = JSON.parse(readFileSync(CACHE_FILE, 'utf8'));
const koans = JSON.parse(readFileSync(KOANS_FILE, 'utf8'));

console.log(`Loaded cache with ${Object.keys(cache).length} entries`);
console.log(`Loaded koans.json with ${koans.length} koans`);

// Backup original
writeFileSync(BACKUP_FILE, JSON.stringify(koans, null, 2), 'utf8');
console.log(`Backup saved to: ${BACKUP_FILE}`);

// For each cache entry (sorted by num), merge into the matching koan
const sortedEntries = Object.values(cache).sort((a, b) => a.num - b.num);

let matched = 0;
let unmatched = 0;
let errors = [];

for (const entry of sortedEntries) {
  const idx = entry.num - 1; // 1-based num → 0-based index
  
  if (idx >= koans.length) {
    errors.push(`Index ${idx} out of range (max ${koans.length - 1})`);
    unmatched++;
    continue;
  }
  
  const koan = koans[idx];
  
  if (!koan.title) koan.title = {};
  if (!koan.text) koan.text = {};
  
  // Set Polish title
  if (entry.plTitle) {
    koan.title.pl = entry.plTitle;
  }
  
  // Set Polish text with metadata
  if (entry.text) {
    koan.text.pl = {
      text: entry.text,
      source_type: "human_translation",
      translator: "Wydawnictwo Zysk i S-ka (1998) / przewodnikduchowy.pl",
      source_reference: "Shasekishū (沙石集), Mujū Dōkyō (1283)",
      language: "pl"
    };
  }
  
  matched++;
}

// Save
writeFileSync(KOANS_FILE, JSON.stringify(koans, null, 2), 'utf8');

// Summary
console.log('\n=== MERGE RESULTS ===');
console.log(`Total cache entries: ${sortedEntries.length}`);
console.log(`Matched: ${matched}`);
console.log(`Unmatched: ${unmatched}`);
console.log(`Errors: ${errors.length}`);

if (errors.length > 0) {
  console.log('\nErrors:');
  for (const err of errors.slice(0, 10)) {
    console.log(`  ${err}`);
  }
}

// Verify
const savedKoans = JSON.parse(readFileSync(KOANS_FILE, 'utf8'));
const withPl = savedKoans.filter(k => k.title?.pl).length;
const withPlText = savedKoans.filter(k => k.text?.pl).length;
console.log(`\nVerification after merge:`);
console.log(`  Koans with title.pl: ${withPl}/${savedKoans.length}`);
console.log(`  Koans with text.pl: ${withPlText}/${savedKoans.length}`);

// Show first 3 examples
console.log('\n=== EXAMPLE RECORDS ===');
for (let i = 0; i < Math.min(3, sortedEntries.length); i++) {
  const k = savedKoans[i];
  console.log(`\n#${i+1}: "${k.title?.en}" → "${k.title?.pl}"`);
  if (k.text?.pl?.text) {
    const preview = k.text.pl.text.substring(0, 120).replace(/\n/g, ' ');
    console.log(`  text.pl: ${preview}...`);
    console.log(`  translator: ${k.text.pl.translator}`);
    console.log(`  source_type: ${k.text.pl.source_type}`);
  }
}
