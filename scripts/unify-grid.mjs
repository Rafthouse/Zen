import { readFileSync, writeFileSync } from 'fs';

let css = readFileSync('src/styles/global.css', 'utf8');

// 1. Find .option-grid block
const start = css.indexOf('.option-grid {');
const end = css.indexOf('\n.flow__nav', start);
console.log('option-grid at', start, 'to', end);
const before = css.substring(0, start);
const after = css.substring(end);

// 2. Build unified .sel-grid CSS
const unifiedBlock = `.sel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(9.5rem, 1fr));
  gap: clamp(0.75rem, 2vw, 1.25rem);
}

@media (min-width: 1024px) {
  .sel-grid {
    grid-template-columns: repeat(5, 1fr);
    gap: clamp(0.75rem, 1.5vw, 1.5rem);
  }
}

@media (min-width: 640px) and (max-width: 1023px) {
  .sel-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.sel-grid .option-card {
  transition:
    border-color 250ms ease-out,
    box-shadow 250ms ease-out,
    transform 250ms ease-out;
}
.sel-grid .option-card.is-selected {
  transform: scale(1.03);
  border-color: var(--line-strong);
  box-shadow: 0 8px 22px var(--shadow);
}
`;

css = before + unifiedBlock + after;
console.log('Replaced option-grid');

// 3. Remove weather-gallery block
const wgStart = css.indexOf('Weather \u2014 Horizontal gallery');
if (wgStart >= 0) {
  // Find the @media (prefers-reduced-motion after the block
  const wgEnd = css.indexOf('@media (prefers-reduced-motion', wgStart);
  if (wgEnd >= 0) {
    // Remove from the comment line to before the next block
    // Go back to the blank line before the comment
    const blockStart = css.lastIndexOf('\n\n', wgStart - 2);
    const actualStart = blockStart >= 0 ? blockStart : wgStart;
    css = css.substring(0, actualStart) + '\n' + css.substring(wgEnd);
    console.log('Removed weather-gallery block');
  }
}

writeFileSync('src/styles/global.css', css);
console.log('Done. sel-grid count:', (css.match(/\.sel-grid/g) || []).length);
console.log('weather-gallery count:', (css.match(/weather-gallery/g) || []).length);
console.log('option-grid count:', (css.match(/option-grid/g) || []).length);
