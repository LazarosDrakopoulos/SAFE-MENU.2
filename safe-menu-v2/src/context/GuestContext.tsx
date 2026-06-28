/* ─────────────────────────────────────────────
   GuestContext
   Manages the guest profile: name, emergency
   contact, and selected allergens.
   Persists everything to localStorage.
───────────────────────────────────────────── */

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from 'react'
import type { GuestProfile } from '../types/user'
import type { AllergenId } from '../types/allergen'

const STORAGE_KEY = 'sm_guest_profile'

/* ── State ── */
interface GuestState {
  profile: GuestProfile | null
  isProfileComplete: boolean
}

/* ── Actions ── */
type GuestAction =
  | { type: 'SET_PROFILE'; payload: GuestProfile }
  | { type: 'UPDATE_ALLERGENS'; payload: AllergenId[] }
  | { type: 'TOGGLE_ALLERGEN'; payload: AllergenId }
  | { type: 'CLEAR_PROFILE' }

/* ── Reducer ── */
function guestReducer(state: GuestState, action: GuestAction): GuestState {
  switch (action.type) {
    case 'SET_PROFILE':
      return {
        profile: action.payload,
        isProfileComplete: true,
      }
    case 'UPDATE_ALLERGENS':
      if (!state.profile) return state
      return {
        ...state,
        profile: { ...state.profile, allergens: action.payload },
      }
    case 'TOGGLE_ALLERGEN': {
      if (!state.profile) return state
      const current = state.profile.allergens
      const updated = current.includes(action.payload)
        ? current.filter(a => a !== action.payload)
        : [...current, action.payload]
      return {
        ...state,
        profile: { ...state.profile, allergens: updated },
      }
    }
    case 'CLEAR_PROFILE':
      return { profile: null, isProfileComplete: false }
    default:
      return state
  }
}

/* ── Initial state from localStorage ── */
function getInitialState(): GuestState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const profile = JSON.parse(stored) as GuestProfile
      return { profile, isProfileComplete: true }
    }
  } catch {
    // Ignore parse errors
  }
  return { profile: null, isProfileComplete: false }
}

/* ── Context ── */
interface GuestContextValue {
  state: GuestState
  setProfile: (profile: GuestProfile) => void
  updateAllergens: (allergens: AllergenId[]) => void
  toggleAllergen: (id: AllergenId) => void
  clearProfile: () => void
}

const GuestContext = createContext<GuestContextValue | null>(null)

/* ── Provider ── */
export function GuestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(guestReducer, undefined, getInitialState)

  // Sync to localStorage whenever profile changes
  useEffect(() => {
    if (state.profile) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.profile))
    } else {
      localStorage.removeItem(STORAGE_KEY)
    }
  }, [state.profile])

  const setProfile = (profile: GuestProfile) =>
    dispatch({ type: 'SET_PROFILE', payload: profile })

  const updateAllergens = (allergens: AllergenId[]) =>
    dispatch({ type: 'UPDATE_ALLERGENS', payload: allergens })

  const toggleAllergen = (id: AllergenId) =>
    dispatch({ type: 'TOGGLE_ALLERGEN', payload: id })

  const clearProfile = () => dispatch({ type: 'CLEAR_PROFILE' })

  return (
    <GuestContext.Provider
      value={{ state, setProfile, updateAllergens, toggleAllergen, clearProfile }}
    >
      {children}
    </GuestContext.Provider>
  )
}

/* ── Hook ── */
export function useGuest(): GuestContextValue {
  const ctx = useContext(GuestContext)
  if (!ctx) throw new Error('useGuest must be used inside <GuestProvider>')
  return ctx
}
