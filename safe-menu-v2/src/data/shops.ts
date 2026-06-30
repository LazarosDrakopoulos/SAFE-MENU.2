/* ─────────────────────────────────────────────
   Shop Definitions
   Each shop has a visual identity (emoji, color)
   and maps to TheMealDB meal categories.
   Adding a real shop later = add one object here.
───────────────────────────────────────────── */

import type { Shop } from '../types/shop'

export const SHOPS: Shop[] = [
  {
    id: 'napoli',
    name: 'Napoli Cucina',
    description: 'Authentic Italian pasta, pizza-style dishes & more',
    emoji: '🍕',
    color: '#e63946',
    mealDbCategories: ['Pasta', 'Italian'],
    cuisine: 'Italian',
    isOpen: true,
    rating: 4.8,
    waitTime: 25,
  },
  {
    id: 'sweet-corner',
    name: 'Sweet Corner',
    description: 'Cakes, desserts and pastries baked fresh daily',
    emoji: '🎂',
    color: '#f4a261',
    mealDbCategories: ['Dessert'],
    cuisine: 'Bakery & Sweets',
    isOpen: true,
    rating: 4.6,
    waitTime: 10,
  },
  {
    id: 'grill-house',
    name: 'The Grill House',
    description: 'Premium grilled meats and hearty mains',
    emoji: '🥩',
    color: '#6b4226',
    mealDbCategories: ['Beef', 'Lamb'],
    cuisine: 'Grill & BBQ',
    isOpen: true,
    rating: 4.7,
    waitTime: 30,
  },
  {
    id: 'fresh-go',
    name: 'Fresh & Go',
    description: 'Light, healthy plates — salads, veggie & seafood',
    emoji: '🥗',
    color: '#2d6a4f',
    mealDbCategories: ['Vegetarian', 'Seafood'],
    cuisine: 'Healthy & Fresh',
    isOpen: true,
    rating: 4.5,
    waitTime: 15,
  },
  {
    id: 'boulangerie',
    name: 'Boulangerie',
    description: 'French-style breakfast, breads and morning bites',
    emoji: '🥐',
    color: '#e9c46a',
    mealDbCategories: ['Breakfast', 'Side'],
    cuisine: 'French Bakery',
    isOpen: false,
    rating: 4.9,
    waitTime: 10,
  },
]
