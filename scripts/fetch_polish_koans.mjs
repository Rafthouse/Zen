/**
 * Batch fetch Polish koans from przewodnikduchowy.pl
 * 
 * Usage: node scripts/fetch_polish_koans.mjs
 * 
 * This fetches all 101 pages, extracts the title and story text,
 * and saves them to scripts/polish_koans_cache.json
 * 
 * Metadata:
 *   source_type: "human_translation"
 *   translator: "Wydawnictwo Zysk i S-ka (1998) / przewodnikduchowy.pl"
 *   source_reference: "Shasekishū (沙石集), Mujū Dōkyō (1283) — 101 opowieści zen"
 *   language: "pl"
 */

import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const CACHE_FILE = resolve(__dirname, 'polish_koans_cache.json');
const KOANS_FILE = resolve(__dirname, '..', 'src', 'data', 'koans.json');

const { readFileSync, writeFileSync, existsSync } = await import('fs');

// Load cache if exists
const cache = existsSync(CACHE_FILE)
  ? JSON.parse(readFileSync(CACHE_FILE, 'utf8'))
  : {};

const koans = JSON.parse(readFileSync(KOANS_FILE, 'utf8'));

// URLs to fetch (1-101)
const urls = [];
for (let i = 1; i <= Math.min(101, koans.length); i++) {
  urls.push({
    num: i,
    url: `https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-${i}.php`,
    slug: koans[i-1]?.slug || `koan-${i}`,
    enTitle: koans[i-1]?.title?.en || ''
  });
}

// Extract story text from HTML
function extractStory(text) {
  // The text comes from readability extraction
  // Find the h3 title and the paragraph(s) that follow
  const lines = text.split('\n');
  const storyLines = [];
  let inStory = false;
  
  for (const line of lines) {
    const trimmed = line.trim();
    
    // Skip the "DOŁĄCZ DO MNIE" footer
    if (trimmed.includes('DOŁĄCZ DO MNIE') || trimmed.includes('Bądź na bieżąco')) {
      break;
    }
    
    // Skip navigation links
    if (trimmed.startsWith('https://') || trimmed.startsWith('Ta strona')) {
      break;
    }
    
    // Skip the # 101 opowieści zen header and ### title
    if (trimmed.startsWith('#') && (trimmed.includes('101 opowieści') || trimmed.includes('###'))) {
      // Extract the h3 as Polish title
      if (trimmed.includes('###')) {
        const title = trimmed.replace(/^###\s*/, '').trim();
        if (title) {
          storyLines.unshift(`TITLE: ${title}`);
        }
      }
      continue;
    }
    
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('//')) {
      storyLines.push(trimmed);
    }
  }
  
  return storyLines;
}

console.log(`Cache has ${Object.keys(cache).length} entries. Need to fetch ${urls.length} URLs.`);
console.log('');

// We can't make HTTP requests from this script directly
// So we output the URLs we need fetched via web_fetch tool
// and save results back to cache

// For now, let's check what's already in cache
let missing = 0;
for (const item of urls) {
  if (cache[item.url]) {
    const c = cache[item.url];
    console.log(`✓ #${item.num} ${item.enTitle} → "${c.plTitle}" (${c.textLength} chars)`);
  } else {
    missing++;
    console.log(`✗ #${item.num} ${item.enTitle} → ${item.url}`);
  }
}

console.log(`\n=== ${missing} URLs need fetching ===`);

// Output the list of URLs to fetch
if (missing > 0) {
  console.log('\n=== URLs TO FETCH ===');
  for (const item of urls) {
    if (!cache[item.url]) {
      console.log(item.url);
    }
  }
}
