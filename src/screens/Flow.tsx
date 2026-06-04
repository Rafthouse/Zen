import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/i18n';
import { useFlow } from '@/flow/FlowContext';
import OptionCard from '@/components/OptionCard';
import { WeatherIcon } from '@/components/InkIcon';
import {
  WEATHERS,
  STATES,
  FOCUSES,
  DEPTHS,
  type Selection,
  type Weather,
} from '@/types';

/**
 * The four-step flow, rendered as turning pages. Each step is described
 * declaratively below — its dimension key, the options, and how to label them —
 * so adding or reordering a step is a data change, not new control flow.
 *
 * `field` is the key written into the shared Selection; `ns` is the i18n
 * namespace used for both the question and each option label.
 */
interface StepDef<K extends keyof Selection> {
  field: K;
  ns: string;
  options: NonNullable<Selection[K]>[];
}

// A tuple of steps, each preserving its own key type.
const STEPS = [
  { field: 'weather', ns: 'weather', options: WEATHERS } as StepDef<'weather'>,
  { field: 'state', ns: 'state', options: STATES } as StepDef<'state'>,
  { field: 'focus', ns: 'focus', options: FOCUSES } as StepDef<'focus'>,
  { field: 'depth', ns: 'depth', options: DEPTHS } as StepDef<'depth'>,
];

/**
 * Map each weather value to its position in the radial layout:
 *   Top:      Fog
 *   Upper-L:  Rain       Upper-R: Wind
 *   Lower-L:  Storm      Lower-R: Clear Sky
 */
const WEATHER_RADIAL_POS: Record<string, string> = {
  fog:   'pos-top',
  rain:  'pos-upper-left',
  wind:  'pos-upper-right',
  storm: 'pos-lower-left',
  clear: 'pos-lower-right',
};

export default function Flow() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { selection, setField } = useFlow();
  const [index, setIndex] = useState(0);

  const total = STEPS.length;
  const step = STEPS[index];
  const isLast = index === total - 1;
  const isWeatherStep = step.field === 'weather';


  const advance = () => {
    if (isLast) navigate('/results');
    else setIndex((i) => i + 1);
  };

  const back = () => {
    if (index === 0) navigate('/');
    else setIndex((i) => i - 1);
  };

  // Selecting an option records it and, for a calm single-tap rhythm, moves on.
  const choose = (value: string) => {
    setField(step.field, value as never);
    window.setTimeout(advance, 180);
  };

  const current = selection[step.field];

  return (
    <section className="flow" aria-labelledby="flow-question" key={step.field}>
      <p className="flow__counter">{t('step.counter', { n: index + 1, total })}</p>
      <h2 id="flow-question" className="flow__question">
        {t(`${step.ns}.question`)}
      </h2>

      {isWeatherStep ? (
        /* ── Weather step: radial Zen composition ── */
        <div className="weather-radial" role="group" aria-labelledby="flow-question">
          {/* Central Enso — decorative only, not interactive */}
          <div className="weather-radial__enso" aria-hidden="true">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="weather-radial__enso-svg">
              <path
                d="M 30 100 C 30 50, 60 20, 100 20 C 140 20, 170 50, 170 100 C 170 150, 140 180, 100 180 C 60 180, 30 150, 30 100 Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
            </svg>
            <span className="weather-radial__enso-label">Внутрішня погода</span>
          </div>

          {WEATHERS.map((opt) => (
            <OptionCard
              key={opt}
              label={t(`${step.ns}.${opt}`)}
              selected={current === opt}
              icon={<WeatherIcon weather={opt as Weather} />}
              onSelect={() => choose(opt)}
              className={`weather-radial__card weather-radial__card--${WEATHER_RADIAL_POS[opt] ?? ''}`}
            />
          ))}
        </div>
      ) : (
        /* ── Other steps: standard grid ── */
        <div className="option-grid" role="group" aria-labelledby="flow-question">
          {step.options.map((opt) => (
            <OptionCard
              key={opt}
              label={t(`${step.ns}.${opt}`)}
              selected={current === opt}
              icon={undefined}
              onSelect={() => choose(opt)}
            />
          ))}
        </div>
      )}

      <div className="flow__nav">
        <button type="button" className="text-link" onClick={back}>
          ← {t('nav.back')}
        </button>
        {current && (
          <button type="button" className="text-link" onClick={advance}>
            {isLast ? t('results.title') : t('nav.next')} →
          </button>
        )}
      </div>
    </section>
  );
}
