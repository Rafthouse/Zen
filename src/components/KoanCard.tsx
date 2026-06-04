import { Link } from 'react-router-dom';
import type { Koan, ResultRole } from '@/types';
import { useI18n } from '@/i18n';
import { RoleIcon } from './InkIcon';

/**
 * A book-excerpt-style card shown on the results screen. It carries only the
 * essentials — role, title, a quiet snippet, author and source — and links to
 * the full reading. No interpretation, no commentary.
 *
 * The koan's title/text are resolved through the content-translation fallback
 * chain; when English stands in for a missing translation we show the small
 * "translation unavailable" note rather than hiding the fact.
 */
export default function KoanCard({ koan, role }: { koan: Koan; role: ResultRole }) {
  const { t, localize } = useI18n();
  const title = localize(koan.title);
  const body = localize(koan.text);

  // A gentle one-line snippet for the card; the full text lives on the koan page.
  const snippet = body.value.length > 180 ? `${body.value.slice(0, 178).trimEnd()}…` : body.value;

  return (
    <article className="koan-card">
      <header className="koan-card__head">
        <span className="koan-card__role">
          <RoleIcon role={role} />
          {t(`results.${role}`)}
        </span>
      </header>

      <h3 className="koan-card__title" lang={title.fallback ? 'en' : undefined}>
        {title.value}
      </h3>

      <p className="koan-card__snippet" lang={body.fallback ? 'en' : undefined}>
        {snippet}
      </p>

      <footer className="koan-card__meta">
        <span className="koan-card__attribution">
          {koan.author} · {koan.source}
        </span>
        <Link className="text-link" to={`/koan/${koan.id}`}>
          {t('results.open')} →
        </Link>
      </footer>
    </article>
  );
}
