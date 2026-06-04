import { readFileSync, writeFileSync, existsSync } from 'fs';

// Load our koans
const koans = JSON.parse(readFileSync('src/data/koans.json', 'utf8'));

// The 101 Zen Stories are the first 101 koans in the corpus
// Let's map English titles to Polish URLs
// Pattern: https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-NN.php

const polishSourceUrl = 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-';

// First let's see what we have
console.log('=== First 5 koans (English titles + slugs) ===');
for (let i = 0; i < 5; i++) {
  console.log(`#${i+1}: slug="${koans[i].slug}", title="${koans[i].title.en}"`);
}

// Check if we already have a cache
const cacheFile = 'scripts/polish_koans_cache.json';
const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf8')) : {};

console.log('\n=== Cached entries ===');
console.log(Object.keys(cache).length + ' cached URLs');

// Output the mapping we need
console.log('\n=== Mapping needed for first 101 koans ===');
for (let i = 0; i < Math.min(101, koans.length); i++) {
  const num = i + 1;
  const url = polishSourceUrl + num + '.php';
  const cached = cache[url];
  console.log(`#${num} "${koans[i].title.en}" → ${url} ${cached ? '(cached ✓)' : '(need fetch)'}`);
}
