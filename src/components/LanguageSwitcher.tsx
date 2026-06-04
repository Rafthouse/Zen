import { useI18n } from '@/i18n';
import { LANGUAGES, type LanguageCode } from '@/types';

/**
 * A plain native <select>. It is keyboard- and screen-reader-friendly by
 * default, needs no JS menu, and stays quiet visually — exactly what a
 * monastery library would want. Available from every screen via the header.
 */
export default function LanguageSwitcher() {
  const { lang, setLang, t } = useI18n();

  return (
    <label className="lang-switcher">
      <span className="visually-hidden">{t('language.label')}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as LanguageCode)}
        aria-label={t('language.label')}
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
