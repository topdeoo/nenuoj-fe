import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import ViewUIPlus from 'view-ui-plus'

import App from './App.vue'
import router from './router'
import zh from '@/locales/zh'
import en from '@/locales/en'
import './assets/main.css'
import 'view-ui-plus/dist/styles/viewuiplus.css'

const i18n = createI18n({
  allowComposition: true,
  globalInjection: true,
  legacy: false,
  locale: 'zh-CN',
  fallbackLocale: 'en-US',
  messages: {
    'zh-CN': zh,
    'en-US': en,
  },
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(ViewUIPlus, {
    i18n
})


app.mount('#app')
