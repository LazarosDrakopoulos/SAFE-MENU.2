/* ─────────────────────────────────────────────
   Allergen Service
   Returns allergen metadata.
───────────────────────────────────────────── */

import type { Allergen, AllergenId } from '../types/allergen'
import { ALLERGENS } from '../data/allergens'

export async function getAllergens(): Promise<Allergen[]> {
  return ALLERGENS
}

export function getAllergenById(id: AllergenId): Allergen | undefined {
  return ALLERGENS.find(a => a.id === id)
}

export function getAllergenLabel(id: AllergenId): string {
  return ALLERGENS.find(a => a.id === id)?.label ?? id
}

export function getAllergenEmoji(id: AllergenId): string {
  return ALLERGENS.find(a => a.id === id)?.emoji ?? '⚠️'
}
