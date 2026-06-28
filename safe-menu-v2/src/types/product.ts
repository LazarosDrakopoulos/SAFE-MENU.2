/* ─────────────────────────────────────────────
   Product Types
   Represents a single menu item.
   Normalized from TheMealDB or any future API.
───────────────────────────────────────────── */

import type { AllergenId } from './allergen'

export interface Product {
  id: string
  name: string
  description: string
  imageUrl: string
  category: string
  /** Raw ingredient strings (e.g. "plain flour", "whole milk") */
  ingredients: string[]
  /** Detected allergens, derived by allergenService */
  allergens: AllergenId[]
  /** Price in euros — optional, TheMealDB has none, shops may add */
  price?: number
  /** Source shop ID */
  shopId: string
  /** Original API source ID (for deep-links, caching) */
  externalId: string
}

export interface ProductsResponse {
  products: Product[]
  total: number
  shopId: string
}
