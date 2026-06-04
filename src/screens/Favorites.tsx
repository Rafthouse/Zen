import { Link } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { useFavorites } from '@/hooks/useFavorites';
import { getKoanById } from '@/data/koans';

/**
 * The kept teachings — a quiet shelf. Reads ids from localStorage and resolves
 * each to its koan; ids that no longer exist in the corpus are silently skipped.
 */
export default function Favorites() {
  const { t, localize } = useI18n();
  const { favorites } = useFavorites();

  const items = favorites.map(getKoanById).filter(Boolean);

  return (
    <section className="favorites" aria-labelledby="fav-title">
      <h2 id="fav-title" className="favorites__title">
        {t('favorites.title')}
      </h2>

      {items.length === 0 ? (
        <p className="favorites__empty">{t('favorites.empty')}</p>
      ) : (
        <ul className="favorites__list">
          {items.map((koan) => {
            const title = localize(koan!.title);
            return (
              <li key={koan!.id}>
                <Link className="favorites__item" to={`/koan/${koan!.id}`}>
                  <span className="favorites__item-title" lang={title.fallback ? 'en' : undefined}>
                    {title.value}
                  </span>
                  <span className="favorites__item-meta">
                    {koan!.author} · {koan!.source}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
