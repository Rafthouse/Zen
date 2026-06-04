import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { Selection } from '@/types';

/**
 * Holds the four answers gathered during the flow (Inner Weather → Depth).
 * Kept in memory only — the flow is a transient act of attention, not data
 * worth persisting. Results read this; if it is empty the user is sent home.
 */
interface FlowValue {
  selection: Selection;
  setField: <K extends keyof Selection>(key: K, value: Selection[K]) => void;
  reset: () => void;
  hasAnySelection: boolean;
}

const FlowContext = createContext<FlowValue | null>(null);

export function FlowProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection>({});

  const setField = useCallback(
    <K extends keyof Selection>(key: K, value: Selection[K]) => {
      setSelection((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const reset = useCallback(() => setSelection({}), []);

  const hasAnySelection = useMemo(
    () => Object.values(selection).some(Boolean),
    [selection],
  );

  const value = useMemo<FlowValue>(
    () => ({ selection, setField, reset, hasAnySelection }),
    [selection, setField, reset, hasAnySelection],
  );
  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>;
}

export function useFlow(): FlowValue {
  const ctx = useContext(FlowContext);
  if (!ctx) throw new Error('useFlow must be used within a FlowProvider');
  return ctx;
}
