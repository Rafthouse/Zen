#!/usr/bin/env node
/**
 * Fix encoding corruption in Shōyō-roku (Book of Equanimity) koans.
 *
 * The original DOC file was read as UTF-8 when it was actually Windows-1252,
 * which corrupted em-dashes, curly quotes, apostrophes and macrons into � (U+FFFD).
 *
 * This script re-parses a clean text export (via LibreOffice with UTF8 filter)
 * and replaces the corrupted text.en fields in koans.json.
 */

import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const txtFile = resolve(here, '../temp_shoyo.txt');
const jsonFile = resolve(here, '../src/data/koans.json');

// 1. Read the clean text export from LibreOffice
const rawTxt = readFileSync(txtFile, 'utf8').replace(/\r/g, '');

// 2. Parse into case objects
const first = rawTxt.indexOf('CASE 1:');
const contentStart = rawTxt.indexOf('CASE 1:', first + 50);
const content = rawTxt.slice(contentStart);

// CASE 1 is special — no leading \nCASE
const end1 = content.indexOf('\nCASE 2:');
const case1Raw = content.slice('CASE 1: '.length, end1).trim();
const cases = [{ num: 1, raw: case1Raw }];

// Cases 2-100
const sections = content.split('\nCASE ').slice(1); // skip the part before first \nCASE
for (const section of sections) {
  const match = section.match(/^(\d+):\s*/);
  if (!match) continue;
  const num = parseInt(match[1]);
  const raw = section.slice(match[0].length).trim();
  cases.push({ num, raw });
}

// 3. Extract Instruction/Case/Verse from each
function parseCase(raw) {
  const instrMatch = raw.match(/Instruction:\n([\s\S]*?)(?=\nCase:)/);
  const caseMatch = raw.match(/Case:\n([\s\S]*?)(?=\nVerse:)/);
  const verseMatch = raw.match(/Verse:\n([\s\S]*?)$/);
  const instruction = instrMatch ? instrMatch[1].trim() : '';
  const caseText = caseMatch ? caseMatch[1].trim() : '';
  const verse = verseMatch ? verseMatch[1].trim() : '';
  return { instruction, caseText, verse };
}

const parsed = cases.map(c => ({
  num: c.num,
  ...parseCase(c.raw)
}));

console.log(`Parsed ${parsed.length} clean cases from text file.`);

// 4. Build lookup by case number
const cleanTexts = {};
for (const c of parsed) {
  cleanTexts[c.num] = c;
}

// 5. Read koans.json and replace shoyo_* texts
const rawJson = readFileSync(jsonFile, 'utf8');
const koans = JSON.parse(rawJson);

let replaced = 0;
let hadFffd = 0;
for (const k of koans) {
  if (!k.id.startsWith('shoyo_')) continue;
  const numStr = k.id.replace('shoyo_', '');
  const num = parseInt(numStr);
  if (!cleanTexts[num]) {
    console.warn(`⚠ No clean text for shoyo_${numStr}`);
    continue;
  }

  const before = (k.text.en.match(/\uFFFD/g) || []).length;
  if (before > 0) hadFffd += before;

  const ct = cleanTexts[num];
  // Combine instruction + case + verse into the en text
  k.text.en = [ct.instruction, ct.caseText, ct.verse]
    .filter(Boolean)
    .join('\n\n');

  const after = (k.text.en.match(/\uFFFD/g) || []).length;
  replaced++;
  console.log(`shoyo_${numStr}: FFFD ${before} → ${after}`);
}

// 6. Write back
writeFileSync(jsonFile, JSON.stringify(koans, null, 2) + '\n', 'utf8');

console.log(`\n✓ Replaced ${replaced} koan texts. Fixed ${hadFffd} corrupted characters.`);
console.log(`  Remaining FFFD in shoyo texts: ${(rawJson.match(/\uFFFD/g) || []).length}`);
