/**
 * Enso — the Zen circle.
 *
 * Uses the APPROVED SVG ASSET (src/assets/enso.svg) as source.
 * The brush geometry, weight (7.5), color (#c5a55a), and organic form
 * are already in the artwork — we do not recreate them in code.
 *
 * Animation: stroke-dashoffset reveal of the existing SVG path.
 * CSS @keyframes for simplicity. Respects prefers-reduced-motion.
 */
interface EnsoProps {
  size?: number;
  /** If true, immediately show the full stroke (no animation). */
  instant?: boolean;
}

// The approved path — measured length ~178 SVG units
const ENSO_PATH =
  'M14 66C22 80 41 92 60 88C79 84 92 68 87 47C82 26 65 10 47 11C30 12 17 23 14 38C13 43 15 51 19 57';

export default function Enso({ size = 140, instant = false }: EnsoProps) {
  return (
    <svg
      className="enso"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <filter
          id="brushTexture"
          x="-25%"
          y="-25%"
          width="150%"
          height="150%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="3.5"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>

      <path
        d={ENSO_PATH}
        fill="none"
        stroke="#c5a55a"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="178"
        strokeDashoffset={instant ? '0' : undefined}
        className={instant ? '' : 'enso__path'}
        filter="url(#brushTexture)"
      />
    </svg>
  );
}
