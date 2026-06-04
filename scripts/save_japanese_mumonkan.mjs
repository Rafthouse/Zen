import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const cacheFile = resolve(__dirname, 'japanese_mumonkan_cache.json');

// The web_fetch readability output was captured in the raw file.
// Let me parse it from the raw HTML (which has readability-extracted markdown).
const raw = readFileSync(resolve(__dirname, 'japanese_mumonkan_raw.html'), 'utf8');

// The readability-output text appears in the HTML body as <p> tags with the 
// extracted content. Let me extract just the portion after "## 第一"
const firstIdx = raw.indexOf('## 第一');
const lastIdx = raw.indexOf('## 後序');

if (firstIdx < 0) {
  console.error('Could not find "## 第一" in the extracted text');
  process.exit(1);
}

const content = lastIdx > 0 ? raw.substring(firstIdx, lastIdx) : raw.substring(firstIdx);

// Split by koan headers: "## 第N　title"
const sections = content.split(/\n(?=## 第)/);

const numMap = {
  '一':1,'二':2,'三':3,'四':4,'五':5,'六':6,'七':7,'八':8,'九':9,'十':10,
  '十一':11,'十二':12,'十三':13,'十四':14,'十五':15,'十六':16,'十七':17,'十八':18,'十九':19,
  '二十':20,'二十一':21,'二十二':22,'二十三':23,'二十四':24,'二十五':25,
  '二十六':26,'二十七':27,'二十八':28,'二十九':29,'三十':30,
  '三十一':31,'三十二':32,'三十三':33,'三十四':34,'三十五':35,'三十六':36,'三十七':37,'三十八':38,'三十九':39,'四十':40,
  '四十一':41,'四十二':42,'四十三':43,'四十四':44,'四十五':45,'四十六':46,'四十七':47,'四十八':48
};

const koans = [];

for (const section of sections) {
  const trimmed = section.trim();
  if (!trimmed) continue;
  
  const m = trimmed.match(/##\s*(第[一二三四五六七八九十百]+)\s+(\S+)/);
  if (!m) continue;
  
  const jpNum = m[1].replace('第', '');
  const title = m[2].trim();
  const num = numMap[jpNum];
  if (!num) continue;
  
  const textStart = trimmed.indexOf('\n', m[0].length);
  let text = textStart > 0 ? trimmed.substring(textStart).trim() : '';
  text = text.replace(/\n{3,}/g, '\n\n').trim();
  
  koans.push({ num, title, text, textLength: text.length });
  console.log(`#${num}: "${title}" (${text.length} chars)`);
}

console.log(`\nExtracted ${koans.length} koans`);

const cache = {};
for (const k of koans) cache[k.num] = k;
cache._meta = {
  total: koans.length,
  source: 'http://www.shomonji.or.jp/zazen/doc/mumonkan.html',
  translator: 'Wumen Huikai (original Chinese) / Japanese kundoku reading',
  language: 'ja',
  note: 'Kanbun (classical Chinese) with Japanese reading marks'
};

writeFileSync(cacheFile, JSON.stringify(cache, null, 2), 'utf8');
console.log('Saved to:', cacheFile);
