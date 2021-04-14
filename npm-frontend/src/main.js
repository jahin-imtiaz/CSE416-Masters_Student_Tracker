import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import Vuex from 'vuex'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import './env'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    req: {}
  },
  mutations: {
    setReq(state, req) {
      state.req = req
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
