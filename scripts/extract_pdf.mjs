import { readFileSync, writeFileSync } from 'fs';

const raw = readFileSync('I:/ZEN/zen_stories_raw.pdf');
const s = raw.toString('latin1');

// Extract text between parentheses (PDF text operators)
const matches = [...s.matchAll(/\(([^)]{10,500}?)\)/g)];
let text = matches.map(m => {
  let t = m[1];
  // Unescape PDF escapes
  t = t.replace(/\\(.)/g, (_, c) => c === 'n' ? '\n' : c);
  return t;
}).join('\n\n');

// Keep only printable chars
text = text.replace(/[^\x20-\x7E\n\r\t]/g, '');
writeFileSync('I:/ZEN/zen_pdf_text.txt', text);
console.log('Extracted chars:', text.length);
