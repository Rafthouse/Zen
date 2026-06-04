import type { Weather, ResultRole } from '@/types';

/**
 * Monochrome, brush-inspired line illustrations. Everything is drawn with
 * `currentColor` so the icon simply inherits the ink colour of its context and
 * works in both themes. Icons are decorative; the option label carries meaning,
 * so they are aria-hidden.
 */

const common = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <svg className="ink-icon" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      {children}
    </svg>
  );
}

/** Weather icons — soft, ink-wash gestures rather than literal weather glyphs. */
const weatherIcons: Record<Weather, React.ReactNode> = {
  // Fog — a soft mountain silhouette behind drifting bands.
  fog: (
    <>
      <path {...common} d="M6 30 L18 16 L26 26 L34 14 L44 30" />
      <path {...common} d="M8 36 H40" opacity={0.6} />
      <path {...common} d="M12 41 H36" opacity={0.4} />
    </>
  ),
  // Rain — an ink cloud with falling strokes.
  rain: (
    <>
      <path {...common} d="M14 24 a8 8 0 0 1 16 -2 a6 6 0 0 1 2 12 H16 a6 6 0 0 1 -2 -10" />
      <path {...common} d="M18 38 L16 43" />
      <path {...common} d="M25 38 L23 43" />
      <path {...common} d="M32 38 L30 43" />
    </>
  ),
  // Wind — two trailing brush strokes.
  wind: (
    <>
      <path {...common} d="M6 20 H30 a5 5 0 1 0 -5 -5" />
      <path {...common} d="M6 28 H36 a5 5 0 1 1 -5 5" />
    </>
  ),
  // Clear sky — a sun behind a band of mist.
  clear: (
    <>
      <circle {...common} cx="24" cy="22" r="9" />
      <path {...common} d="M10 36 H38" />
      <path {...common} d="M14 41 H34" opacity={0.6} />
    </>
  ),
  // Storm — a single lightning stroke under a heavy cloud.
  storm: (
    <>
      <path {...common} d="M14 22 a8 8 0 0 1 16 -2 a6 6 0 0 1 2 12 H16 a6 6 0 0 1 -2 -10" />
      <path {...common} d="M24 30 L20 38 H26 L22 44" />
    </>
  ),
};

export function WeatherIcon({ weather }: { weather: Weather }) {
  return <Frame>{weatherIcons[weather]}</Frame>;
}

/** Small marks for the three result roles. */
const roleIcons: Record<ResultRole, React.ReactNode> = {
  // See now — an open eye.
  see: (
    <>
      <path {...common} d="M6 24 C14 14, 34 14, 42 24 C34 34, 14 34, 6 24 Z" />
      <circle {...common} cx="24" cy="24" r="4" />
    </>
  ),
  // May not see — a crescent / partly hidden moon.
  unseen: <path {...common} d="M30 8 a16 16 0 1 0 0 32 a13 13 0 0 1 0 -32 Z" />,
  // May be released — an open hand letting a stroke fall.
  release: (
    <>
      <path {...common} d="M10 38 q14 -10 28 0" />
      <path {...common} d="M24 8 V26" />
      <path {...common} d="M20 20 L24 26 L28 20" />
    </>
  ),
};

export function RoleIcon({ role }: { role: ResultRole }) {
  return <Frame>{roleIcons[role]}</Frame>;
}
