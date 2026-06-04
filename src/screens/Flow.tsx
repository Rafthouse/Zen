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
        /* ── Weather step: horizontal gallery (desktop/tablet) ── */
        <div className="weather-gallery" role="group" aria-labelledby="flow-question">
          {WEATHERS.map((opt) => (
            <OptionCard
              key={opt}
              label={t(`${step.ns}.${opt}`)}
              selected={current === opt}
              icon={<WeatherIcon weather={opt as Weather} />}
              onSelect={() => choose(opt)}
              className="weather-gallery__card"
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
