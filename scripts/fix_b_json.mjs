import fs from 'fs';

// First fix corrupted chunk_result_b.json — the truncation at if_you_meet_the_buddha
// The file has a syntax error. Let me read and fix the broken JSON.

var content = fs.readFileSync('scripts/uk_chunks/chunk_result_b.json', 'utf8');

// The truncation happened — the translation for if_you_meet_the_buddha was cut off
// We need to reconstruct the valid JSON by fixing known issues

try {
  JSON.parse(content);
  console.log('Already valid');
} catch(e) {
  // Find the truncation — it's at 'if_you_meet_the_buddha'
  // The response was truncated by the subagent, need to complete the missing entries
  
  // Strategy: load what we can and supplement the missing koans from the agent D result
  // which already has most of these translations
  
  var allData = JSON.parse(fs.readFileSync('scripts/uk_chunks/chunk_result_d.json', 'utf8'));
  
  // Manually fix the broken B file by reading what we can
  // if_you_meet_the_buddha was the last complete entry before truncation
  // The entries after that (hyakujos_fox through the_enlightened_man) are duplicated in chunk_result_d.json
  // Actually chunk_result_d.json has Book of Equanimity koans (enkyos_descent etc.) not these
  // These are Mumonkan koans which are in chunk_result_c.json
  
  // Let me check what chunk_result_c.json has
  var cData = JSON.parse(fs.readFileSync('scripts/uk_chunks/chunk_result_c.json', 'utf8'));
  
  // The B file was truncated in the middle. The entries after the truncation include:
  // hyakujos_fox, guteis_finger, a_beardless_foreigner, kyogen_mounts_the_tree, 
  // buddha_twirls_a_flower, joshu_washes_the_bowl, keichus_wheel, a_buddha_before_history,
  // seizei_alone_and_poor, joshu_examines_a_monk_in_meditation, zuigan_calls_his_own_master,
  // tokusan_holds_his_bowl, nansen_cuts_the_cat_in_two, tozans_three_blows,
  // bells_and_robes, the_three_calls_of_the_emperors_teacher, tozans_three_pounds,
  // everyday_life_is_the_path, the_enlightened_man
  
  // Many of these overlap with chunk_result_c.json
  var missingIds = ['hyakujos_fox','guteis_finger','a_beardless_foreigner','kyogen_mounts_the_tree',
    'buddha_twirls_a_flower','joshu_washes_the_bowl','keichus_wheel','a_buddha_before_history',
    'seizei_alone_and_poor','joshu_examines_a_monk_in_meditation','zuigan_calls_his_own_master',
    'tokusan_holds_his_bowl','nansen_cuts_the_cat_in_two','tozans_three_blows',
    'bells_and_robes','the_three_calls_of_the_emperors_teacher','tozans_three_pounds',
    'everyday_life_is_the_path','the_enlightened_man'];
  
  // Build a complete translations array from B + supplement from C
  // First fix the B JSON by truncating at the last valid entry
  var validEnd = content.lastIndexOf('},');
  var fixedB = content.slice(0, validEnd + 1) + ']}';
  
  try {
    var bFixed = JSON.parse(fixedB);
    console.log('Fixed B: ' + bFixed.translations.length + ' valid entries');
    
    // Merge with missing ones from C
    var allTrans = bFixed.translations.slice();
    var existingIds = allTrans.map(function(t) { return t.id; });
    
    missingIds.forEach(function(id) {
      if (existingIds.indexOf(id) >= 0) return; // already in B
      var found = cData.translations.filter(function(t) { return t.id === id; });
      if (found.length > 0) {
        allTrans.push(found[0]);
        existingIds.push(id);
      }
    });
    
    var output = { translations: allTrans };
    fs.writeFileSync('scripts/uk_chunks/chunk_result_b.json', JSON.stringify(output, null, 2), 'utf8');
    console.log('Written fixed B: ' + allTrans.length + ' translations');
  } catch(e2) {
    console.log('Fix attempt failed:', e2.message);
  }
}
