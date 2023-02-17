import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './axios.js'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.prototype.$axios = axios

Vue.use(Vuex)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
