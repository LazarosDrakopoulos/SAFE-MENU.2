import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from 'react'
import type { Shop } from '../types/shop'

const STORAGE_KEY = 'sm_selected_shop'

interface ShopContextValue {
  selectedShop: Shop | null
  selectShop: (shop: Shop) => void
  clearShop: () => void
}

const ShopContext = createContext<ShopContextValue | null>(null)

export function ShopProvider({ children }: { children: ReactNode }) {
  const [selectedShop, setSelectedShop] = useState<Shop | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? (JSON.parse(stored) as Shop) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (selectedShop) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedShop))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [selectedShop])

  const selectShop = (shop: Shop) => setSelectedShop(shop)
  const clearShop = () => setSelectedShop(null)

  return (
    <ShopContext.Provider value={{ selectedShop, selectShop, clearShop }}>
      {children}
    </ShopContext.Provider>
  )
}

export function useShop(): ShopContextValue {
  const ctx = useContext(ShopContext)
  if (!ctx) throw new Error('useShop must be used inside <ShopProvider>')
  return ctx
}
