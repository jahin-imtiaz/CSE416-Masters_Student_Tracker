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
    studentID: '0000000000',
    req: {}
  },
  mutations: {
    setReq(state, req) {
      state.req = req
    },
    setStudentID(state, id) {
      state.studentID = id
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
