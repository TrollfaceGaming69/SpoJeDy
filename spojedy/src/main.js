import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((reg) => {
        console.log('[SW] Service Worker registered with scope:', reg.scope)
      })
      .catch((err) => {
        console.warn('[SW] Service Worker registration failed:', err)
      })
  })
}

