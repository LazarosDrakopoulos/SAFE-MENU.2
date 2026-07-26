import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['smlogo.png', 'favicon.svg'],
      manifest: {
        name: 'Safe Menu',
        short_name: 'Safe Menu',
        description: 'Discover food that is safe for your allergies',
        theme_color: '#ff7b00',
        background_color: '#fff8f0',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/SAFE-MENU.2/',
        start_url: '/SAFE-MENU.2/',
        icons: [
          {
            src: 'smlogo.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable',
          },
          {
            src: 'smlogo.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            // Cache TheMealDB API responses
            urlPattern: /^https:\/\/www\.themealdb\.com\/api/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'themealdb-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24, // 24 hours
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            // Cache meal images
            urlPattern: /^https:\/\/www\.themealdb\.com\/images/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'meal-images-cache',
              expiration: {
                maxEntries: 200,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  base: '/SAFE-MENU.2/',
})