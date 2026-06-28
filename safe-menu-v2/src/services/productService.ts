/* ─────────────────────────────────────────────
   Product Service
   Single interface for all product data.
   Currently backed by TheMealDB (free, no key).
   To connect a real API: replace the fetch logic
   in this file only — all consumers stay the same.

   TheMealDB base URL: https://www.themealdb.com/api/json/v1/1/
───────────────────────────────────────────── */

import type { Product, ProductsResponse } from '../types/product'
import { detectAllergens } from './allergenDetector'

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1'

/* ── TheMealDB raw response types ── */
interface MealDbMeal {
  idMeal: string
  strMeal: string
  strCategory: string
  strArea: string
  strInstructions: string
  strMealThumb: string
  strTags: string | null
  [key: string]: string | null
}

interface MealDbListResponse {
  meals: MealDbMeal[] | null
}

interface MealDbSearchResponse {
  meals: MealDbMeal[] | null
}

/* ── Internal helpers ── */

/** Extract up to 20 ingredients from a TheMealDB meal object */
function extractIngredients(meal: MealDbMeal): string[] {
  const ingredients: string[] = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    if (ingredient && ingredient.trim()) {
      ingredients.push(ingredient.trim())
    }
  }

  return ingredients
}

/** Normalize a raw TheMealDB meal into our Product type */
function normalizeMeal(meal: MealDbMeal, shopId: string): Product {
  const ingredients = extractIngredients(meal)
  const allergens = detectAllergens(ingredients)

  return {
    id: `${shopId}-${meal.idMeal}`,
    name: meal.strMeal,
    description: meal.strInstructions
      ? meal.strInstructions.slice(0, 120).replace(/\n/g, ' ') + '...'
      : `A delicious ${meal.strCategory.toLowerCase()} dish.`,
    imageUrl: meal.strMealThumb,
    category: meal.strCategory,
    ingredients,
    allergens,
    shopId,
    externalId: meal.idMeal,
  }
}

/** Fetch meal IDs for a TheMealDB category, then fetch each meal's detail */
async function fetchMealsByCategory(
  category: string,
  shopId: string,
  limit = 8
): Promise<Product[]> {
  // Step 1: get list of meals in the category
  const listRes = await fetch(
    `${BASE_URL}/filter.php?c=${encodeURIComponent(category)}`
  )
  if (!listRes.ok) throw new Error(`TheMealDB list failed: ${listRes.status}`)

  const listData: MealDbListResponse = await listRes.json()
  if (!listData.meals) return []

  // Take first `limit` meals to keep the menu reasonably sized
  const mealIds = listData.meals.slice(0, limit).map(m => m.idMeal)

  // Step 2: fetch full details for each (ingredients only come from lookup)
  const detailRequests = mealIds.map(id =>
    fetch(`${BASE_URL}/lookup.php?i=${id}`)
      .then(r => r.json() as Promise<MealDbListResponse>)
      .then(data => {
        if (!data.meals?.[0]) return null
        return normalizeMeal(data.meals[0], shopId)
      })
      .catch(() => null) // Silently skip failed lookups
  )

  const results = await Promise.all(detailRequests)
  return results.filter((p): p is Product => p !== null)
}

/* ── Public API ── */

/**
 * Fetch all products for a given shop.
 * Merges results from all the shop's TheMealDB categories.
 */
export async function getProductsByShop(
  shopId: string,
  categories: string[]
): Promise<ProductsResponse> {
  const categoryResults = await Promise.all(
    categories.map(cat => fetchMealsByCategory(cat, shopId))
  )

  const products = categoryResults.flat()

  return {
    products,
    total: products.length,
    shopId,
  }
}

/**
 * Fetch a single product by its TheMealDB external ID.
 */
export async function getProductById(
  externalId: string,
  shopId: string
): Promise<Product | null> {
  const res = await fetch(`${BASE_URL}/lookup.php?i=${externalId}`)
  if (!res.ok) return null

  const data: MealDbListResponse = await res.json()
  if (!data.meals?.[0]) return null

  return normalizeMeal(data.meals[0], shopId)
}

/**
 * Search products by name across TheMealDB.
 * Results are tagged with the provided shopId.
 */
export async function searchProducts(
  query: string,
  shopId: string
): Promise<Product[]> {
  if (!query.trim()) return []

  const res = await fetch(
    `${BASE_URL}/search.php?s=${encodeURIComponent(query)}`
  )
  if (!res.ok) return []

  const data: MealDbSearchResponse = await res.json()
  if (!data.meals) return []

  return data.meals.slice(0, 20).map(m => normalizeMeal(m, shopId))
}
