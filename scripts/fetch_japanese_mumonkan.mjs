import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const RAW_HTML = path.join(__dirname, 'japanese_mumonkan_raw.html');
const OUT = path.join(__dirname, 'japanese_mumonkan_raw.json');

const html = fs.readFileSync(RAW_HTML, 'utf8');
console.log('HTML loaded:', html.length, 'bytes');

// Find all <h1> elements in the HTML (they contain case titles in the content section)
const h1Regex = /<h1[^>]*>([\s\S]*?)<\/h1>/g;
const h1Matches = [...html.matchAll(h1Regex)];
console.log('Total <h1> elements:', h1Matches.length);

// Filter to only the 48 case <h1>s (skip intro)
// Case <h1> contain: 第一　趙州狗子 etc.
const caseHeaders = h1Matches.filter(m => m[1].includes('第'));
console.log('Case <h1> elements:', caseHeaders.length);

// Now extract content after each case <h1> until the next <h1> (or postscript)
const results = {};
caseHeaders.forEach((match, i) => {
  const header = match[1].replace(/<[^>]+>/g, '').trim();
  const startIdx = match.index + match[0].length;
  
  // Find next <h1> or end of body
  const nextH1 = caseHeaders[i + 1];
  const h1End = nextH1 ? nextH1.index : html.indexOf('</body>');
  
  let section = html.slice(startIdx, h1End);

  // Find postscript and stop before it for the last case
  if (!nextH1) {
    const postIdx = section.indexOf('後序');
    if (postIdx > 0) section = section.slice(0, postIdx);
  }

  // Clean HTML
  section = section
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<a[^>]*>[\s\S]*?<\/a>/gi, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, c) => String.fromCharCode(c))
    .replace(/\s+/g, ' ')
    .trim();

  results[i + 1] = { text: section };
});

// Save
fs.writeFileSync(OUT, JSON.stringify(results, null, 2), 'utf8');

// Audit
const nonEmpty = Object.values(results).filter(v => v.text && v.text.trim().length > 0).length;
const empty = Object.values(results).filter(v => !v.text || v.text.trim().length === 0).length;

console.log('\n=== AUDIT ===');
console.log('  Total:', Object.keys(results).length);
console.log('  Non-empty:', nonEmpty);
console.log('  Empty:', empty);

// Samples
console.log('\n=== SAMPLES ===');
[1, 10, 25, 48].forEach(n => {
  const c = results[n];
  console.log(`\n--- Case ${n} ---`);
  if (c?.text) {
    console.log(c.text.slice(0, 500));
    if (c.text.length > 500) console.log('... (' + (c.text.length - 500) + ' more chars)');
  } else {
    console.log('(empty)');
  }
});
