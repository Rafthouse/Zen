import { readFileSync, writeFileSync } from 'fs';

// Read extracted text
const text = readFileSync('I:/ZEN/zen_stories_raw.txt', 'utf8');

// Read existing koans
const existing = JSON.parse(readFileSync('I:/ZEN/src/data/koans.json', 'utf8'));
const existingTitles = new Set(existing.map(k => k.title?.en?.toLowerCase().trim()));

// The PDF has the stories with titles in ALL CAPS
// Split by == page markers or double newlines before all-caps titles
const lines = text.split('\n').map(l => l.trim()).filter(l => l);

// Find story titles (ALL CAPS lines that match known titles)
const knownTitles = [
  'A CUP OF TEA', 'FINDING A DIAMOND ON A MUDBY ROAD', 'IS THAT SO?', 'OBEDIENCE',
  'IF YOU LOVE, LOVE OPENLY', 'NO LOVING KINDNESS', 'GREAT WAVES', 'THE MOON CANNOT BE STOLEN',
  'THE LAST POEM OF HO-SHIN', 'THE STORY OF SHUN-KAI', 'HAPPY CHINAMAN', 'A BUDDHA',
  'MUDDY ROAD', 'SHO-UN AND HIS MOTHER', 'NOT FAR FROM BUDDHAHOOD', 'STINGY IN TEACHING',
  'A PARABLE', 'THE FIRST PRINCIPLE', 'A MOTHER\'S ADVICE', 'THE SOUND OF ONE HAND',
  'MY HEART BURNS LIKE FIRE', 'E-SHUN\'S DEPARTURE', 'ESHUN\'S DEPARTURE', 'RECITING SUTRAS',
  'THREE DAYS MORE', 'TRADING DIALOGUE FOR LODGING', 'THE VOICE OF HAPPINESS',
  'OPEN YOUR OWN TREASURE HOUSE', 'NO WATER, NO MOON', 'CALLING CARD', 'EVERYTHING IS BEST',
  'INCH TIME FOOT GEM', 'MOKUSEN\'S HAND', 'MOKU-SEN\'S HAND', 'A SMILE IN HIS LIFETIME',
  'EVERY MINUTE ZEN', 'EVERY-MINUTE ZEN', 'FLOWER SHOWER', 'A FLOWER SHOWER',
  'PUBLISHING THE SUTRAS', 'GI-SHO\'S WORK', 'SLEEPING IN THE DAYTIME',
  'IN DREAMLAND', 'JO-SHU\'S ZEN', 'THE DEAD MAN\'S ANSWER', 'ZEN IN A BEGGAR\'S LIFE',
  'THE THIEF WHO BECAME A DISCIPLE', 'RIGHT AND WRONG', 'HOW GRASS AND TREES BECOME ENLIGHTENED',
  'THE STINGY ARTIST', 'ACCURATE PROPORTION', 'BLACK-NOSED BUDDHA', 'RYO-NEN\'S CLEAR REALIZATION',
  'SOUR MISO', 'YOUR LIGHT MAY GO OUT', 'THE GIVER SHOULD BE THANKFUL',
  'THE LAST WILL AND TESTAMENT', 'THE TEA MASTER AND THE ASSASSIN', 'THE TRUE PATH',
  'THE GATES OF PARADISE', 'ARRESTING THE STONE BUDDHA', 'SOLDIERS OF HUMANITY',
  'THE TUNNEL', 'GUDO AND THE EMPEROR', 'GU-DO AND THE EMPEROR', 'IN THE HANDS OF DESTINY',
  'KILLING', 'KA-SAN SWEAT', 'THE SUBJUGATION OF A GHOST', 'CHILDREN OF HIS MAJESTY',
  'WHAT ARE YOU DOING? WHAT ARE YOU SAYING!', 'ONE NOTE OF ZEN', 'EATING THE BLAME',
  'THE MOST VALUABLE THING IN THE WORLD', 'LEARNING TO BE SILENT', 'THE BLOCKHEAD LORD',
  'TEN SUCCESSORS', 'TRUE REFORMATION', 'TEMPER', 'THE STONE MIND',
  'NO ATTACHMENT FOR DUST', 'NO ATTACHMENT TO DUST', 'REAL PROSPERITY', 'INCENSE BURNER',
  'THE REAL MIRACLE', 'JUST GO TO SLEEP', 'NOTHING EXISTS', 'NO WORK, NO FOOD',
  'TRUE FRIENDS', 'TIME TO DIE', 'THE LIVING BUDDHA AND THE TUBMAKER',
  'THREE KINDS OF DISCIPLES', 'HOW TO WRITE A CHINESE POEM', 'ZEN DIALOGUE',
  'THE LAST RAP', 'THE TASTE OF BANZO\'S SWORD', 'THE TASTE OF BAN-ZO\'S SWORD',
  'FIRE-POKER ZEN', 'STORYTELLER\'S ZEN', 'STORY-TELLER\'S ZEN', 'MIDNIGHT EXCURSION',
  'LETTER TO A DYING MAN', 'A LETTER TO A DYING MAN', 'A DROP OF WATER',
  'TEACHING THE ULTIMATE', 'NON-ATTACHMENT', 'TO-SUI\'S VINEGAR', 'THE SILENT TEMPLE',
  'THE BUDDHA\'S ZEN'
];

