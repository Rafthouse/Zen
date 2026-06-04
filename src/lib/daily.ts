import type { Koan } from '@/types';

/**
 * Deterministic "teaching of the day".
 *
 * The same koan is shown to everyone on a given calendar day, and changes once
 * per day, with no storage and no randomness that would drift between renders.
 * We hash the YYYY-MM-DD string and index into the corpus.
 */
export function dailyKoan(koans: Koan[], date: Date = new Date()): Koan {
  const key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return koans[hash % koans.length];
}
