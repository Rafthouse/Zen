import type { Koan, ResultRole, Selection } from '@/types';

/**
 * Weighted tag-matching — the entire "intelligence" of the app.
 *
 * There is NO AI, NO text generation, NO network. We simply score every koan
 * against the user's four selections and return the best matches.
 *
 * Scoring:
 *   depth   — required level (exact match, +100)
 *   state   — strong influence (+50)
 *   focus   — medium influence (+30)
 *   weather — subtle influence (+15)
 *
 * Diversity: tied scores are shuffled using a seeded random so the same
 * selection yields different results on different visits, preventing the
 * same koan from always dominating.
 *
 * Daily seed: changes every 24h (UTC) so morning visits differ from evening.
 * Result: fresh teaching each time, yet always relevant to the selection.
 */

export const WEIGHTS = {
  depth: 100,
  state: 50,
  focus: 30,
  weather: 15,
} as const;

export interface ScoredKoan {
  koan: Koan;
  score: number;
}

/** Score a single koan against the current selection. */
export function scoreKoan(koan: Koan, sel: Selection): number {
  let score = 0;
  if (sel.weather && koan.weather.includes(sel.weather)) score += WEIGHTS.weather;
  if (sel.state && koan.state.includes(sel.state)) score += WEIGHTS.state;
  if (sel.focus && koan.focus.includes(sel.focus)) score += WEIGHTS.focus;
  if (sel.depth && koan.depth === sel.depth) score += WEIGHTS.depth;
  return score;
}

/** Seedable PRNG (mulberry32) for deterministic-but-varying shuffles. */
function seededRandom(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Build a daily seed from the current UTC date + weather selection. */
function dailySeed(weather?: string): number {
  const now = new Date();
  const day = now.getUTCFullYear() * 10000 + (now.getUTCMonth() + 1) * 100 + now.getUTCDate();
  // Weather choice flavours the seed so changing weather changes the shuffle
  const w = weather ? weather.charCodeAt(0) + (weather.charCodeAt(weather.length - 1) || 0) : 0;
  return day * 31 + w * 7;
}

/**
 * Rank the whole corpus. Tied scores are shuffled with a seeded random so
 * results differ day-to-day (same selection ≠ same koans).
 */
export function rankKoans(koans: Koan[], sel: Selection): ScoredKoan[] {
  const seed = dailySeed(sel.weather);
  const rng = seededRandom(seed);

  const scored = koans
    .map((koan) => ({ koan, score: scoreKoan(koan, sel) }))
    .filter((s) => s.score > 0);

  // Sort by score descending; within same score use seeded random for variety
  scored.sort((a, b) => {
    const diff = b.score - a.score;
    if (diff !== 0) return diff;
    // Seeded shuffle for ties — same seed = same relative order,
    // but the seed changes daily (and with weather), so ties reorder.
    return rng() - 0.5;
  });

  return scored;
}

/**
 * Choose the three result teachings.
 *
 * Selection prefers diversity within the same score tier: if there are
 * multiple koans at the same score, the seeded shuffle ensures a different
 * trio each day (or when weather changes).
 */
export function selectThree(koans: Koan[], sel: Selection): Record<ResultRole, Koan> | null {
  const ranked = rankKoans(koans, sel);
  if (ranked.length === 0) return null;

  const chosen: Koan[] = [];
  const used = new Set<string>();

  for (const { koan } of ranked) {
    if (used.has(koan.id)) continue;
    chosen.push(koan);
    used.add(koan.id);
    if (chosen.length === 3) break;
  }

  // Backfill with random unrelated koans if <3 matched
  if (chosen.length < 3) {
    const seed = dailySeed(sel.weather) + 999;
    const rng = seededRandom(seed);
    // Shuffle remaining corpus
    const rest = [...koans].filter((k) => !used.has(k.id)).sort(() => rng() - 0.5);
    for (const koan of rest) {
      chosen.push(koan);
      used.add(koan.id);
      if (chosen.length === 3) break;
    }
  }

  if (chosen.length < 3) return null;

  return { see: chosen[0], unseen: chosen[1], release: chosen[2] };
}

/** Pick a uniformly random koan (for the "random teaching" button). */
export function randomKoan(koans: Koan[]): Koan {
  return koans[Math.floor(Math.random() * koans.length)];
}
