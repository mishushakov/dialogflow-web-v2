import { createApp } from 'vue'
import App from './App.vue'

import config from './config'
import translations from './translations/translations.json'
import { registerServiceWorker } from './utils'

const app = createApp(App)

registerServiceWorker()

app.config.globalProperties.config = config // <- set config to global scope
app.config.globalProperties.translations = translations // <- set translations to global scope

/* (global) This code is going to tell us, if history mode can be activated on the client, so the application can be consumed without sessionStorage */
app.config.globalProperties.history = () => {
  try {
    sessionStorage.getItem('check')
    return true
  } catch {
    return false
  }
}

/* (global) Currently selected language or fallback language (en). Needs to be a function, since it's reactive. No need for vuex there */
app.config.globalProperties.lang = () => {
  if (app.config.globalProperties.history()) return sessionStorage.getItem('lang') || config.fallback_lang
  return config.fallback_lang
}

/* (global) Debug mode */
app.config.globalProperties.debug = () => process.env.NODE_ENV === 'development'
app.mount('#app')
