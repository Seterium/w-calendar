import { createApp } from 'vue'
import App from './App.vue'
import Vue3TouchEvents from 'vue3-touch-events'
import { registerSW } from 'virtual:pwa-register'

import '@/assets/styles/index.scss'


registerSW()

createApp(App)
  .use(Vue3TouchEvents)
  .mount('#app')