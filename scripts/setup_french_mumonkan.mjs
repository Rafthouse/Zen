/**
 * Parse French Mumonkan text from ORAEDES page.
 * Source: http://www.oraedes.fr/Medias/Barriere-sans-porte
 * Translator: Jacques Prestreau (public domain - personal website)
 * 
 * The text has koans numbered 1-48 with titles.
 * We'll extract them and save to scripts/french_mumonkan_cache.json
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Since the page is 20K limited, we have partial. Let's save what we have.
// The text data from koan 1-37 is already fetched.
// We need koans 38-48 separately.

// For now, save the raw text as a reference source
const rawSourcePath = resolve(__dirname, 'french_mumonkan_raw.txt');
const cacheFile = resolve(__dirname, 'french_mumonkan_cache.json');

// Check if we have a cached extraction already
const cache = existsSync(cacheFile) ? JSON.parse(readFileSync(cacheFile, 'utf8')) : {};

console.log(`French Mumonkan cache: ${Object.keys(cache).length}/${cache.total || 0} koans`);

// Koan mapping: Mumonkan koans are koans #102-#149 in our corpus (0-indexed: 101-148)
// Let's map French title to our internal ID
const MUMONKAN_MAP = {
  1: { en: "Joshu's Dog (Mu)", slug: "joshus_dog_mu" },
  2: { en: "Hyakujo's Fox", slug: "hyakujos_fox" },
  3: { en: "Gutei's Finger", slug: "guteis_finger" },
  4: { en: "A Hermit's Beard", slug: "a_hermits_beard" },
  5: { en: "Kyogen's Man Up a Tree", slug: "kyogens_man_up_a_tree" },
  6: { en: "The Buddha Holds Up a Flower", slug: "buddha_holds_up_a_flower" },
  7: { en: "Wash Your Bowls", slug: "wash_your_bowls" },
  8: { en: "Keichu's Wheel", slug: "keichus_wheel" },
  9: { en: "A Buddha Before History", slug: "a_buddha_before_history" },
  10: { en: "Seizei Alone and Poor", slug: "seizei_alone_and_poor" },
  11: { en: "Joshu Examines a Hermit", slug: "joshu_examines_a_hermit" },
  12: { en: "Zuigan Calls His Master", slug: "zuigan_calls_his_master" },
  13: { en: "Tokusan Holds His Bowls", slug: "tokusan_holds_his_bowls" },
  14: { en: "Nansen Cuts the Cat in Two", slug: "nansen_cuts_the_cat" },
  15: { en: "Tozan's Three Blows", slug: "tozans_three_blows" },
  16: { en: "The Bell and the Robe", slug: "the_bell_and_the_robe" },
  17: { en: "The National Teacher's Three Calls", slug: "the_national_teachers_calls" },
  18: { en: "Tozan's Three Pounds of Flax", slug: "tozans_three_pounds" },
  19: { en: "Everyday Mind Is the Way", slug: "everyday_mind_is_the_way" },
  20: { en: "The Man of Great Power", slug: "the_man_of_great_power" },
  21: { en: "Dried Dung", slug: "dried_dung" },
  22: { en: "Mahakashyapa's Flag", slug: "mahakashyapas_flag" },
  23: { en: "Think Neither Good Nor Evil", slug: "think_neither_good_nor_evil" },
  24: { en: "Without Words, Without Silence", slug: "without_words_without_silence" },
  25: { en: "Preaching from the Third Seat", slug: "preaching_from_third_seat" },
  26: { en: "Two Monks Roll Up the Screen", slug: "two_monks_roll_up_screen" },
  27: { en: "Not the Mind, Not the Buddha", slug: "not_mind_not_buddha" },
  28: { en: "Ryutan Blows Out a Candle", slug: "ryutan_blows_out_candle" },
  29: { en: "The Flag Not Moving", slug: "the_flag_not_moving" },
  30: { en: "The Mind Is the Buddha", slug: "the_mind_is_the_buddha" },
  31: { en: "Joshu Investigates", slug: "joshu_investigates" },
  32: { en: "A Philosopher Asks the Buddha", slug: "a_philosopher_asks_buddha" },
  33: { en: "This Mind Is Not the Buddha", slug: "this_mind_is_not_buddha" },
  34: { en: "Learning Is Not the Way", slug: "learning_is_not_the_way" },
  35: { en: "The Soul of Seijo", slug: "the_soul_of_seijo" },
  36: { en: "Meeting a Master on the Road", slug: "meeting_a_master_on_road" },
  37: { en: "A Buffalo Passes the Window", slug: "buffalo_passes_window" },
  38: { en: "An Oak Tree in the Garden", slug: "oak_tree_in_garden" },
  39: { en: "Ummon's Sidereal Word", slug: "ummons_sidereal_word" },
  40: { en: "Tipping Over a Water Bottle", slug: "tipping_over_water_bottle" },
  41: { en: "Bodhidharma Pacifies the Mind", slug: "bodhidharma_pacifies_mind" },
  42: { en: "The Samadhi of the Girl", slug: "samadhi_of_the_girl" },
  43: { en: "Shuzan's Staff", slug: "shuzans_staff" },
  44: { en: "Shuzan's Spear", slug: "shuzans_spear" },
  45: { en: "Who Is He?", slug: "who_is_he" },
  46: { en: "Proceed from the Top of the Pole", slug: "proceed_from_top_of_pole" },
  47: { en: "Three Gates of Tosotsu", slug: "three_gates_of_tosotsu" },
  48: { en: "One Way of Kempo", slug: "one_way_of_kempo" }
};

console.log('\nMumonkan koan mapping: 48 koans (IDs 102-149 in corpus)');
console.log('Need French source for all 48.\n');

// Save
writeFileSync(cacheFile, JSON.stringify({ koans: MUMONKAN_MAP, cache: cache }, null, 2), 'utf8');
console.log('Cache template saved to:', cacheFile);
