/**
 * Tiny, defensive localStorage helpers.
 *
 * Everything is wrapped in try/catch because storage can throw in private
 * browsing modes or when quota is exceeded. The app must never break over a
 * failed read/write — it simply behaves as if nothing was stored.
 *
 * The ONLY things we persist are: language preference, theme preference, and
 * the list of favorite koan ids. No analytics, no tracking, no cookies.
 */

export function readString(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeString(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* ignore — storage unavailable */
  }
}

export function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* ignore */
  }
}
