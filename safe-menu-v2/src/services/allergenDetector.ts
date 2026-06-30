/* ─────────────────────────────────────────────
   Allergen Detector
   Takes a list of ingredient strings (as returned
   by TheMealDB) and returns which allergen IDs
   are present, based on keyword matching.

   This is the single place where the detection
   logic lives. Improve keyword lists in
   data/allergens.ts — no other file changes needed.
───────────────────────────────────────────── */

import type { AllergenId } from '../types/allergen'
import { ALLERGENS } from '../data/allergens'

/**
 * Given a list of raw ingredient strings,
 * returns an array of allergen IDs detected.
 *
 * Matching is case-insensitive and checks if
 * any keyword appears as a substring of an ingredient.
 *
 * Example:
 *   detectAllergens(["plain flour", "whole milk", "free range eggs"])
 *   → ["gluten", "milk", "eggs"]
 */
export function detectAllergens(ingredients: string[]): AllergenId[] {
  if (!ingredients.length) return []

  // Normalize all ingredients to lowercase for matching
  const normalizedIngredients = ingredients
    .map(i => i.toLowerCase().trim())
    .filter(Boolean)

  const detected = new Set<AllergenId>()

  for (const allergen of ALLERGENS) {
    for (const keyword of allergen.keywords) {
      const keywordLower = keyword.toLowerCase()

      const isPresent = normalizedIngredients.some(ingredient =>
        ingredient.includes(keywordLower)
      )

      if (isPresent) {
        detected.add(allergen.id)
        break // No need to check more keywords for this allergen
      }
    }
  }

  return Array.from(detected)
}

/**
 * Given a list of user allergens and a product's allergens,
 * returns whether the product is safe to eat.
 */
export function isSafeForUser(
  productAllergens: AllergenId[],
  userAllergens: AllergenId[]
): boolean {
  if (!userAllergens.length) return true
  return !productAllergens.some(a => userAllergens.includes(a))
}

/**
 * Returns which of the user's allergens are present in a product.
 * Used for displaying "Contains: Milk, Gluten" warnings.
 */
export function getMatchingAllergens(
  productAllergens: AllergenId[],
  userAllergens: AllergenId[]
): AllergenId[] {
  return productAllergens.filter(a => userAllergens.includes(a))
}
