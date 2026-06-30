/* ─────────────────────────────────────────────
   Shop Types
   A "shop" is a venue the user selects before
   browsing the menu. Each shop maps to one or
   more TheMealDB categories.
───────────────────────────────────────────── */

export interface Shop {
  id: string
  name: string
  description: string
  /** Emoji used as visual identity in the shop card */
  emoji: string
  /** Accent color for the shop card */
  color: string
  /** TheMealDB category names to fetch for this shop */
  mealDbCategories: string[]
  cuisine: string
  isOpen: boolean
  /** Rating out of 5 */
  rating: number
  /** Estimated delivery/wait time in minutes */
  waitTime: number
}

export interface Category {
  id: string
  label: string
  emoji: string
}
