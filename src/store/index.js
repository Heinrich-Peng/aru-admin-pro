import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'
import menu from './modules/menu'
import getters from './getters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    menu
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
