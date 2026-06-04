import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { useFlow } from '@/flow/FlowContext';
import { koans } from '@/data/koans';
import { dailyKoan } from '@/lib/daily';
import { randomKoan } from '@/lib/matching';
import Enso from '@/components/Enso';

/**
 * The threshold. A full-bleed quiet field, the enso, the title, and a single
 * "Begin". Two understated side doors (a random teaching, the teaching of the
 * day) sit below for those who would rather not walk the whole path.
 */
export default function Home() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { reset } = useFlow();

  const today = dailyKoan(koans);

  const begin = () => {
    reset();
    navigate('/flow');
  };

  return (
    <section className="home" aria-labelledby="home-title">
      <div className="home__center">
        <Enso size={150} />
        <h1 id="home-title" className="home__title">
          {t('app.title')}
        </h1>
        <p className="home__tagline">{t('app.tagline')}</p>

        <button type="button" className="primary-button" onClick={begin}>
          {t('app.begin')}
        </button>

        <div className="home__side-doors">
          <button
            type="button"
            className="text-link"
            onClick={() => navigate(`/koan/${randomKoan(koans).id}`)}
          >
            {t('nav.randomKoan')}
          </button>
          <span aria-hidden="true" className="dot-sep">
            ·
          </span>
          <button
            type="button"
            className="text-link"
            onClick={() => navigate(`/koan/${today.id}`)}
          >
            {t('nav.dailyKoan')}
          </button>
        </div>
      </div>
    </section>
  );
}
