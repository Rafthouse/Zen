import fs from 'fs';

var k = JSON.parse(fs.readFileSync('src/data/koans.json', 'utf8'));

// Load B and C fixed files
var files = [
  {path: 'scripts/uk_chunks/chunk_result_b_fixed.json', offset: 0},
  {path: 'scripts/uk_chunks/chunk_result_c.json', offset: 0}
];

var total = 0;
files.forEach(function(f) {
  var data = JSON.parse(fs.readFileSync(f.path, 'utf8'));
  var trans = data.translations || [];
  trans.forEach(function(t) {
    var idx = k.findIndex(function(x) { return (x.id || x.slug) === t.id; });
    if (idx >= 0) {
      if (!k[idx].title) k[idx].title = {};
      if (!k[idx].text) k[idx].text = {};
      k[idx].title.uk = t.title_uk;
      k[idx].text.uk = t.text_uk;
      total++;
    }
  });
});

var ukCount = k.filter(function(x) { return x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0; }).length;
console.log('Merged now: ' + total + ' translations');
console.log('Final uk count: ' + ukCount + ' / ' + k.length);

// Also set uk titles for any koan that has a uk text
k.forEach(function(x) {
  if (x.text && typeof x.text.uk === 'string' && x.text.uk.length > 0) {
    if (!x.title.uk && x.title && x.title.en) {
      // Set a default uk title from existing
      var existingTitles = {
        'a_cup_of_tea':'Чашка чаю',
        'is_that_so':'Ось як?',
        'muddy_road':'Багниста дорога',
        'nothing_exists':'Ніщо не існує',
        'great_waves':'Великі хвилі',
        'no_water_no_moon':'Ні води, ні місяця',
        'the_moon_cannot_be_stolen':'Місяць не вкрасти',
        'learning_to_be_silent':'Учитися мовчати',
        'the_gift_of_insults':'Дарунок'
      };
      var id = x.id || x.slug;
      if (existingTitles[id]) {
        x.title.uk = existingTitles[id];
      }
    }
  }
});

fs.writeFileSync('src/data/koans.json', JSON.stringify(k, null, 2), 'utf8');
console.log('Written.');
