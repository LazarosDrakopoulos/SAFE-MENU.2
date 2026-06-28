/* ─────────────────────────────────────────────
   Shop Service
   Returns shop data. Currently from in-memory
   config. Replace body of these functions to
   connect a real API.
───────────────────────────────────────────── */

import type { Shop } from '../types/shop'
import { SHOPS } from '../data/shops'

export async function getShops(): Promise<Shop[]> {
  // Simulate network latency in development
  await new Promise(r => setTimeout(r, 200))
  return SHOPS
}

export async function getShopById(id: string): Promise<Shop | null> {
  await new Promise(r => setTimeout(r, 100))
  return SHOPS.find(s => s.id === id) ?? null
}
