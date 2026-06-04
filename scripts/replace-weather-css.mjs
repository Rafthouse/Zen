import { readFileSync, writeFileSync } from 'fs';
let css = readFileSync('src/styles/global.css','utf8');
const start = css.indexOf('Weather — Radial');
const end = css.indexOf('@media (prefers-reduced-motion', start);
const before = css.substring(0, start - 12);
const after = css.substring(end);
const newBlock = `/* =========================================================================
   Weather — Horizontal gallery (desktop/tablet)
   ========================================================================= */
.weather-gallery {
  display: flex;
  flex-direction: column;
  gap: var(--gap);
}

@media (min-width: 1024px) {
  .weather-gallery {
    flex-direction: row;
    justify-content: center;
    align-items: stretch;
    gap: clamp(0.75rem, 1.5vw, 1.5rem);
    padding: 0.5rem 0;
    margin: 0 auto;
    max-width: 56rem;
  }

  .weather-gallery__card {
    flex: 1 1 0;
    min-width: 0;
    max-width: 14rem;
    min-height: 10rem;
  }

  .weather-gallery .option-card {
    transition:
      border-color 250ms ease-out,
      box-shadow 250ms ease-out,
      transform 250ms ease-out;
  }
  .weather-gallery .option-card.is-selected {
    transform: scale(1.03);
    border-color: var(--line-strong);
    box-shadow: 0 8px 22px var(--shadow);
  }
}
`;
writeFileSync('src/styles/global.css', before + newBlock + after);
console.log('Replaced successfully');
