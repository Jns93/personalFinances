import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'
import subcategories from './modules/subcategories'
import expenses from './modules/expenses'
import incomes from './modules/incomes'

import { state, mutations } from './default'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    categories,
    subcategories,
    expenses,
    incomes,
  },
  state,
  mutations,
})

export default store
