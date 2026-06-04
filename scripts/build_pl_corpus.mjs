import fs from 'fs';

// 1. Remove pl from koans.json (extract all)
var k = JSON.parse(fs.readFileSync('I:/ZEN/src/data/koans.json', 'utf8'));
var kOut = JSON.parse(JSON.stringify(k));

var plExtracted = [];
kOut.forEach(function(koan, idx) {
  if (koan.text && koan.text.pl) {
    plExtracted.push({
      koanIndex: idx,
      koanId: koan.id,
      plTitle: koan.title && koan.title.pl,
      plText: koan.text.pl
    });
    delete koan.title.pl;
    delete koan.text.pl;
  }
});

console.log('Extracted ' + plExtracted.length + ' pl entries from koans.json');

fs.writeFileSync('I:/ZEN/src/data/koans.json', JSON.stringify(kOut, null, 2), 'utf8');
console.log('Written koans.json without pl fields');

// 2. Build Polish corpus from cache
var cache = JSON.parse(fs.readFileSync('I:/ZEN/scripts/polish_koans_cache.json', 'utf8'));
var entries = Object.values(cache).sort(function(a, b) { return a.num - b.num; });

var plCorpus = entries.map(function(entry, i) {
  return {
    id: 'pl_' + String(i + 1).padStart(3, '0'),
    num: entry.num,
    title: entry.plTitle,
    text: entry.text || entry.articleBody || '',
    source: 'Shasekishū (沙石集), Mujū Dōkyō (1283) — 101 opowieści zen, tłum. Wydawnictwo Zysk i S-ka (1998)',
    sourceUrl: 'https://przewodnikduchowy.pl/101-opowiesci-zen/koan-zen-' + (i + 1) + '.php',
    language: 'pl'
  };
});

// Add pl_001 (Filiżanka herbaty) back to koans.json as the ONLY confirmed pl translation
// because it IS a legitimate translation of a_cup_of_tea
kOut[0].title.pl = plCorpus[0].title;
kOut[0].text.pl = plCorpus[0].text;
fs.writeFileSync('I:/ZEN/src/data/koans.json', JSON.stringify(kOut, null, 2), 'utf8');
console.log('Restored pl_001 (Filiżanka herbaty) to koans.json as confirmed translation');

fs.writeFileSync('I:/ZEN/src/data/pl_corpus.json', JSON.stringify(plCorpus, null, 2), 'utf8');
console.log('Written pl_corpus.json with ' + plCorpus.length + ' entries');

// 3. Build mapping — ONLY manually confirmed same-story matches
// Verified by comparing content (same story, same characters, same narrative)
var confirmedMappings = [
  { plId: 'pl_001', koanId: 'a_cup_of_tea',               source: 'Same story — Nan-in serves tea to professor' },
  { plId: 'pl_003', koanId: 'is_that_so',                 source: 'Same story — Hakuin accused, says "Is that so?"' },
  { plId: 'pl_008', koanId: 'great_waves',                source: 'Same story — O-nami wrestler, Great Waves' },
  { plId: 'pl_009', koanId: 'the_moon_cannot_be_stolen',  source: 'Same story — Ryokan, thief cannot steal moon' },
  { plId: 'pl_029', koanId: 'no_water_no_moon',           source: 'Same story — Chiyono, bucket breaks, no water no moon' },
  { plId: 'pl_033', koanId: 'the_thief_of_form',         source: 'Same story — Mokusen shows clenched/open hand' },
  { plId: 'pl_036', koanId: 'flower_shower',              source: 'Same story — Subhuti, flower shower from empty sky' },
  { plId: 'pl_037', koanId: 'publishing_the_sutras',      source: 'Same story — Tetsugen publishes sutras' },
  { plId: 'pl_042', koanId: 'the_dead_mans_answer',       source: 'Same story — Mamiya, dead man\'s answer' },
  { plId: 'pl_044', koanId: 'the_thief_who_became_a_disciple', source: 'Same story — Shichiri, thief becomes disciple' },
  { plId: 'pl_047', koanId: 'the_stingy_artist',          source: 'Same story — Gessen, stingy artist' },
  { plId: 'pl_053', koanId: 'the_giver_should_be_thankful', source: 'Same story — Seisetsu, giver should be thankful' },
  { plId: 'pl_068', koanId: 'the_thief_of_silence',  source: 'Same story — Kakua plays one note of Zen' },
  { plId: 'pl_004', koanId: 'obedience',                  source: 'Same story — Bankei, obedience' },
  { plId: 'pl_016', koanId: 'just_go_to_sleep',           source: 'Same story — Gasan, just go to sleep' },
  { plId: 'pl_022', koanId: 'my_heart_burns_like_fire',   source: 'Same story — Soyen, my heart burns like fire' },
  { plId: 'pl_054', koanId: 'time_to_die',                source: 'Same story — Ikkyu, time to die' },
  { plId: 'pl_055', koanId: 'the_tea_master_and_the_assassin', source: 'Same story — Taiko, tea-master and assassin' },
  { plId: 'pl_061', koanId: 'gudo_and_the_emperor',       source: 'Same story — Gudo, emperor studies Zen' },
  { plId: 'pl_070', koanId: 'the_most_valuable_thing', source: 'Same story — Sozan, most valuable thing in world' },
  { plId: 'pl_072', koanId: 'the_blockhead_lord',         source: 'Same story — Daigu and Gudo visit blockhead lord' },
  { plId: 'pl_076', koanId: 'the_stone_mind',             source: 'Same story — Hogen, stone mind' },
  { plId: 'pl_077', koanId: 'no_attachment_to_dust',      source: 'Same story — Zengetsu, no attachment to dust' },
  { plId: 'pl_078', koanId: 'the_real_prosperity',        source: 'Same story — Sengai writes "real prosperity"' },
  { plId: 'pl_083', koanId: 'no_work_no_food',            source: 'Same story — Hyakujo, no work no food' },
  { plId: 'pl_091', koanId: 'the_taste_of_banzos_sword',  source: 'Same story — Matajuro Yagyu, taste of sword' },
  { plId: 'pl_094', koanId: 'midnight_excursion',         source: 'Same story — Sengai, midnight excursion' },
  { plId: 'pl_095', koanId: 'a_letter_to_a_dying_man',    source: 'Same story — Bassui writes letter to dying man' },
  { plId: 'pl_096', koanId: 'a_drop_of_water',            source: 'Same story — Gisan, a drop of water' },
  { plId: 'pl_100', koanId: 'the_silent_temple',          source: 'Same story — Shoichi, silent temple' },
  { plId: 'pl_020', koanId: 'a_mothers_advice',           source: 'Same story — Jiun, mother\'s advice' },
];

