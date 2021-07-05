import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import subcategories from './modules/subcategories'
import expenses from './modules/expenses'
import incomes from './modules/incomes'
import dashboard from './modules/dashboard'
import auth from './modules/auth/auth'

import { state, mutations, getters, actions } from './default'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    categories,
    subcategories,
    expenses,
    incomes,
    dashboard,
    auth,
  },
  state,
  mutations,
  getters,
  actions
})

export default store
