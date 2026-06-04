import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// Agent results with correct id→koan mapping:
// The agents received koans in a specific order.
// I need to map each result to the correct koan in the file.

// The IDs used in agent results don't always match the id/slug in koans.json.
// Let's build a map: for each koan in agent result, find the right koan in our file.

// Strategy 1: direct match by id ↑
// Strategy 2: match by English title (from our koans.json title.en)
// Strategy 3: match by position/order

// First, load the result files properly using a safer approach
// Let me manually extract the data from agent A using a simpler method

// Agent A had these koans in order (42 koans covering index 10-51 in koans.json):
var orderMap = [
  {agentId: 'obedience', expectedIdx: 10, enTitle: 'Obedience'},
  {agentId: 'the_strawberry', expectedIdx: 11, enTitle: 'A Parable'},
  {agentId: 'the_first_principle', expectedIdx: 12, enTitle: 'The First Principle'},
  {agentId: 'the_thief_who_became_a_disciple', expectedIdx: 13, enTitle: 'The Thief Who Became a Disciple'},
  {agentId: 'the_tunnel', expectedIdx: 14, enTitle: 'The Tunnel'},
  {agentId: 'no_work_no_food', expectedIdx: 15, enTitle: 'No Work, No Food'},
  {agentId: 'the_real_miracle', expectedIdx: 16, enTitle: 'The Real Miracle'},
  {agentId: 'just_go_to_sleep', expectedIdx: 17, enTitle: 'Just Go to Sleep'},
  {agentId: 'the_giver_should_be_thankful', expectedIdx: 18, enTitle: 'The Giver Should Be Thankful'},
  {agentId: 'everything_is_best', expectedIdx: 19, enTitle: 'Everything Is Best'},
  {agentId: 'the_stone_mind', expectedIdx: 20, enTitle: 'The Stone Mind'},
  {agentId: 'open_your_own_treasure_house', expectedIdx: 21, enTitle: 'Open Your Own Treasure House'},
  {agentId: 'the_voice_of_happiness', expectedIdx: 22, enTitle: 'The Voice of Happiness'},
  {agentId: 'eating_the_blame', expectedIdx: 23, enTitle: 'Eating the Blame'},
  {agentId: 'the_most_valuable_thing', expectedIdx: 24, enTitle: 'The Most Valuable Thing'},
  {agentId: 'right_and_wrong', expectedIdx: 25, enTitle: 'Right and Wrong'},
  {agentId: 'the_stingy_artist', expectedIdx: 26, enTitle: 'The Stingy Artist'},
  {agentId: 'black_nosed_buddha', expectedIdx: 27, enTitle: 'Black-Nosed Buddha'},
  {agentId: 'the_real_prosperity', expectedIdx: 28, enTitle: 'The Real Prosperity'},
  {agentId: 'every_minute_zen', expectedIdx: 29, enTitle: 'Every Minute Zen'},
  {agentId: 'flower_shower', expectedIdx: 30, enTitle: 'Flower Shower'},
  {agentId: 'publishing_the_sutras', expectedIdx: 31, enTitle: 'Publishing the Sutras'},
  {agentId: 'the_taste_of_banzos_sword', expectedIdx: 32, enTitle: 'The Taste of Banzan\'s Sword'},
  {agentId: 'the_dead_mans_answer', expectedIdx: 33, enTitle: 'The Dead Man\'s Answer'},
  {agentId: 'a_drop_of_water', expectedIdx: 34, enTitle: 'A Drop of Water'},
  {agentId: 'time_to_die', expectedIdx: 35, enTitle: 'Time to Die'},
  {agentId: 'gudo_and_the_emperor', expectedIdx: 36, enTitle: 'Gudo and the Emperor'},
  {agentId: 'calling_card', expectedIdx: 37, enTitle: 'Calling Card'},
  {agentId: 'the_blockhead_lord', expectedIdx: 38, enTitle: 'The Blockhead Lord'},
  {agentId: 'the_silent_temple', expectedIdx: 39, enTitle: 'The Silent Temple'},
  {agentId: 'my_heart_burns_like_fire', expectedIdx: 40, enTitle: 'My Heart Burns Like Fire'},
  {agentId: 'sleeping_in_the_daytime', expectedIdx: 41, enTitle: 'Sleeping in the Daytime'},
  {agentId: 'the_thief_left_the_moon', expectedIdx: 42, enTitle: 'The Thief Left the Moon'},
  {agentId: 'three_days_more', expectedIdx: 43, enTitle: 'Three Days More'},
  {agentId: 'trading_dialogue_for_lodging', expectedIdx: 44, enTitle: 'Trading Dialogue for Lodging'},
  {agentId: 'the_subjugation_of_a_ghost', expectedIdx: 45, enTitle: 'The Subjugation of a Ghost'},
  {agentId: 'the_thief_and_the_master', expectedIdx: 46, enTitle: 'The Thief and the Master'},
  {agentId: 'the_tea_master_and_the_assassin', expectedIdx: 47, enTitle: 'The Tea Master and the Assassin'},
  {agentId: 'the_living_buddha_and_the_tubmaker', expectedIdx: 48, enTitle: 'The Living Buddha and the Tubmaker'},
  {agentId: 'the_thief_of_the_heart', expectedIdx: 49, enTitle: 'The Thief of the Heart'},
  {agentId: 'the_thief_of_attention', expectedIdx: 50, enTitle: 'The Thief of Attention'},
  {agentId: 'midnight_excursion', expectedIdx: 51, enTitle: 'Midnight Excursion'}
];

