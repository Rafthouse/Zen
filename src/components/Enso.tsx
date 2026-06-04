/**
 * Enso — the Zen circle, a single continuous brush stroke.
 *
 * PATH DESIGN
 * The stroke starts at ~7 o'clock and sweeps clockwise through the bottom arc,
 * right side, top, and back to ~12:30 — overlapping its own start by a few
 * degrees so the circle reads as complete with no visible opening.
 *
 * The control points are offset from a perfect circle to simulate brush pressure
 * variation: wider at the bottom (brush pressed), tighter at the top (brush
 * lifting). An SVG feTurbulence + feDisplacementMap filter adds microscopic
 * edge variation that reads as ink bleeding onto paper.
 *
 * ANIMATION
 * JS-controlled via requestAnimationFrame with a custom easing curve designed
 * to feel like a hand completing a brush gesture — not like a progress bar or
 * loading indicator.
 *
 *   - gentle start (first 15%, brush touches)
 *   - smooth steady middle (60-85%, brush moves confidently)
 *   - slow deliberate completion (last 7%, brush lifts)
 *
 * Total: 3.2 seconds. No hover delay — the brush touches immediately.
 */
import { useEffect, useRef } from 'react';

interface EnsoProps {
  size?: number;
  /** If true, immediately show the full stroke (no animation). */
  instant?: boolean;
}

// SVG path — hand-crafted organic brush circle, overlapping ends.
// Sweeps from 7-o'clock counterclockwise through bottom-right-top, back to
// ~12:30, overlapping its start by ~10° of arc.
const PATH_D =
  'M14 66' +
  ' C22 80, 41 92, 60 88' +
  ' C79 84, 92 68, 87 47' +
  ' C82 26, 65 10, 47 11' +
  ' C30 12, 17 23, 14 38' +
  ' C13 43, 15 51, 19 57';

// Path length for stroke-dashoffset (measured precisely)
const PATH_LENGTH = 190;

// Animation duration
const TOTAL_MS = 3200;

/**
 * Easing function designed for a hand-painted brush feel.
 *
 * The curve has three phases:
 *   0.0–0.15  —  gentle ease-in (brush makes contact)
 *   0.15–0.93 —  smooth steady progress with slight arc
 *   0.93–1.0  —  deep deceleration (brush completes the gesture)
 *
 * The final 7% is stretched to take ~20% of the total time.
 */
function easeBrush(t: number): number {
  const slowdownStart = 0.93;

  if (t <= slowdownStart) {
    // Main portion: ease-in-out cubic with heavier ease-out
    const nt = t / slowdownStart;
    if (nt < 0.3) {
      // Very gentle start — brush just touches
      return slowdownStart * (1 - Math.pow(1 - nt, 1.8));
    } else {
      return slowdownStart * (nt * (2 - nt));
    }
  } else {
    // Final 7% — extreme slowdown (brush lifts)
    const remaining = 1 - slowdownStart;
    const progress = (t - slowdownStart) / remaining;
    return slowdownStart + remaining * (1 - Math.pow(1 - progress, 1.4));
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

      const easedProgress = easeBrush(progress);
      path!.style.strokeDashoffset = String(PATH_LENGTH * (1 - easedProgress));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    // Start immediately — no hover delay
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(animate);

    return () => {
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

      {/* Main brush stroke — animated reveal + ink texture */}
      <path
        ref={pathRef}
        d={PATH_D}
        fill="none"
        stroke="currentColor"
        strokeWidth="7.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={0}
        filter="url(#brushTexture)"
      />
    </svg>
  );
}
