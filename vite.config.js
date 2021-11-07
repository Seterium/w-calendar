import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { VitePWA } from 'vite-plugin-pwa'

import path from 'path'

const pwaConfig = {
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
    start_url: '/w-calendar',
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
}

export default defineConfig(({ command }) => ({
  build: {
    outDir: command === 'build' ? 'docs' : 'dist'
  },
  base: command === 'build' ? '/w-calendar/' : '/',
  plugins: [
    vue(),
    eslintPlugin(),
    VitePWA(pwaConfig)
  ],
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './node_modules'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/styles/variables";'
      }
    }
  }
}))
