/**
 * Fetch the complete French Mumonkan from ORAEDES.
 * Source: http://www.oraedes.fr/Medias/Barriere-sans-porte
 * Translator: Jacques Prestreau
 * 
 * The page has 48 koans (case 1-48), numbered by "### N. Title"
 * We extract them all and save to a cache.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cacheFile = resolve(__dirname, 'french_mumonkan_cache.json');

async function main() {
  const resp = await fetch('http://www.oraedes.fr/Medias/Barriere-sans-porte', {
    signal: AbortSignal.timeout(15000)
  });
  const html = await resp.text();
  
  // Save raw HTML for parsing
  writeFileSync(resolve(__dirname, 'french_mumonkan_raw.html'), html, 'utf8');
  
  // Extract the koans from the HTML
  // HTML structure: <section id="C1">...<h3><span id="GrasR">1.</span> Title</h3>\n<p>...</p>...</section>
  const koans = [];
  // Pattern: <section data-pagefind-weight="1"><cache id="C1"><h3><span id="GrasR">N.</span> Title</h3>...text...</cache></section>
  const koanRegex = /<section[^>]*>\s*<cache[^>]*>\s*<h3[^>]*>\s*<span[^>]*>(\d+)\.?\s*<\/span>\s*([^<]+)<\/h3>([\s\S]*?)(?=<\/cache>)/gi;
  
  let match;
  while ((match = koanRegex.exec(html)) !== null) {
    const num = parseInt(match[1]);
    const title = match[2].trim();
    let rawText = match[3];
    
    // Extract text content inside the section (between <p> tags)
    let text = rawText
      .replace(/<br\s*\/?>/gi, '\n')
      .replace(/<\/?p[^>]*>/gi, '\n')
      .replace(/<[^>]+>/g, '')
      .replace(/&[^;]+;/g, m => {
        const entities = { '&amp;':'\u0026','&lt;':'\u003C','&gt;':'\u003E','&quot;':'\u0022','&#39;':'\u0027','&nbsp;':' ' };
        return entities[m] || m;
      })
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // Remove any footnotes
    const fnIdx = text.search(/\n\n\d+\.\s/);
    if (fnIdx > 0) {
      text = text.substring(0, fnIdx);
    }
    
    // Remove "☩ Texte et traduction" section if present
    const translationIdx = text.indexOf('☩');
    if (translationIdx > 0) {
      text = text.substring(0, translationIdx);
    }
    
    // Remove footer navigation
    const navIdx = text.search(/\n(?:TOP|Menu|HOME|NEXT)/);
    if (navIdx > 0) text = text.substring(0, navIdx).trim();
    
    text = text.trim();
    
    koans.push({ num, title, text, textLength: text.length });
    console.log(`#${num}: "${title}" (${text.length} chars)`);
  }
  
  console.log(`\nExtracted ${koans.length} koans`);
  
  // Save cache
  const cache = {};
  for (const k of koans) {
    cache[k.num] = k;
  }
  cache._meta = {
    total: koans.length,
    source: 'http://www.oraedes.fr/Medias/Barriere-sans-porte',
    translator: 'Jacques Prestreau',
    language: 'fr',
    license: 'public domain (personal website)'
  };
  
  writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
  console.log('\nCache saved to:', cacheFile);
}

main().catch(err => {
  console.error('FAILED:', err.message);
  process.exit(1);
});
