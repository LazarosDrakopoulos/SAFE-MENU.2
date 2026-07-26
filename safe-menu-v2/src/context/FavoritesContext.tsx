/* ─────────────────────────────────────────────
   FavoritesContext
   Stores favourite product IDs in localStorage.
   Products are identified by their externalId.
───────────────────────────────────────────── */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'sm_favourites'

interface FavoritesContextValue {
  favourites: string[]
  toggleFavourite: (externalId: string) => void
  isFavourite: (externalId: string) => boolean
  clearFavourites: () => void
}

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favourites, setFavourites] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as string[]) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
  }, [favourites])

  const toggleFavourite = (externalId: string) => {
    setFavourites(prev =>
      prev.includes(externalId)
        ? prev.filter(id => id !== externalId)
        : [...prev, externalId]
    )
  }

  const isFavourite = (externalId: string) => favourites.includes(externalId)

  const clearFavourites = () => setFavourites([])

  return (
    <FavoritesContext.Provider
      value={{ favourites, toggleFavourite, isFavourite, clearFavourites }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavourites(): FavoritesContextValue {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavourites must be used inside <FavoritesProvider>')
  return ctx
}
