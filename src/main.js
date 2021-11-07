import { createApp } from 'vue'
import App from './App.vue'
import Vue3TouchEvents from 'vue3-touch-events'

import '@/assets/styles/index.scss'

const app = createApp(App)

app.use(Vue3TouchEvents)

app.mount('#app')