// Now apply translations from agent A result
// Read raw text and extract by position
var aContent = fs.readFileSync('scripts/uk_chunks/chunk_result_a.json', 'utf8');

// Just extract id→title_uk/text_uk pairs from the raw text using regex
var results = [];
var idRegex = /"id":\s*"([^"]+)"/g;
var titleRegex = /"title_uk":\s*"((?:[^"\\]|\\.)*)"/g;
// For text_uk, match until the next id or end
var parts = aContent.split('"id":');
for (var i = 1; i < parts.length; i++) {
  var idMatch = parts[i].match(/^\s*"([^"]+)"/);
  if (!idMatch) continue;
  var id = idMatch[1];
  
  var titleMatch = parts[i].match(/"title_uk":\s*"((?:[^"\\]|\\.)*)"/);
  var title = titleMatch ? titleMatch[1] : '';
  
  // Extract text_uk: find the value between "text_uk": "..." and either },"id" or }]}
  var textStart = parts[i].indexOf('"text_uk":');
  if (textStart >= 0) {
    var afterStart = parts[i].slice(textStart);
    var openQuote = afterStart.indexOf('"');
    var closeQuote = afterStart.lastIndexOf('"');
    if (openQuote >= 0 && closeQuote > openQuote) {
      var text = afterStart.slice(openQuote + 1, closeQuote);
      results.push({id: id, title_uk: title, text_uk: text});
    }
  }
}

console.log('Extracted from A: ' + results.length + ' translations');

// Apply to koans.json
var merged = 0;
results.forEach(function(r) {
  // Find by agent ID in our mapping
  var map = orderMap.find(function(m) { return m.agentId === r.id; });
  if (map) {
    var idx = map.expectedIdx;
    if (idx >= 0 && idx < k.length) {
      if (!k[idx].title) k[idx].title = {};
      if (!k[idx].text) k[idx].text = {};
      k[idx].title.uk = r.title_uk;
      k[idx].text.uk = r.text_uk;
      merged++;
    }
  }
});
console.log('Merged from A: ' + merged);

// Similarly for D — these are the 100 Book of Equanimity koans at indices 187-286
var dContent = fs.readFileSync('scripts/uk_chunks/chunk_result_d.json', 'utf8');
var dParts = dContent.split('"id":');
var dResults = [];
for (var di = 1; di < dParts.length; di++) {
  var idM = dParts[di].match(/^\s*"([^"]+)"/);
  if (!idM) continue;
  var titleM = dParts[di].match(/"title_uk":\s*"((?:[^"\\]|\\.)*)"/);
  var textStartPos = dParts[di].indexOf('"text_uk":');
  if (textStartPos >= 0) {
    var after = dParts[di].slice(textStartPos);
    var oq = after.indexOf('"');
    var cq = after.lastIndexOf('"');
    if (oq >= 0 && cq > oq) {
      dResults.push({id: idM[1], title_uk: titleM ? titleM[1] : '', text_uk: after.slice(oq + 1, cq)});
    }
  }
}
console.log('Extracted from D: ' + dResults.length + ' translations');

// Apply D — BoE koans are at indices 187-286
var dMerged = 0;
dResults.forEach(function(r, ri) {
  var idx = 187 + ri;
  if (idx < k.length) {
    if (!k[idx].title) k[idx].title = {};
    if (!k[idx].text) k[idx].text = {};
    k[idx].title.uk = r.title_uk;
    k[idx].text.uk = r.text_uk;
    dMerged++;
  }
});
console.log('Merged from D: ' + dMerged);

// Now merge B and C which were already partially merged
// Check what we still have
var ukCount = k.filter(function(x) { return x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0; }).length;
console.log('\nFinal uk count: ' + ukCount + ' / ' + k.length);

fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
console.log('Written.');
