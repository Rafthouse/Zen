/**
 * Enso — the Zen circle, drawn as a single open brush stroke. The slight gap
 * and tapered ends are intentional: a perfect circle would feel mechanical;
 * the enso is "complete in its incompleteness". Purely decorative, so it is
 * hidden from assistive tech.
 */
export default function Enso({ size = 140 }: { size?: number }) {
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
        d="M62 24
           C40 14, 18 28, 18 50
           C18 74, 42 88, 64 80
           C82 73, 88 52, 78 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="4.2"
        strokeLinecap="round"
        pathLength={1}
      />
    </svg>
  );
}
