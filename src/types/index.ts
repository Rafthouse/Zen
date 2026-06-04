/**
 * Core domain types for "Zen in Every Moment".
 *
 * Two translation layers are modelled here and kept deliberately independent:
 *   1. Interface translation  -> handled by /src/locales/*.json (see i18n).
 *   2. Koan content translation -> handled by the `LocalizedText` fields below.
 *
 * The matching algorithm only ever touches `tags` + `depth`, never the prose,
 * so adding a language never affects matching logic.
 */

/** Supported interface + content languages. Add new codes here only. */
export type LanguageCode = 'uk' | 'en' | 'fr' | 'ja';

/** The four supported languages, in display order. */
export const LANGUAGES: { code: LanguageCode; label: string }[] = [
  { code: 'uk', label: 'Українська' },
  { code: 'en', label: 'English' },
  { code: 'fr', label: 'Français' },
  { code: 'ja', label: '日本語' },
];

/** The language used as a fallback when a translation is missing. */
export const FALLBACK_LANGUAGE: LanguageCode = 'en';

/**
 * A piece of text that may exist in several languages. `en` is required so the
 * fallback chain always terminates; every other language is optional.
 */
export type LocalizedText = { en: string } & Partial<Record<LanguageCode, string>>;

/* ---- The four question dimensions used by the flow + matcher ---- */

export type Weather = 'fog' | 'rain' | 'wind' | 'clear' | 'storm';
export type State = 'searching' | 'waiting' | 'struggling' | 'losing' | 'finding';
export type Focus = 'myself' | 'other' | 'work' | 'future' | 'past';
export type Depth = 'line' | 'short' | 'koan';

export const WEATHERS: Weather[] = ['fog', 'rain', 'wind', 'clear', 'storm'];
export const STATES: State[] = ['searching', 'waiting', 'struggling', 'losing', 'finding'];
export const FOCUSES: Focus[] = ['myself', 'other', 'work', 'future', 'past'];
export const DEPTHS: Depth[] = ['line', 'short', 'koan'];

/** What the user has chosen by the end of the flow. Each field is optional
 *  until answered; the matcher tolerates partial selections. */
export interface Selection {
  weather?: Weather;
  state?: State;
  focus?: Focus;
  depth?: Depth;
}

/**
 * A single curated teaching. Content is never generated — every entry is a
 * transcription of an existing public-domain story, with its source preserved.
 */
export interface Koan {
  /** Stable identifier, also used for favorites + permalinks. */
  id: string;
  title: LocalizedText;
  /** Free localizable body of the teaching. */
  text: LocalizedText;
  /** Named master / author if known, else "Unknown" / a tradition name. */
  author: string;
  /** Where the text comes from — always shown to the user. */
  source: string;
  /** e.g. "Japanese Zen", "Chan", "Soto". Optional. */
  tradition?: string;
  /** ISO code of the language the story was originally recorded in. */
  originalLanguage: LanguageCode;
  /** The original-language text, preserved verbatim and never overwritten. */
  originalText?: string;

  /* ---- matching tags ---- */
  depth: Depth;
  weather: Weather[];
  state: State[];
  focus: Focus[];
}

/** The three result slots, in fixed contemplative order. */
export type ResultRole = 'see' | 'unseen' | 'release';
