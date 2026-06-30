/* ─────────────────────────────────────────────
   useLocalStorage Hook
   Drop-in replacement for useState that persists
   to localStorage. Typed via generics.

   Usage:
     const [profile, setProfile] = useLocalStorage<GuestProfile | null>(
       'sm_guest_profile', null
     )
───────────────────────────────────────────── */

import { useState, useCallback } from 'react'

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void, () => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key)
      return item ? (JSON.parse(item) as T) : initialValue
    } catch {
      return initialValue
    }
  })

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      try {
        setStoredValue(prev => {
          const next = value instanceof Function ? value(prev) : value
          localStorage.setItem(key, JSON.stringify(next))
          return next
        })
      } catch (error) {
        console.error(`[useLocalStorage] Failed to set "${key}":`, error)
      }
    },
    [key]
  )

  const removeValue = useCallback(() => {
    try {
      localStorage.removeItem(key)
      setStoredValue(initialValue)
    } catch (error) {
      console.error(`[useLocalStorage] Failed to remove "${key}":`, error)
    }
  }, [key, initialValue])

  return [storedValue, setValue, removeValue]
}
