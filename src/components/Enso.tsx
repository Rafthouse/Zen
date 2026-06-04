/**
 * Enso — the Zen circle, a single continuous brush stroke.
 *
 * The path starts at ~7 o'clock (210°) and sweeps clockwise to ~1 o'clock (35°),
 * leaving a small intentional gap. The nearly-closed form and organic control
 * points simulate hand-painted brushwork.
 *
 * The animation is JS-controlled via requestAnimationFrame for precise timing,
 * easing, and stroke-dashoffset progress. The motion profile:
 *   - gentle start at ~7 o'clock
 *   - natural acceleration through the bottom arc
 *   - relaxed middle (right side)
 *   - slow, deliberate completion near the gap
 *
 * Duration: 3.2 seconds.
 * The final 7% of the stroke draws ~50% slower than the average pace.
 */
import { useEffect, useRef } from 'react';

interface EnsoProps {
  size?: number;
  /** If true, immediately show the full stroke (no animation). */
  instant?: boolean;
}

// SVG path — hand-tuned organic brush stroke.
// Starts at ~7-o'clock, sweeps clockwise to ~1-o'clock, nearly closing the circle.
const PATH_D =
  'M18.3 68.2C22 78 34 87 50 87.5c15 .5 29-9 34-21.5 4-11 2.5-27-6-39' +
  '-8-11-22-14.5-33-11-11 3-19 10-21 18';

// Approximate path length in user units (used for dashoffset animation)
const PATH_LENGTH = 165;

// Total animation duration in ms
const TOTAL_MS = 3200;

// Fraction of time where the slowdown begins (last 7% of path)
const SLOW_START_AT = 0.93;

/**
 * Custom easing that produces a hand-painted feel:
 * gentle ease-in, long steady middle, very slow finish.
 */
function easeHand(t: number): number {
  if (t <= SLOW_START_AT) {
    const nt = t / SLOW_START_AT;
    return nt < 0.5
      ? 4 * nt * nt * nt * SLOW_START_AT
      : SLOW_START_AT * (1 - Math.pow(-2 * nt + 2, 3) / 2);
  } else {
    const slowProgress = (t - SLOW_START_AT) / (1 - SLOW_START_AT);
    return SLOW_START_AT + (1 - SLOW_START_AT) * (1 - Math.pow(1 - slowProgress, 1.5));
  }
}

export default function Enso({ size = 140, instant = false }: EnsoProps) {
  const pathRef = useRef<SVGPathElement>(null);
  const startTimeRef = useRef<number>(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const prefersReducedMotion =
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const shouldAnimate = !instant && !prefersReducedMotion;

    if (!shouldAnimate) {
      if (pathRef.current) {
        pathRef.current.style.strokeDashoffset = '0';
        pathRef.current.style.opacity = '1';
      }
      return;
    }

    const path = pathRef.current;
    if (!path) return;

    path.style.strokeDasharray = String(PATH_LENGTH);
    path.style.strokeDashoffset = String(PATH_LENGTH);
    path.style.opacity = '1';

    function animate(timestamp: number) {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / TOTAL_MS, 1);

      const easedProgress = easeHand(progress);
      path!.style.strokeDashoffset = String(PATH_LENGTH * (1 - easedProgress));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        path!.style.strokeDashoffset = '0';
      }
    }

    // Small initial delay — the brush hovers before touching the page
    const hoverDelay = setTimeout(() => {
      startTimeRef.current = 0;
      rafRef.current = requestAnimationFrame(animate);
    }, 400);

    return () => {
      clearTimeout(hoverDelay);
      cancelAnimationFrame(rafRef.current);
    };
  }, [instant]);

  return (
    <svg
      className="enso"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
    >
      <path
        ref={pathRef}
        d={PATH_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="4.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0}
      />
    </svg>
  );
}
