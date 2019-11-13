import Vue from 'vue'
import App from './Components/App/App.vue'

import config from './config'
import { register_service_worker } from './utils'

register_service_worker()

Vue.config.productionTip = false
Vue.prototype.config = config // <- set config to global scope

/* (global) This code is going to tell us, if history mode can be activated on the client, so the application can be consumed without localstorage */
Vue.prototype.history = () => {
    try {
        localStorage.getItem('check')
        return true
    }

    catch {
        return false
    }
}

/* (global) Currently selected language or fallback language (en). Needs to be a function, since it's reactive. No need for vuex there */
Vue.prototype.lang = () => {
    if (Vue.prototype.history()) return localStorage.getItem('lang') || config.app.fallback_lang
    return config.app.fallback_lang
}

new Vue({render: h => h(App)}).$mount('#app')