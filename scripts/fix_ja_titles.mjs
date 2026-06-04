import fs from 'fs';

// Canonical Japanese titles from shomonji.or.jp
var JA_TITLES = {
  // Non-case entries
  "_preface": "無門關序",
  // Cases 1-48
  1: "趙州狗子",
  2: "百丈野狐",
  3: "倶胝竪指",
  4: "胡子無鬚",
  5: "香嚴上樹",
  6: "世尊拈花",
  7: "趙州洗鉢",
  8: "奚仲造車",
  9: "大通智勝",
  10: "淸税孤貧",
  11: "州勘庵主",
  12: "巖喚主人",
  13: "徳山托鉢",
  14: "南泉斬猫",
  15: "洞山三頓",
  16: "鐘聲七條",
  17: "國師三喚",
  18: "洞山三斤",
  19: "平常是道",
  20: "大力量人",
  21: "雲門屎橛",
  22: "迦葉刹竿",
  23: "不思善惡",
  24: "離却語言",
  25: "三座説法",
  26: "二僧巻簾",
  27: "不是心佛",
  28: "久響龍潭",
  29: "非風非幡",
  30: "卽心卽佛",
  31: "趙州勘婆",
  32: "外道問佛",
  33: "非心非佛",
  34: "智不是道",
  35: "倩女離魂",
  36: "路逢達道",
  37: "庭前柏樹",
  38: "牛過窓櫺",
  39: "雲門話墮",
  40: "趯倒淨瓶",
  41: "達磨安心",
  42: "女子出定",
  43: "首山竹箆",
  44: "芭蕉拄杖",
  45: "他是阿誰",
  46: "竿頭進歩",
  47: "兜率三關",
  48: "乾峰一路"
};

// Special handling for non-standard entries
var SPECIAL_TITLES = {
  "the_gateless_gate": "無門關序",
  "spring_has_a_hundred_flowers": "平常是道",
  "finding_a_diamond_on_a_muddy_road": "" // Not a Mumonkan case, remove old erroneous title
};

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

function getCaseNum(source) {
  if (!source) return null;
  var m = source.match(/Case\s+(\d+)/);
  return m ? parseInt(m[1]) : null;
}

var updated = 0;
k.forEach(function(x){
  var id = x.id || x.slug;
  
  // Handle special entries
  if (SPECIAL_TITLES[id] !== undefined) {
    var t = SPECIAL_TITLES[id];
    if (t) {
      if (!x.title) x.title = {};
      x.title.ja = t;
      updated++;
    } else {
      // Empty string = remove old erroneous title
      if (x.title) delete x.title.ja;
    }
    return;
  }
  
  // Regular case matching
  if (!x.source || x.source.indexOf('Mumonkan') < 0) return;
  var caseNum = getCaseNum(x.source);
  if (!caseNum) return;
  var jaTitle = JA_TITLES[caseNum];
  if (!jaTitle) return;
  
  if (!x.title) x.title = {};
  x.title.ja = jaTitle;
  updated++;
});

var jaCount = k.filter(function(x){return x.title && x.title.ja}).length;
var totalMumonkan = k.filter(function(x){return x.source && x.source.indexOf('Mumonkan')>=0}).length;

console.log('Total Mumonkan entries:', totalMumonkan);
console.log('Updated:', updated);
console.log('Total koans with ja title:', jaCount);

// Verify specific cases
var verifyIds = ['the_gateless_gate', 'a_cup_of_tea', 'ambans_addition', 'finding_a_diamond_on_a_muddy_road'];
k.forEach(function(x){
  var id = x.id || x.slug;
  if (verifyIds.indexOf(id) >= 0) {
    console.log(id + ': ja="' + (x.title&&x.title.ja||'(none)') + '" source="' + (x.source||'') + '"');
  }
});

fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
console.log('\nWritten.');
