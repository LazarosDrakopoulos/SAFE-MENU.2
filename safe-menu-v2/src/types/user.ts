/* ─────────────────────────────────────────────
   User Types
   Phase 1: Guest profile only.
   Phase 2: Full auth user extends this.
───────────────────────────────────────────── */

import type { AllergenId } from './allergen'

export type UserMode = 'guest' | 'authenticated'

export interface GuestProfile {
  firstName: string
  lastName: string
  emergencyContactName: string
  emergencyContactPhone: string
  allergens: AllergenId[]
  /** ISO timestamp of when the profile was created */
  createdAt: string
}

export interface AuthState {
  mode: UserMode | null   // null = not yet decided (on auth screen)
  guest: GuestProfile | null
  // Phase 2: add authenticated user here
}
