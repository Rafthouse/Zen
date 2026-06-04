import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import {
  FALLBACK_LANGUAGE,
  LANGUAGES,
  type LanguageCode,
  type LocalizedText,
} from '@/types';
import { readString, writeString } from '@/lib/storage';

import en from '@/locales/en.json';
import uk from '@/locales/uk.json';
import fr from '@/locales/fr.json';
import ja from '@/locales/ja.json';

/**
 * Interface-translation layer.
 *
 * Adding a new UI language requires ONLY: (1) drop a new file in /src/locales,
 * (2) import + register it in the `BUNDLES` map below, (3) add its code to
 * `LANGUAGES` in /src/types. No component or logic changes are needed.
 */
const BUNDLES: Record<LanguageCode, Record<string, unknown>> = { en, uk, fr, ja };

const STORAGE_KEY = 'zen.lang';

interface I18nValue {
  lang: LanguageCode;
  setLang: (lang: LanguageCode) => void;
  /** Translate a dotted UI key, e.g. t('weather.fog'). Falls back to English. */
  t: (key: string, params?: Record<string, string | number>) => string;
  /** Resolve a koan's localized field with the documented fallback chain. */
  localize: (text: LocalizedText | undefined) => { value: string; fallback: boolean };
}

const I18nContext = createContext<I18nValue | null>(null);

/** Look up a dotted path inside a nested object; returns undefined if absent. */
function lookup(bundle: Record<string, unknown>, key: string): string | undefined {
  const value = key.split('.').reduce<unknown>((node, part) => {
    if (node && typeof node === 'object' && part in (node as Record<string, unknown>)) {
      return (node as Record<string, unknown>)[part];
    }
    return undefined;
  }, bundle);
  return typeof value === 'string' ? value : undefined;
}

/** Replace {placeholders} in a template string. */
function interpolate(template: string, params?: Record<string, string | number>): string {
  if (!params) return template;
  return template.replace(/\{(\w+)\}/g, (_, name: string) =>
    name in params ? String(params[name]) : `{${name}}`,
  );
}

/** Pick a sensible initial language: stored choice -> browser -> English. */
function detectInitialLanguage(): LanguageCode {
  const stored = readString(STORAGE_KEY) as LanguageCode | null;
  if (stored && LANGUAGES.some((l) => l.code === stored)) return stored;

  const navLang = typeof navigator !== 'undefined' ? navigator.language.slice(0, 2) : '';
  const match = LANGUAGES.find((l) => l.code === navLang);
  return match ? match.code : FALLBACK_LANGUAGE;
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LanguageCode>(detectInitialLanguage);

  // Persist the choice and keep <html lang> in sync (screen readers + CSS).
  useEffect(() => {
    writeString(STORAGE_KEY, lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((next: LanguageCode) => setLangState(next), []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => {
      const value = lookup(BUNDLES[lang], key) ?? lookup(BUNDLES[FALLBACK_LANGUAGE], key) ?? key;
      return interpolate(value, params);
    },
    [lang],
  );

  // Koan-content fallback chain: requested language -> English -> any present.
  // Returns `fallback: true` when the requested language was unavailable so the
  // UI can show the small "Translation unavailable" indicator.
  const localize = useCallback(
    (text: LocalizedText | undefined) => {
      if (!text) return { value: '', fallback: false };
      if (text[lang]) return { value: text[lang] as string, fallback: false };
      if (text.en) return { value: text.en, fallback: lang !== FALLBACK_LANGUAGE };
      const firstAvailable = Object.values(text).find(Boolean);
      return { value: firstAvailable ?? '', fallback: true };
    },
    [lang],
  );

  const value = useMemo<I18nValue>(() => ({ lang, setLang, t, localize }), [lang, setLang, t, localize]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Access translation helpers. Must be used within <I18nProvider>. */
export function useI18n(): I18nValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within an I18nProvider');
  return ctx;
}
