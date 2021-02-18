import Vue from 'vue'
export default {
  getTotalIncomesByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/incomes/amount-total', { params })
                        .then(response => commit('SET_TOTAL_AMOUNT_INCOMES_IN_STATE', response.data))
                        // .finally(() => commit('SET_PRELOADER', false))
  },

  getTotalExpensesByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/expenses/amount-total', { params })
                        .then(response => commit('SET_TOTAL_AMOUNT_EXPENSES_IN_STATE', response.data))
                        // .finally(() => commit('SET_PRELOADER', false))
  },

  getPercentageOfSavingsByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/percent-of-savings', { params })
                        .then(response => commit('SET_PERCENT_OF_SAVING_IN_STATE', response.data))
                        // .finally(() => commit('SET_PRELOADER', false))
  },

  getBalanceByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/balance', { params })
                        .then(response => commit('SET_BALANCE_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },
}
