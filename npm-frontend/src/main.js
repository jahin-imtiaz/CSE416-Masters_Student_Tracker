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
    studentID: '',
    GPD: false,
    req: {}
  },
  getters: {
    getStudentID: (state) => {
      return state.studentID
    },
    isGPD: (state) => {
      return state.GPD
    }
  },
  mutations: {
    setReq(state, req) {
      state.req = req
    },
    setStudentID(state, id) {
      state.studentID = id
    },
    setGPD(state, GPD) {
      state.GPD = GPD
    }
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
