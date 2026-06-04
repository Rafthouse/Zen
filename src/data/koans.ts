import type { Koan } from '@/types';
import raw from './koans.json';

/**
 * Single entry point for the koan corpus.
 *
 * The data lives in `koans.json` (easy to edit by hand or generate). We cast it
 * to `Koan[]` here so the rest of the app imports a typed array and never the
 * raw JSON. A standalone validator (`npm run validate:koans`) checks the file
 * against the schema described in /src/data/SCHEMA.md.
 *
 * The corpus can scale to thousands of entries; if it grows very large,
 * convert this static import to a dynamic `import()` so it can be code-split.
 */
export const koans: Koan[] = raw as Koan[];

export function getKoanById(id: string): Koan | undefined {
  return koans.find((k) => k.id === id);
}
