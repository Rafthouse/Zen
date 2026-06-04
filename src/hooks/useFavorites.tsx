import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { readJSON, writeJSON } from '@/lib/storage';

/**
 * Favorites are simply a list of koan ids kept in localStorage. We store ids
 * (not whole koans) so that edits to the corpus are always reflected and the
 * stored data stays tiny. No accounts, no sync, no server.
 */
const STORAGE_KEY = 'zen.favorites';

interface FavoritesValue {
  favorites: string[];
  isFavorite: (id: string) => boolean;
  toggleFavorite: (id: string) => void;
}

const FavoritesContext = createContext<FavoritesValue | null>(null);

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(() => readJSON<string[]>(STORAGE_KEY, []));

  useEffect(() => {
    writeJSON(STORAGE_KEY, favorites);
  }, [favorites]);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [id, ...prev]));
  }, []);

  const value = useMemo<FavoritesValue>(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites, isFavorite, toggleFavorite],
  );
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites(): FavoritesValue {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
  return ctx;
}
