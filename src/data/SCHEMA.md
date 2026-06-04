# Koan corpus — data schema

All teachings live in [`koans.json`](./koans.json) as a flat JSON array. The app
loads the whole array once at startup (see [`koans.ts`](./koans.ts)). The schema
is deliberately small and stable so the corpus can grow to thousands of entries
and gain new languages **without any change to application logic**.

## Why these decisions

- **Content is never generated.** Every entry is a transcription of an existing
  public-domain story or saying. The `source` is mandatory and always shown to
  the reader.
- **Two independent translation layers.** UI strings live in `/src/locales/*`.
  Koan prose lives in the `title`/`text` objects below. They never depend on
  each other — see [the i18n provider](../i18n/index.tsx).
- **Matching only ever reads tags.** The weighted matcher
  ([`matching.ts`](../lib/matching.ts)) touches `weather`, `state`, `focus` and
  `depth` — never the prose. Adding a language cannot affect matching.

## Entry shape

```jsonc
{
  "id": "empty_cup",            // string, unique, stable. Used for URLs + favorites.
  "title": {                    // LocalizedText — "en" is REQUIRED, others optional.
    "en": "A Cup of Tea",
    "uk": "Чашка чаю",          // any subset of: uk | en | fr | ja | pl (+ future codes)
    "fr": "Une tasse de thé",
    "ja": "一杯の茶",
    "pl": "Filiżanka herbaty"
  },
  "text": {                     // LocalizedText — the body. "en" is REQUIRED.
    "en": "Nan-in ...\nLike this cup ...",   // \n separates paragraphs
    "uk": "..."
  },
  "author": "Nan-in",           // string. Use "Unknown" / a tradition name if unknown.
  "source": "101 Zen Stories (1919) ...",    // string, REQUIRED, always shown.
  "tradition": "Japanese Zen",  // string, optional.
  "originalLanguage": "en",     // one of: uk | en | fr | ja | pl. The language it was recorded in.
  "originalText": "趙州 ...",    // string, optional. The verbatim original; never overwritten.

  // ---- matching tags ----
  "depth":   "short",                  // one of: "line" | "short" | "koan"
  "weather": ["fog", "clear"],         // subset of: fog | rain | wind | clear | storm
  "state":   ["searching", "finding"], // subset of: searching | waiting | struggling | losing | finding
  "focus":   ["myself"]                // subset of: myself | other | work | future | past
}
```

The canonical TypeScript definition of all of this is
[`/src/types/index.ts`](../types/index.ts). The tag vocabularies (`WEATHERS`,
`STATES`, `FOCUSES`, `DEPTHS`) and the `LanguageCode` union live there too — that
file is the single source of truth, and the validator below checks `koans.json`
against it.

## Fallback rules (handled for you)

When a reader's language is missing for a given `title`/`text`, the UI:

1. falls back to the English (`en`) version, then to any available language;
2. shows a small "Translation unavailable" note on the koan page;
3. never breaks.

So it is completely fine to ship an entry with **only** `en` prose. Add `uk`,
`fr`, `ja` (or a future language) whenever a good translation exists.

## Adding teachings

1. Append a new object to `koans.json` following the shape above.
2. Pick an unused `id`.
3. Give at least `title.en`, `text.en`, `author`, `source`, `originalLanguage`,
   `depth`, and at least one tag in each of `weather` / `state` / `focus`.
4. Run `npm run validate:koans` to check it.

## Adding a language

1. Create `/src/locales/<code>.json` (copy `en.json` and translate the UI).
2. Register it in [`/src/i18n/index.tsx`](../i18n/index.tsx) (`BUNDLES`) and add
   the code to `LANGUAGES` in [`/src/types/index.ts`](../types/index.ts).
3. Optionally add `<code>` keys to any koan `title`/`text`. Untranslated koans
   fall back automatically.

No component or algorithm needs to change.
