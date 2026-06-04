import { useI18n } from '@/i18n';
import { useTheme } from '@/theme/ThemeProvider';

/** A single quiet button that swaps paper ↔ candlelight. */
export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const { t } = useI18n();
  const next = theme === 'light' ? t('theme.toDark') : t('theme.toLight');

  return (
    <button
      type="button"
      className="icon-button"
      onClick={toggle}
      aria-label={`${t('theme.label')}: ${next}`}
      title={next}
    >
      {/* Sun for "go light", crescent for "go dark". */}
      {theme === 'light' ? (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <path
            d="M21 12.8A8.5 8.5 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
          <circle cx="12" cy="12" r="4.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
          <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
            <path d="M12 3v2.4M12 18.6V21M3 12h2.4M18.6 12H21M5.6 5.6l1.7 1.7M16.7 16.7l1.7 1.7M18.4 5.6l-1.7 1.7M7.3 16.7l-1.7 1.7" />
          </g>
        </svg>
      )}
    </button>
  );
}
