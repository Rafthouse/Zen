import type { Koan, ResultRole, Selection } from '@/types';

/**
 * Weighted tag-matching — the entire "intelligence" of the app.
 *
 * There is NO AI, NO text generation, NO network. We simply score every koan
 * against the user's four selections and return the best matches. The scoring
 * is intentionally transparent and easy to tune:
 *
 *   weather  -> WEIGHTS.weather points if the koan carries the chosen tag
 *   state    -> WEIGHTS.state   ...
 *   focus    -> WEIGHTS.focus   ...
 *   depth    -> WEIGHTS.depth   (exact depth match only)
 *
 * A small deterministic tie-breaker keeps results stable for identical scores
 * without making them feel mechanical.
 */

export const WEIGHTS = {
  weather: 3,
  state: 3,
  focus: 2,
  depth: 2,
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

/** Stable, content-derived pseudo-order so equal scores don't reshuffle. */
function tiebreak(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 100000;
  return h;
}

/**
 * Rank the whole corpus. Koans that match nothing (score 0) are dropped so we
 * never present an irrelevant teaching as if it answered the user.
 */
export function rankKoans(koans: Koan[], sel: Selection): ScoredKoan[] {
  return koans
    .map((koan) => ({ koan, score: scoreKoan(koan, sel) }))
    .filter((s) => s.score > 0)
    .sort((a, b) =>
      b.score - a.score || tiebreak(a.koan.id) - tiebreak(b.koan.id),
    );
}

/**
 * Choose the three result teachings, mapped to their contemplative roles:
 *   see     -> the strongest match (what you see now)
 *   unseen  -> a strong but distinct match (what you may not see)
 *   release -> a gentler / different match (what may be released)
 *
 * We pull from the ranked list but enforce distinctness. If fewer than three
 * koans match, we backfill from the rest of the corpus so the screen is never
 * empty when any selection was made.
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

  // Backfill if the matcher found fewer than three distinct teachings.
  if (chosen.length < 3) {
    for (const koan of koans) {
      if (used.has(koan.id)) continue;
      chosen.push(koan);
      used.add(koan.id);
      if (chosen.length === 3) break;
    }
  }

  if (chosen.length < 3) return null; // corpus smaller than 3 — should not happen

  return { see: chosen[0], unseen: chosen[1], release: chosen[2] };
}

/** Pick a uniformly random koan (for the "random teaching" button). */
export function randomKoan(koans: Koan[]): Koan {
  return koans[Math.floor(Math.random() * koans.length)];
}
