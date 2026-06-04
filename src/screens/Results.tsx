import { useMemo } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { useFlow } from '@/flow/FlowContext';
import { koans } from '@/data/koans';
import { selectThree, randomKoan } from '@/lib/matching';
import KoanCard from '@/components/KoanCard';
import type { ResultRole } from '@/types';

const ROLES: ResultRole[] = ['see', 'unseen', 'release'];

/**
 * The emotional centre. Three teachings chosen by weighted tag-matching (see
 * lib/matching) and mapped to three contemplative roles. If the flow was never
 * walked we return home; if nothing matched we offer to begin again or read at
 * random. Selection is memoised so the trio stays stable across re-renders.
 */
export default function Results() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { selection, hasAnySelection, reset } = useFlow();

  const trio = useMemo(() => selectThree(koans, selection), [selection]);

  if (!hasAnySelection) return <Navigate to="/" replace />;

  const startOver = () => {
    reset();
    navigate('/flow');
  };

  return (
    <section className="results" aria-labelledby="results-title">
      <h2 id="results-title" className="results__title">
        {t('results.title')}
      </h2>

      {trio ? (
        <div className="results__stack">
          {ROLES.map((role) => (
            <KoanCard key={role} role={role} koan={trio[role]} />
          ))}
        </div>
      ) : (
        <p className="results__empty">{t('results.empty')}</p>
      )}

      <div className="results__actions">
        <button type="button" className="text-link" onClick={startOver}>
          {t('nav.startOver')}
        </button>
        <span aria-hidden="true" className="dot-sep">
          ·
        </span>
        <button
          type="button"
          className="text-link"
          onClick={() => navigate(`/koan/${randomKoan(koans).id}`)}
        >
          {t('nav.randomKoan')}
        </button>
      </div>
    </section>
  );
}