// Normalize function
function normalize(s) { return s.toLowerCase().replace(/['']/g, "'").replace(/[^a-z0-9']/g, ' ').replace(/\s+/g, ' ').trim(); }

// We already have 62 titles from 101 Zen Stories - let's find which ones we're missing
const ourTitles = [...existing].filter(k => k.source.includes('101 Zen Stories')).map(k => normalize(k.title?.en || ''));
console.log('Наших 101 Zen Stories заголовків:', ourTitles.length);
console.log('Приклади наших:', ourTitles.slice(0, 5));

// Let's manually add missing stories. The PDF is hard to parse perfectly.
// I'll add the most famous missing ones manually from the public domain text.
// Stories we know are in 101 but NOT in our corpus (comparing with 101 list):
const missingStories = [
  'Finding a Diamond on a Muddy Road',
  'No Loving Kindness',
  'The Last Poem of Ho-Shin',
  'The Story of Shun-Kai',
  'Happy Chinaman',
  'A Buddha',
  'Sho-Un and His Mother',
  'Not Far From Buddhahood',
  'Stingy in Teaching',
  "A Mother's Advice",
  'A Smile in His Lifetime',
  'Gi-Sho\'s Work',
  'In Dreamland',
  'Jo-Shu\'s Zen',
  'Zen in a Beggar\'s Life',
  'How Grass and Trees Become Enlightened',
  'Accurate Proportion',
  'Ryo-Nen\'s Clear Realization',
  'Sour Miso',
  'Your Light May Go Out',
  'The Last Will and Testament',
  'The Tea Master and the Assassin',
  'The True Path',
  'The Gates of Paradise',
  'Arresting the Stone Buddha',
  'Soldiers of Humanity',
  'In The Hands of Destiny',
  'Ka-San Sweat',
  'What Are You Doing! What Are You Saying!',
  'Ten Successors',
  'True Reformation',
  'Incense Burner',
  'True Friends',
  'Three Kinds of Disciples',
  'The Last Rap',
  'Fire-Poker Zen',
  'Non-Attachment',
  "To-Sui's Vinegar",
  "The Buddha's Zen"
];

console.log(`Пропущених історій: ${missingStories.length}`);

// Now let's extract them from the PDF text
// The text has story titles in all caps, then the story body
const storyMap = {};
let currentTitle = null;
let currentBody = [];

for (const line of lines) {
  const upper = line.toUpperCase();
  const isTitle = knownTitles.includes(upper) || upper.length > 5 && !line.startsWith('==') && !line.startsWith('http') && 
    (knownTitles.includes(upper.replace(/[^A-Z\s']/g, '').trim()) || 
     missingStories.some(m => normalize(m) === normalize(line.replace(/['']/g, "'"))));
  
  // Check if line looks like a story title (all caps, short, no punctuation)
  const looksLikeTitle = /^[A-Z\s\d'\-!?]+$/.test(line.replace(/[.,;:]/g,'').trim()) && 
    line.trim().length > 4 && line.trim().length < 50 && 
    !line.includes('==') && !line.includes('HTTP') && !line.includes('INDEX') &&
    !line.includes('BOOK') && !line.includes('CONTENTS') && !line.includes('INTRODUCTION') &&
    !line.includes('FOREWORD') && !line.includes('PREFACE') && !line.includes('PRINTED') &&
    !line.includes('DAVID MCKAY') && !line.includes('BONES') && !line.includes('FLESH') &&
    !line.includes('COPYRIGHT') && !line.includes('All rights') && !line.includes('ZEN BUDDHISM') &&
    !line.startsWith('*') && !line.startsWith('(') && !line.startsWith('[') &&
    !line.match(/^[A-Z]{5,}\s[A-Z]{5,}\s[A-Z]{5,}\s[A-Z]{5,}$/) && // too many all-caps words (table header)
    !line.match(/\d{4}/); // not a date

  if (looksLikeTitle && (knownTitles.includes(line.trim().toUpperCase().replace(/['']/g,"'")) || 
      missingStories.some(m => normalize(m.replace(/'/g,"'")) === normalize(line.trim().replace(/['']/g,"'"))))) {
    // Save previous
    if (currentTitle) {
      storyMap[currentTitle] = currentBody.join('\n').trim();
    }
    currentTitle = line.trim().toUpperCase().replace(/['']/g, "'");
    currentBody = [];
  } else if (currentTitle) {
    currentBody.push(line);
  }
}
if (currentTitle) storyMap[currentTitle] = currentBody.join('\n').trim();

console.log(`Знайдено історій в PDF: ${Object.keys(storyMap).length}`);
Object.entries(storyMap).slice(0, 5).forEach(([t, b]) => console.log(`  ${t}: ${b.length} символів`));

// Save parsed stories for inspection
writeFileSync('I:/ZEN/parsed_stories.json', JSON.stringify(storyMap, null, 2));
console.log('Збережено в parsed_stories.json');
