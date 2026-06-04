import { readFileSync, writeFileSync } from 'fs';

const text = readFileSync('I:/ZEN/mumonkan_raw.txt', 'utf8').replace(/\r\n/g, '\n');

// Read existing koans
const existing = JSON.parse(readFileSync('I:/ZEN/src/data/koans.json', 'utf8'));
const existingIds = new Set(existing.map(k => k.id));
const existingSources = new Set(existing.map(k => k.source));

// Split by case numbers
const blocks = text.split(/\n\n(?=\d+\. )/);
const newKoans = [];
let skipCount = 0;

for (const block of blocks) {
  const match = block.match(/^(\d+)\.\s+(.+?)$/m);
  if (!match) continue;
  
  const num = parseInt(match[1]);
  const title = match[2].trim();
  const body = block.replace(/^\d+\.\s+.+?$/m, '').trim();
  
  // Extract just the koan anecdote (skip Mumon's comment)
  let mainText = body;
  const commentIdx = mainText.indexOf('Mumon\'s comment:');
  if (commentIdx > 0) mainText = mainText.substring(0, commentIdx).trim();
  mainText = mainText.replace(/^\\s*\\n/, '');
  
  // Generate ID from title
  const id = title.toLowerCase()
    .replace(/['']/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_|_$/g, '');

  // Determine if this is already in existing koans by checking source
  const sourceStr = `The Gateless Gate (Mumonkan), Case ${num} — Mumon Ekai, 1228 — transcribed by Nyogen Senzaki & Paul Reps, 1934 (public domain)`;
  
  // Check if we already have this case
  const alreadyExists = [...existing].some(k => 
    k.source.includes('Mumonkan') && k.title?.en?.toLowerCase().startsWith(title.toLowerCase().slice(0, 10))
  );

  if (alreadyExists) {
    skipCount++;
    continue;
  }

  // Determine tags based on content
  const weathers = determineWeather(title, mainText);
  const states = determineState(title, mainText);
  const focuses = determineFocus(title, mainText);
  const depth = mainText.length > 500 ? 'short' : mainText.length > 200 ? 'short' : 'line';
  const author = extractAuthor(title, mainText);
  const tradition = 'Chan / Zen';

  const entry = {
    id,
    title: { en: title },
    text: { en: mainText },
    author,
    source: sourceStr,
    tradition,
    originalLanguage: 'en',
    depth,
    weather: weathers,
    state: states,
    focus: focuses
  };

  newKoans.push(entry);
}

function determineWeather(title, text) {
  // Keywords-based matching
  const combined = (title + ' ' + text).toLowerCase();
  const weathers = [];
  if (/\b(fox|moon|night|dark)\b/.test(combined)) weathers.push('fog');
  if (/\b(rain|river|water|wash|tea|cup)\b/.test(combined)) weathers.push('rain');
  if (/\b(wind|mountain|tree|pole|flag)\b/.test(combined)) weathers.push('wind');
  if (/\b(sun|light|enlighten|clear|flower|garden)\b/.test(combined)) weathers.push('clear');
  if (/\b(storm|cut|kill|blow|death|die|sword)\b/.test(combined)) weathers.push('storm');
  if (weathers.length === 0) weathers.push('fog');
  return [...new Set(weathers)].slice(0, 2);
}

function determineState(title, text) {
  const combined = (title + ' ' + text).toLowerCase();
  const states = [];
  if (/\b(ask|quest|monk asked|seeking|search|seek|find)\b/.test(combined)) states.push('searching');
  if (/\b(wait|silent|meditat|sat|no answer|reflect)\b/.test(combined)) states.push('waiting');
  if (/\b(fight|argue|struggl|doubt|problem|difficult|suffer)\b/.test(combined)) states.push('struggling');
  if (/\b(lose|lost|fail|miss|mistake|error)\b/.test(combined)) states.push('losing');
  if (/\b(enlight|awake|realiz|understand|attain|attained|discover)\b/.test(combined)) states.push('finding');
  if (states.length === 0) states.push('searching');
  return [...new Set(states)].slice(0, 2);
}

function determineFocus(title, text) {
  const combined = (title + ' ' + text).toLowerCase();
  const focuses = [];
  if (/\b(myself|self|own|ego|i |me |my |mind|heart|body|man\b)\b/.test(combined)) focuses.push('myself');
  if (/\b(monk|master|teacher|disciple|attendant|josh|nansen|buddha|someone|him|her|they)\b/.test(combined)) focuses.push('other');
  if (/\b(work|teach|preach|lecture|lesson|task|duty|bowl|robe|bell)\b/.test(combined)) focuses.push('work');
  if (/\b(future|will|going to|shall|hereafter|next|becoming)\b/.test(combined)) focuses.push('future');
  if (/\b(past|before|former|old|ago|previous|history|ancest)\b/.test(combined)) focuses.push('past');
  if (focuses.length === 0) focuses.push('myself');
  return [...new Set(focuses)].slice(0, 2);
}

function extractAuthor(title, text) {
  // Try to find the main protagonist
  const lines = text.split('\n');
  const firstLine = lines[0];
  const nameMatch = firstLine.match(/^(\\w+)\s/);
  if (nameMatch) return nameMatch[1];
  
  // Common masters
  const masters = ['Joshu', 'Hyakujo', 'Gutei', 'Wakuan', 'Kyogen', 'Maha-Kashapa',
    'Seijo', 'Seizei', 'Tozan', 'Ummon', 'Nansen', 'Tokusan', 'Zuigan', 'Getsuan',
    'Mumon', 'Buddha', 'Bodhidharma', 'Chu', 'Ganto', 'Seppo', 'Obaku', 'Sozan',
    'Keichu', 'Kokushi', 'Basho', 'Shuzan', 'Isan', 'Ryutan', 'Baso', 'Fuketsu',
    'Kyozan', 'Kasho', 'Eno', 'Goso', 'Kempo', 'Tosotsu', 'Hoen', 'Sekiso',
    'Shogen', 'Mokyo', 'Anwan', 'Daitsu', 'Hakuin'];
  for (const m of masters) {
    if (text.includes(m) || title.includes(m)) return m;
  }
  return 'Mumon Ekai';
}

console.log(`Існуючих коанів: ${existing.length}`);
console.log(`Пропущено (вже є): ${skipCount}`);
console.log(`Нових Mumonkan кейсів: ${newKoans.length}`);

// Add to existing
const updated = [...existing, ...newKoans];
writeFileSync('I:/ZEN/src/data/koans.json', JSON.stringify(updated, null, 2) + '\n');
console.log(`Поновлений корпус: ${updated.length} коанів`);
console.log('Файл збережено!');
