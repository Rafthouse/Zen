import { readFileSync, writeFileSync } from 'fs';

const raw = readFileSync('temp_shoyo.doc', 'utf8');

const clean = raw
  .replace(/\0/g, '')
  .replace(/\u0002/g, '')
  .replace(/\u000b/g, '\n')
  .replace(/\r/g, '\n')
  .replace(/\f/g, '\n\n');

// Real content starts at second CASE 1 (the one with Instruction)
const first = clean.indexOf('CASE 1:');
const realStart = clean.indexOf('CASE 1:', first + 1);
const realContent = clean.substring(realStart - 1);

// Split into case blocks
const blocks = realContent.split(/\n(?=CASE \d+:)/);

const koans = [];

for (const block of blocks) {
  const numMatch = block.match(/CASE (\d+):\s*(.*?)(?:\n|$)/);
  if (!numMatch) continue;
  const num = parseInt(numMatch[1]);
  let title = numMatch[2].trim();
  title = title.replace(/--See.*$/, '').trim().replace(/\u0002/g, '');

  let instruction = '', caseText = '', verse = '';
  const instM = block.match(/Instruction:\s*\n([\s\S]*?)(?=\n\n?Case:|\n\n\n|CASE \d+:|$)/);
  if (instM) instruction = instM[1].replace(/\u0002/g, '').trim();
  const caseM = block.match(/Case:\s*\n([\s\S]*?)(?=\n\n?Verse:|\n\n\n|CASE \d+:|$)/);
  if (caseM) caseText = caseM[1].replace(/\u0002/g, '').trim();
  const verseM = block.match(/Verse:\s*\n([\s\S]*?)(?=\n\n\n\n|CASE \d+:|$)/);
  if (verseM) verse = verseM[1].replace(/\u0002/g, '').trim();

  const parts = [instruction, caseText, verse].filter(Boolean);
  const text = parts.join('\n\n');
  if (!text || text.length < 10) continue;

  const w = guessWeather(text);
  const s = guessState(text);
  const f = guessFocus(text);
  const depth = text.length > 500 ? 'short' : 'line';

  koans.push({
    id: 'shoyo_' + String(num).padStart(2, '0'),
    title: { en: title },
    text: { en: text },
    author: 'Wanshi Shogaku (Hongzhi Zhengjue) / Wansong Xingxiu',
    source: 'Book of Equanimity / Shoyo-roku (1224), transl. Sanbo Kyodan Society',
    tradition: 'Soto Zen',
    originalLanguage: 'en',
    depth,
    weather: w,
    state: s,
    focus: f,
  });
}

function guessWeather(t) {
  const txt = t.toLowerCase();
  const r = [];
  if (/\b(cold|snow|ice|winter|frost|chill|freez)\b/.test(txt)) r.push('fog');
  if (/\b(wind|storm|rain|cloud|thunder|blow|lightning)\b/.test(txt)) r.push('wind');
  if (/\b(sun|light|bright|spring|warm|clear|day)\b/.test(txt)) r.push('clear');
  if (/\b(dark|night|shadow|dust|mud|gloom)\b/.test(txt)) r.push('storm');
  if (/\b(water|river|ocean|sea|lake|stream|rain|dew|wave|tide)\b/.test(txt)) r.push('rain');
  if (r.length === 0) r.push('clear');
  return [...new Set(r)].slice(0, 2);
}

function guessState(t) {
  const txt = t.toLowerCase();
  const r = [];
  if (/\b(search|seek|ask|question|wonder|inquire)\b/.test(txt)) r.push('searching');
  if (/\b(find|realiz|awaken|enlighten|underst|attain|see|know|aware)\b/.test(txt)) r.push('finding');
  if (/\b(doubt|suffer|pain|die|death|sick|struggl|difficult|hard|sad|grief)\b/.test(txt)) r.push('struggling');
  if (/\b(wait|silent|sit|still|patient|quiet|pause|rest)\b/.test(txt)) r.push('waiting');
  if (/\b(lose|miss|fail|fall|gone|empty|no|nothing|nothi)\b/.test(txt)) r.push('losing');
  if (r.length === 0) r.push('finding');
  return [...new Set(r)].slice(0, 2);
}

function guessFocus(t) {
  const txt = t.toLowerCase();
  const r = [];
  if (/\b(i|my|me|myself|mind|heart|self|one|inner)\b/.test(txt)) r.push('myself');
  if (/\b(monk|master|teacher|person|people|you|he|she|they|world|other|assembly)\b/.test(txt)) r.push('other');
  if (/\b(work|act|do|make|practice|action|effort|serve|help|use|way|dharma)\b/.test(txt)) r.push('work');
  if (/\b(future|time|life|beyond|birth|eternal|before|after|kalpa)\b/.test(txt)) r.push('future');
  if (/\b(past|old|ancient|memory|remember|former|once)\b/.test(txt)) r.push('past');
  if (r.length === 0) r.push('myself');
  return [...new Set(r)].slice(0, 2);
}

// Deduplicate by case number
const seen = new Set();
const unique = [];
koans.forEach(k => {
  const n = k.id.replace(/\D/g, '');
  if (!seen.has(n)) { seen.add(n); unique.push(k); }
});

writeFileSync('shoyo_koans.json', JSON.stringify(unique, null, 2) + '\n');
console.log('Unique koans:', unique.length);

let empty = 0;
unique.forEach(k => { if (!k.text.en || k.text.en.length < 10) { empty++; console.log('EMPTY:', k.id, k.title.en); }});
console.log('Empty:', empty);
