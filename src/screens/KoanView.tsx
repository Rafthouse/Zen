import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { getKoanById } from '@/data/koans';
import { FALLBACK_LANGUAGE } from '@/types';
import FavoriteButton from '@/components/FavoriteButton';

/**
 * Opening a koan should feel like opening a page: wide margins, literary type,
 * and nothing competing for attention. We show title, author, tradition, the
 * text, and — always — the source. The original-language text is preserved and
 * shown beneath the translation when the two differ.
 */
export default function KoanView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, lang, localize } = useI18n();

  const koan = id ? getKoanById(id) : undefined;
  if (!koan) return <Navigate to="/" replace />;

  const title = localize(koan.title);
  const body = localize(koan.text);

  // Show the original only when it adds something: the reader is not currently
  // reading the original language, and we actually hold an original text.
  const showOriginal =
    !!koan.originalText && koan.originalLanguage !== lang && koan.originalLanguage !== FALLBACK_LANGUAGE;

  return (
    <article className="koan-view">
      <div className="koan-view__top">
        <button type="button" className="text-link" onClick={() => navigate(-1)}>
          ← {t('koan.back')}
        </button>
        <FavoriteButton id={koan.id} />
      </div>

      <h1 className="koan-view__title" lang={title.fallback ? 'en' : undefined}>
        {title.value}
      </h1>

      <p className="koan-view__byline">
        {t('koan.by')} {koan.author}
        {koan.tradition ? ` · ${koan.tradition}` : ''}
      </p>

      {body.fallback && (
        <p className="koan-view__note" role="note">
          {t('koan.translationUnavailable')}
        </p>
      )}

      <div className="koan-view__text" lang={body.fallback ? 'en' : undefined}>
        {body.value.split('\n').map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {showOriginal && (
        <div className="koan-view__original" lang={koan.originalLanguage}>
          <h2 className="koan-view__original-label">{t('koan.original')}</h2>
          {koan.originalText!.split('\n').map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      )}

      <footer className="koan-view__source">
        <span>
          {t('koan.source')}: {koan.source}
        </span>
      </footer>
    </article>
  );
}
