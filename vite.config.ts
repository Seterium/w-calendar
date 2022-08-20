import path from 'path'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig(({ command }) => ({
  build: {
    outDir: command === 'build'
      ? 'docs'
      : 'dist'
  },
  base: command === 'build'
    ? '/w-calendar/'
    : '/',
  plugins: [
    vue(),
    svgLoader(),
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        clientsClaim: true,
        skipWaiting: true
      },
      includeAssets: [
        'favicon.ico',
        'robots.txt',
        '/fonts/RussoOne.woff',
        '/fonts/RussoOne.woff2',
      ],
      manifest: {
        name: 'Рабочий календарь',
        short_name: 'Рабочий календарь',
        description: 'Рабочий календарь',
        theme_color: '#ffffff',
        lang: 'ru',
        icons: [
          {
            src: '/w-calendar/pwa/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/w-calendar/pwa/icon-256x256.png',
            sizes: '256x256',
            type: 'image/png'
          },
          {
            src: '/w-calendar/pwa/icon-384x384.png',
            sizes: '384x384',
            type: 'image/png'
          },
          {
            src: '/w-calendar/pwa/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  }
}))
