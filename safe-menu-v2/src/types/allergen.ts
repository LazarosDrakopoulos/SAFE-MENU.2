/* ─────────────────────────────────────────────
   Allergen Types
   Central definition of all supported allergens.
   Extend this list to add new ones in future.
───────────────────────────────────────────── */

export const ALLERGEN_IDS = [
  'gluten',
  'milk',
  'eggs',
  'soy',
  'nuts',
  'sesame',
  'fish',
  'shellfish',
] as const

export type AllergenId = typeof ALLERGEN_IDS[number]

export interface Allergen {
  id: AllergenId
  label: string
  description: string
  emoji: string

  keywords: string[]
}
