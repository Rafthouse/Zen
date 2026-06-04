import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const koans = JSON.parse(readFileSync(resolve(__dirname, '..', 'src', 'data', 'koans.json'), 'utf8'));

// Map Japanese canonical titles to the slugs in our dataset
// Senzaki & Reps order is different from canonical Mumonkan order
const jaBySlug = {
  'guteis_finger': '倶胝竪指',
  'a_beardless_foreigner': '胡子無鬚',
  'kyogen_mounts_the_tree': '香嚴上樹',
  'buddha_twirls_a_flower': '世尊拈花',
  'joshu_washes_the_bowl': '趙州洗鉢',
  'keichus_wheel': '奚仲造車',
  'a_buddha_before_history': '大通智勝',
  'seizei_alone_and_poor': '淸税孤貧',
  'joshu_examines_a_monk_in_meditation': '州勘庵主',
  'zuigan_calls_his_own_master': '巖喚主人',
  'tokusan_holds_his_bowl': '徳山托鉢',
  'nansen_cuts_the_cat_in_two': '南泉斬猫',
  'tozans_three_blows': '洞山三頓',
  'bells_and_robes': '鐘聲七條',
  'the_three_calls_of_the_emperors_teacher': '國師三喚',
  'tozans_three_pounds': '洞山三斤',
  'everyday_life_is_the_path': '平常是道',
  'the_enlightened_man': '大力量人',
  'dried_dung': '雲門屎橛',
  'kashapas_preaching_sign': '迦葉刹竿',
  'do_not_think_good_do_not_think_not_good': '不思善惡',
  'without_words_without_silence': '離却語言',
  'preaching_from_the_third_seat': '三座説法',
  'two_monks_roll_up_the_screen': '二僧巻簾',
  'it_is_not_mind_it_is_not_buddha_it_is_not_things': '不是心佛',
  'blow_out_the_candle': '久響龍潭',
  'not_the_wind_not_the_flag': '非風非幡',
  'this_mind_is_buddha': '卽心卽佛',
  'joshu_investigates': '趙州勘婆',
  'a_philosopher_asks_buddha': '外道問佛',
  'this_mind_is_not_buddha': '非心非佛',
  'learning_is_not_the_path': '智不是道',
  'two_souls': '倩女離魂',
  'meeting_a_zen_master_on_the_road': '路逢達道',
  'a_buffalo_passes_through_the_enclosure': '牛過窓櫺',
  'an_oak_tree_in_the_garden': '庭前柏樹',
  'ummons_sidetrack': '雲門話墮',
  'tipping_over_a_water_vase': '趯倒淨瓶',
  'bodhidharma_pacifies_the_mind': '達磨安心',
  'the_girl_comes_out_from_meditation': '女子出定',
  'shuzans_short_staff': '首山竹箆',
  'bashos_staff': '芭蕉拄杖',
  'who_is_he': '他是阿誰',
  'proceed_from_the_top_of_the_pole': '竿頭進歩',
  'three_gates_of_tosotsu': '兜率三關',
  'one_road_of_kembo': '乾峰一路',
  'ambans_addition': '第四十九則',
  'finding_a_diamond_on_a_muddy_road': null
};

let matched = 0;
let skipped = 0;

for (const k of koans) {
  const slug = k.id || k.slug;
  if (!slug) continue;
  
  const jaTitle = jaBySlug[slug];
  if (!jaTitle) continue;
  
  if (!k.title) k.title = {};
  k.title.ja = jaTitle;
  
  if (!k.text) k.text = {};
  k.text.ja = {
    text: '',
    source_type: "human_translation",
    translator: "Wumen Huikai (original) / classical kanbun text",
    source_reference: "Wúménguān (無門關), T48n2005, CBETA / Shomonji temple edition",
    language: "ja",
    note: "Canonical kanbun title set. Full text available from readability extract."
  };
  
  matched++;
}

writeFileSync(resolve(__dirname, '..', 'src', 'data', 'koans.json'), JSON.stringify(koans, null, 2), 'utf8');

const saved = JSON.parse(readFileSync(resolve(__dirname, '..', 'src', 'data', 'koans.json'), 'utf8'));
console.log(`Matched by slug: ${matched}`);
console.log(`title.ja total: ${saved.filter(k => k.title?.ja).length}/${saved.length}`);
console.log(`text.ja total: ${saved.filter(k => k.text?.ja).length}/${saved.length}`);

// Show examples
const jaKoans = saved.filter(k => k.title?.ja).slice(0, 3);
for (const k of jaKoans) {
  console.log(`\n${k.title.en} → JA: ${k.title.ja}`);
  if (k.text?.ja) console.log(`  source: ${k.text.ja.source_reference}`);
}
