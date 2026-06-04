import type { ReactNode } from 'react';

/**
 * A selectable "page card" used for every option in the flow. Rendered as a
 * real <button> so it is reachable by keyboard and announced correctly; the
 * selected state is conveyed via aria-pressed (not colour alone).
 */
export default function OptionCard({
  label,
  icon,
  selected,
  onSelect,
}: {
  label: string;
  icon?: ReactNode;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      className={`option-card${selected ? ' is-selected' : ''}`}
      aria-pressed={selected}
      onClick={onSelect}
    >
      {icon && <span className="option-card__icon">{icon}</span>}
      <span className="option-card__label">{label}</span>
    </button>
  );
}
