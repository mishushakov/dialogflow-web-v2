import '@babel/polyfill'
import 'whatwg-fetch'

import Vue from 'vue'
import App from './Components/App/App.vue'

import config from './../config'
//import worker from './registerServiceWorker' // <- register service worker, disable it, when running in development mode

Vue.prototype.config = config // <- set config to global scope
Vue.prototype.lang = () => {
    return localStorage.getItem('lang') || 'en'
} // <- (global) currently selected language or fallback language (en). Needs to be a function, since it's reactive. No need for vuex there

new Vue({
    el: '#app',
    render: h => h(App)
}).$mount('#app')
