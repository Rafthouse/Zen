/**
 * Fetch Japanese Mumonkan from shomonji.or.jp
 * Source: http://www.shomonji.or.jp/zazen/doc/mumonkan.html
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cacheFile = resolve(__dirname, 'japanese_mumonkan_cache.json');

async function main() {
  const resp = await fetch('http://www.shomonji.or.jp/zazen/doc/mumonkan.html', {
    signal: AbortSignal.timeout(15000)
  });
  const html = await resp.text();
  
  writeFileSync(resolve(__dirname, 'japanese_mumonkan_raw.html'), html, 'utf8');
  
  // The Japanese page has structure like:
  // 第一 趙州狗子
  // 第二 百丈野狐
  // etc.
  // Then under each: Chinese text (kanbun) and Japanese reading
  
  // The page is in EUC-JP encoding, we need to handle that
  // First, try to extract the koan titles and texts
  
  // Find the actual content
  // The page has numbered koans from 第一 to 第四十八
  
  const koans = [];
  
  // Find the table of contents with 第一 through 第四十八
  // Then find each koan's section
  
  // Pattern: <a name="...">第一 趙州狗子</a> ... content until next anchor
  const koanSectionRegex = /<a\s+name="[^"]*">(第[一二三四五六七八九十百]+)\s+(.+?)<\/a>([\s\S]*?)(?=<a\s+name="第|$)/g;
  
  const jpNums = {
    '一': 1, '二': 2, '三': 3, '四': 4, '五': 5,
    '六': 6, '七': 7, '八': 8, '九': 9, '十': 10,
    '十一': 11, '十二': 12, '十三': 13, '十四': 14, '十五': 15,
    '十六': 16, '十七': 17, '十八': 18, '十九': 19, '二十': 20,
    '二十一': 21, '二十二': 22, '二十三': 23, '二十四': 24, '二十五': 25,
    '二十六': 26, '二十七': 27, '二十八': 28, '二十九': 29, '三十': 30,
    '三十一': 31, '三十二': 32, '三十三': 33, '三十四': 34, '三十五': 35,
    '三十六': 36, '三十七': 37, '三十八': 38, '三十九': 39, '四十': 40,
    '四十一': 41, '四十二': 42, '四十三': 43, '四十四': 44, '四十五': 45,
    '四十六': 46, '四十七': 47, '四十八': 48,
  };
  
  let match;
  while ((match = koanSectionRegex.exec(html)) !== null) {
    const jpNum = match[1].replace('第', '');
    const num = jpNums[jpNum];
    if (!num) { console.log(`Unknown Japanese number: ${jpNum}`); continue; }
    
    const titleRaw = match[2].trim();
    let content = match[3]
      .replace(/<[^>]+>/g, '\n')
      .replace(/&nbsp;/g, ' ')
      .replace(/\n{3,}/g, '\n\n')
      .trim();
    
    // The title contains kanji for the koan name, e.g., "趙州狗子"
    // The content is kanbun (classical Chinese) with Japanese reading marks
    
    koans.push({ num, title: titleRaw, text: content, textLength: content.length });
    console.log(`#${num}: "${titleRaw}" (${content.length} chars)`);
  }
  
  console.log(`\nExtracted ${koans.length} koans`);
  
  const cache = {};
  for (const k of koans) cache[k.num] = k;
  cache._meta = {
    total: koans.length,
    source: 'http://www.shomonji.or.jp/zazen/doc/mumonkan.html',
    language: 'ja',
    note: 'Japanese kanbun with reading marks (kundoku)'
  };
  
  writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
}

main().catch(err => {
  console.error('FAILED:', err.message);
  // Try with different encoding - maybe the page needs EUC-JP decoding
});
