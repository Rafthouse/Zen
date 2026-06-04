import { writeFileSync, readFileSync, existsSync } from 'fs';

const cachePath = 'I:\\ZEN\\scripts\\polish_koans_cache.json';

export function loadCache() {
  if (existsSync(cachePath)) {
    try {
      return JSON.parse(readFileSync(cachePath, 'utf8'));
    } catch (e) {
      console.error('Cache corrupted, starting fresh:', e.message);
      return {};
    }
  }
  return {};
}

export function saveCache(cache) {
  writeFileSync(cachePath, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`Saved ${Object.keys(cache).length} entries to cache`);
}

export function addEntry(cache, num, url, plTitle, text) {
  cache[url] = {
    url,
    num,
    plTitle,
    text,
    textLength: text.length
  };
}
