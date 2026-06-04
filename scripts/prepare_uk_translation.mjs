import fs from 'fs';

// Read the batch
var batch = JSON.parse(fs.readFileSync('scripts/uk_batch.json', 'utf8'));
var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

/**
 * Український перекладач дзен-коанів.
 * 
 * Стиль: літературна українська, лаконічна, з відчуттям дзен-тексту.
 * Не канцелярит, не буквальний переклад — передавати суть і настрій.
 * Заголовки: короткі, природні, часто один-два слова.
 * Тексти: зберігати структуру (діалоги, абзаци), уникати кальок.
 * 
 * Для імен: залишати в оригіналі (Bankei, Hakuin, Joshu тощо),
 * але в тексті додавати українські закінчення де доречно.
 * 
 * Назви шкіл: "Zen" → "дзен", "Buddha" → "Будда", "Master" → "Майстер"
 */
var TRANSLATIONS = {
  // ID: { title_uk: "...", text_uk: "..." }
};

// Manual translations for names that should be consistent
var NAME_UK = {
  "Bankei": "Банкей",
  "Hakuin": "Хакуін",
  "Joshu": "Дзьосю",
  "Nansen": "Нансен",
  "Mokugen": "Мокудзен",
  "Ryokan": "Рьокан",
  "Banzan": "Бандзан",
  "Gudo": "Ґудо",
  "Tokuo": "Токуо",
  "Shichiri": "Шічірі",
  "Yamaoka Tesshu": "Ямаока Тессю",
  "Tesshu": "Тессю",
  "Shibata": "Шібата",
  "Kufu": "Куфу",
  "Bokuju": "Бокудзю",
  "Mokusen": "Мокусен",
  "Soyen Shaku": "Соєн Шаку",
  "Dokuon": "Докуон",
  "Tetsugen": "Тецуґен",
  "Tetsumon": "Тецумон",
  "Gisho": "Ґішо",
  "Soshun": "Сошун"
};

// We'll use a spawn sub-agent approach: split the 277 koans into chunks
// and translate each chunk in parallel
var CHUNK_SIZE = 35;
var chunks = [];
for (var i = 0; i < batch.length; i += CHUNK_SIZE) {
  chunks.push(batch.slice(i, i + CHUNK_SIZE));
}

console.log('Total to translate:', batch.length);
console.log('Chunks:', chunks.length, 'of ~' + CHUNK_SIZE + ' each');

// Save chunk files for sub-agents
fs.mkdirSync('scripts/uk_chunks', { recursive: true });

chunks.forEach(function(chunk, ci) {
  var prompt = 'Ти — літературний перекладач дзен-текстів з англійської на українську.\n\n';
  prompt += 'Твоє завдання: перекласти заголовок (title) і текст (text) ' + chunk.length + ' дзен-коанів.\n\n';
  prompt += 'СТИЛЬ: літературна українська, лаконічна, поетична. Не буквально — передавай суть і настрій.\n';
  prompt += 'Заголовки: короткі, природні. Імена майстрів: залишай в оригіналі (Joshu, Bankei, Hakuin etc.), але пиши їх кирилицею де впізнавано.\n';
  prompt += 'Терміни: Zen → дзен, Buddha → Будда, Master → Майстер, monk → монах, disciple → учень.\n\n';
  
  chunk.forEach(function(koan, ki) {
    prompt += '--- КОАН ' + (ci * CHUNK_SIZE + ki + 1) + ' ---\n';
    prompt += 'id: ' + koan.id + '\n';
    prompt += 'title: ' + koan.enTitle + '\n';
    prompt += 'text:\n' + koan.enText + '\n';
  });
  
  prompt += '\n\nВІДПОВІДЬ — ТІЛЬКИ JSON. Без пояснень, без вступу. Формат:\n';
  prompt += '{"translations": [\n';
  prompt += '  {"id": "koan_id", "title_uk": "...", "text_uk": "..."},\n';
  prompt += '  ...\n';
  prompt += ']}\n';
  
  fs.writeFileSync('scripts/uk_chunks/chunk_' + ci + '.txt', prompt, 'utf8');
});

console.log('Chunk prompts saved to scripts/uk_chunks/');

// Create a merge script
var mergeScript = 'import fs from "fs";\n';
mergeScript += 'var k = JSON.parse(fs.readFileSync("src/data/koans.json","utf8"));\n';
mergeScript += 'var results = [];\n';

var fname = function(ci) {
  return 'chunk_result_' + ci;
};

for (var ci = 0; ci < chunks.length; ci++) {
  mergeScript += 'results = results.concat(JSON.parse(fs.readFileSync("scripts/uk_chunks/' + fname(ci) + '.json","utf8")).translations);\n';
}

mergeScript += '\nvar merged = 0;\n';
mergeScript += 'results.forEach(function(r){\n';
mergeScript += '  var idx = k.findIndex(function(x){return (x.id||x.slug) === r.id;});\n';
mergeScript += '  if (idx >= 0) {\n';
mergeScript += '    if (!k[idx].title) k[idx].title = {};\n';
mergeScript += '    if (!k[idx].text) k[idx].text = {};\n';
mergeScript += '    k[idx].title.uk = r.title_uk;\n';
mergeScript += '    k[idx].text.uk = r.text_uk;\n';
mergeScript += '    merged++;\n';
mergeScript += '  }\n';
mergeScript += '});\n';
mergeScript += '\nconsole.log("Merged:", merged);\n';
mergeScript += 'var st=k.filter(function(x){return x.text&&typeof x.text.uk==="string"&&x.text.uk.length>0}).length;\n';
mergeScript += 'console.log("Total uk:", st, "/", k.length);\n';
mergeScript += 'fs.writeFileSync("src/data/koans.json", JSON.stringify(k, null, 2), "utf8");\n';

fs.writeFileSync('scripts/uk_chunks/merge_all.mjs', mergeScript, 'utf8');

console.log('Merge script created');
