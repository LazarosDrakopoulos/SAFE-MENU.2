import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { UserMode } from '../types/user'

const STORAGE_KEY = 'sm_auth_mode'

interface AuthContextValue {
  mode: UserMode | null
  enterAsGuest: () => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<UserMode | null>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return (stored as UserMode) ?? null
  })

  const enterAsGuest = () => {
    setMode('guest')
    localStorage.setItem(STORAGE_KEY, 'guest')
  }

  const logout = () => {
    setMode(null)
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('sm_guest_profile')
    localStorage.removeItem('sm_selected_shop')
  }

  return (
    <AuthContext.Provider value={{ mode, enterAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>')
  return ctx
}
