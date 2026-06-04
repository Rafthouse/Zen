/**
 * Parallel fetch of 71 remaining Polish koan pages.
 * Uses native fetch + Promise.all in batches of 10.
 */
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
const __dirname = dirname(fileURLToPath(import.meta.url));
const cacheFile = resolve(__dirname, 'polish_koans_cache.json');

const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf8')) : {};
const start = 31;

// Only fetch missing ones
const urls = [];
for (let i = start; i <= 101; i++) {
  const url = `https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-${i}.php`;
  if (!cache[url]) {
    urls.push({ num: i, url });
  }
}

console.log(`Need to fetch ${urls.length} URLs`);

async function fetchOne(num, url) {
  try {
    const resp = await fetch(url, { signal: AbortSignal.timeout(8000) });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const html = await resp.text();
    
    // Extract title from <title> or <h3>
    const titleMatch = html.match(/<h[23][^>]*>(.*?)<\/h[23]>/i) || html.match(/<title>(.*?)<\/title>/i);
    let plTitle = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, '').trim() : '';
    
    // Extract story paragraph(s)
    let text = '';
    const h3Match = html.match(/<h3[^>]*>(.*?)<\/h3>\s*([\s\S]*?)(?:<h[23]|<\/?div[^>]*class="[^"]*?social|####|DOŁĄCZ|https:\/\/przewodnikduchowy)/i);
    if (h3Match) {
      text = h3Match[2].replace(/<[^>]+>/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
    } else {
      // Fallback: grab everything in <article> or <main>
      const contentMatch = html.match(/<(?:article|main|div\s+class="[^"]*?(?:content|entry|article|story))[^>]*>([\s\S]*?)<\/(?:article|main|div)>/i);
      if (contentMatch) {
        text = contentMatch[1].replace(/<[^>]+>/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
      }
    }
    
    // Extract title from the h3 more precisely
    const h3Content = html.match(/<h3[^>]*>\s*([^<]+)\s*<\/h3>/i);
    if (h3Content) {
      plTitle = h3Content[1].trim();
    }
    
    // Remove the "101 opowieści zen" prefix from title if present
    plTitle = plTitle.replace(/^(?:101\s+)?opowieści\s+zen\s*[-–—]\s*/i, '').trim();
    
    // Remove footer junk from text
    const footerStarts = [
      'DOŁĄCZ DO MNIE', 'Ta strona została znaleziona',
      'https://przewodnikduchowy.pl', 'PS. Ta nazwa', '####'
    ];
    for (const marker of footerStarts) {
      const idx = text.indexOf(marker);
      if (idx > 0) text = text.substring(0, idx).trim();
    }
    
    const entry = { url, num, plTitle, text, textLength: text.length };
    cache[url] = entry;
    console.log(`✓ #${num} "${plTitle}" (${text.length} chars)`);
    return entry;
  } catch (err) {
    console.log(`✗ #${num} ERROR: ${err.message}`);
    return null;
  }
}

async function run() {
  const BATCH = 10;
  for (let i = 0; i < urls.length; i += BATCH) {
    const batch = urls.slice(i, i + BATCH);
    console.log(`\n--- Batch ${Math.floor(i/BATCH)+1}/${Math.ceil(urls.length/BATCH)} ---`);
    await Promise.all(batch.map(u => fetchOne(u.num, u.url)));
    
    // Save after each batch
    writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
    console.log(`Cache saved: ${Object.keys(cache).length} entries`);
    
    // Small delay between batches
    if (i + BATCH < urls.length) {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  
  console.log(`\n=== COMPLETE ===`);
  console.log(`Total cached: ${Object.keys(cache).length}`);
  
  // Count how many overall
  let ok = 0;
  for (let i = 1; i <= 101; i++) {
    const url = `https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-${i}.php`;
    if (cache[url] && cache[url].text) ok++;
  }
  console.log(`Fully fetched with text: ${ok}/101`);
}

run().catch(console.error);
