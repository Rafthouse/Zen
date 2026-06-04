#!/usr/bin/env node
/**
 * Standalone validator for src/data/koans.json.
 *
 * Run with: npm run validate:koans
 *
 * It checks the corpus against the schema documented in src/data/SCHEMA.md:
 * required fields, enum membership for every tag, a mandatory English string in
 * each LocalizedText, and unique ids. It exits non-zero on any error, so it can
 * gate CI. Zero runtime dependencies — plain Node + the JSON file.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const file = resolve(here, '../src/data/koans.json');

const LANGS = ['uk', 'en', 'fr', 'ja', 'pl'];
const WEATHERS = ['fog', 'rain', 'wind', 'clear', 'storm'];
const STATES = ['searching', 'waiting', 'struggling', 'losing', 'finding'];
const FOCUSES = ['myself', 'other', 'work', 'future', 'past'];
const DEPTHS = ['line', 'short', 'koan'];

const errors = [];
const warnings = [];

/** @returns true if `value` is a LocalizedText with a non-empty English string. */
function checkLocalized(value, path) {
  if (!value || typeof value !== 'object') {
    errors.push(`${path}: must be an object of language → string`);
    return;
  }
  if (typeof value.en !== 'string' || value.en.trim() === '') {
    errors.push(`${path}.en: required non-empty English string`);
  }
  for (const [code, text] of Object.entries(value)) {
    if (!LANGS.includes(code)) errors.push(`${path}.${code}: unknown language code`);
    if (typeof text !== 'string') errors.push(`${path}.${code}: must be a string`);
  }
}

function checkEnumArray(value, allowed, path) {
  if (!Array.isArray(value) || value.length === 0) {
    errors.push(`${path}: must be a non-empty array`);
    return;
  }
  for (const v of value) {
    if (!allowed.includes(v)) errors.push(`${path}: "${v}" is not one of ${allowed.join(', ')}`);
  }
}

let raw;
try {
  raw = JSON.parse(readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`✗ Could not parse koans.json: ${e.message}`);
  process.exit(1);
}

if (!Array.isArray(raw)) {
  console.error('✗ koans.json must be a JSON array');
  process.exit(1);
}

const ids = new Set();
const langCoverage = Object.fromEntries(LANGS.map((l) => [l, 0]));

raw.forEach((k, i) => {
  const at = `koans[${i}]${k && k.id ? ` (${k.id})` : ''}`;

  if (typeof k.id !== 'string' || k.id.trim() === '') errors.push(`${at}.id: required string`);
  else if (ids.has(k.id)) errors.push(`${at}.id: duplicate id "${k.id}"`);
  else ids.add(k.id);

  checkLocalized(k.title, `${at}.title`);
  checkLocalized(k.text, `${at}.text`);

  if (typeof k.author !== 'string' || k.author.trim() === '') errors.push(`${at}.author: required`);
  if (typeof k.source !== 'string' || k.source.trim() === '') errors.push(`${at}.source: required`);
  if (k.tradition !== undefined && typeof k.tradition !== 'string') errors.push(`${at}.tradition: must be a string`);

  if (!LANGS.includes(k.originalLanguage)) errors.push(`${at}.originalLanguage: must be one of ${LANGS.join(', ')}`);
  if (k.originalText !== undefined && typeof k.originalText !== 'string') errors.push(`${at}.originalText: must be a string`);

  if (!DEPTHS.includes(k.depth)) errors.push(`${at}.depth: must be one of ${DEPTHS.join(', ')}`);
  checkEnumArray(k.weather, WEATHERS, `${at}.weather`);
  checkEnumArray(k.state, STATES, `${at}.state`);
  checkEnumArray(k.focus, FOCUSES, `${at}.focus`);

  // Coverage stats (non-fatal): how many koans carry each language.
  if (k.text && typeof k.text === 'object') {
    for (const l of LANGS) if (typeof k.text[l] === 'string') langCoverage[l] += 1;
  }
});

if (raw.length < 100) {
  warnings.push(`corpus has ${raw.length} entries; the brief asks for at least 100.`);
}

// ---- report ----
console.log(`Checked ${raw.length} koans.`);
console.log(
  'Translation coverage (text): ' +
    LANGS.map((l) => `${l} ${langCoverage[l]}/${raw.length}`).join('  ·  '),
);

for (const w of warnings) console.warn(`⚠ ${w}`);

if (errors.length) {
  console.error(`\n✗ ${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log('✓ koans.json is valid.');
