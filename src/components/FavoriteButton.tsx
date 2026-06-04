import { useI18n } from '@/i18n';
import { useFavorites } from '@/hooks/useFavorites';

/** Toggles whether a koan is kept. The heart is an outline brush mark, filled
 *  with ink when kept. State is announced via aria-pressed + label. */
export default function FavoriteButton({ id }: { id: string }) {
  const { t } = useI18n();
  const { isFavorite, toggleFavorite } = useFavorites();
  const kept = isFavorite(id);

  return (
    <button
      type="button"
      className={`icon-button${kept ? ' is-active' : ''}`}
      aria-pressed={kept}
      aria-label={kept ? t('koan.removeFavorite') : t('koan.addFavorite')}
      title={kept ? t('koan.removeFavorite') : t('koan.addFavorite')}
      onClick={() => toggleFavorite(id)}
    >
      <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
        <path
          d="M12 20s-7-4.6-7-9.3A4 4 0 0 1 12 7a4 4 0 0 1 7 3.7C19 15.4 12 20 12 20Z"
          fill={kept ? 'currentColor' : 'none'}
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