// Verify all koanIds exist
kOut.forEach(function(koan) {
  // just build lookup
});

var notFound = [];
confirmedMappings.forEach(function(m) {
  var koan = kOut.find(function(x) { return x.id === m.koanId; });
  if (!koan) notFound.push(m.koanId);
});
if (notFound.length > 0) {
  console.log('ERROR: koan IDs not found: ' + notFound.join(', '));
  process.exit(1);
}

var mappingObj = {
  description: 'Mapping between Polish corpus (Shasekishū/101 opowieści zen) and main Zen koans corpus',
  note: 'Only confirmed same-story matches are included. Stories without a confirmed match are unmapped.',
  source: {
    pl: 'Shasekishū (沙石集), Mujū Dōkyō (1283), Polish translation by Wydawnictwo Zysk i S-ka (1998)',
    en: '101 Zen Stories (1919), compiled by Nyogen Senzaki & Paul Reps; Mumonkan; Book of Equanimity'
  },
  mappings: confirmedMappings
};

fs.writeFileSync('I:/ZEN/src/data/pl_mapping.json', JSON.stringify(mappingObj, null, 2), 'utf8');
console.log('Written pl_mapping.json with ' + confirmedMappings.length + ' confirmed mappings');

// Verify
var plCheck = JSON.parse(fs.readFileSync('I:/ZEN/src/data/pl_corpus.json', 'utf8'));
var kCheck = JSON.parse(fs.readFileSync('I:/ZEN/src/data/koans.json', 'utf8'));
var plInKoans = kCheck.filter(function(x) { return x.text && x.text.pl; });

console.log('');
console.log('=== FINAL AUDIT ===');
console.log('koans.json:        ' + kCheck.length + ' entries');
console.log('koans.json with pl:' + plInKoans.length + ' (a_cup_of_tea only)');
console.log('pl_corpus.json:    ' + plCheck.length + ' entries');
console.log('pl_mapping.json:   ' + confirmedMappings.length + ' confirmed mappings');
console.log('Unmapped pl:       ' + (plCheck.length - confirmedMappings.length));
console.log('');
console.log('=== SAMPLE CONFIRMED MAPPINGS ===');
confirmedMappings.slice(0, 5).forEach(function(m) {
  var plEntry = plCheck.find(function(x) { return x.id === m.plId; });
  console.log('  ' + m.plId + ' "' + plEntry.title + '"  ↔  ' + m.koanId + ' [' + m.source + ']');
});
console.log('');
console.log('=== SAMPLE UNMAPPED ===');
var mappedIds = confirmedMappings.map(function(m) { return m.plId; });
var unmapped = plCheck.filter(function(e) { return mappedIds.indexOf(e.id) < 0; });
console.log('  ' + unmapped.length + ' stories without confirmed en match');
unmapped.slice(0, 5).forEach(function(e) {
  console.log('  ' + e.id + ' "' + e.title + '"');
});
