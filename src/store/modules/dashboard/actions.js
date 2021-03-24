import Vue from 'vue'
export default {
  getTotalIncomesByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/incomes/amount-total', { params })
                        .then(response => commit('SET_TOTAL_AMOUNT_INCOMES_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getTotalExpensesByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/expenses/amount-total', { params })
                        .then(response => commit('SET_TOTAL_AMOUNT_EXPENSES_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getPercentageOfSavingsByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/percent-of-savings', { params })
                        .then(response => commit('SET_PERCENT_OF_SAVING_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getBalanceByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/balance', { params })
                        .then(response => commit('SET_BALANCE_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getBalanceGoalByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/balance-goal-by-month', { params })
                        .then(response => commit('SET_BALANCE_GOAL_BY_MONTH_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getAverageIncomesByYear ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/incomes/average-incomes-by-Year', { params })
                        .then(response => commit('SET_AVERAGE_INCOMES_BY_YEAR_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getAverageExpensesByYear ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/expenses/average-expenses-by-Year', { params })
                        .then(response => commit('SET_AVERAGE_EXPENSES_BY_YEAR_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getAveragePercentOfSavingByYear ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/average-percent-of-saving-by-Year', { params })
                        .then(response => commit('SET_AVERAGE_PERCENT_OF_SAVING_BY_YEAR_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getIncomesYearChart ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/incomes/incomes-year-for-chart', { params })
                        .then(response => commit('SET_INCOMES_YEAR_CHART_IN_STATE', response.data))
                        // .finally(() =>
                        // setTimeout(function() {
                        //   commit('SET_PRELOADER', false)
                        // }, 0))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getExpensesYearChart ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/expenses/expenses-year-for-chart', { params })
                        .then(response => commit('SET_EXPENSES_YEAR_CHART_IN_STATE', response.data))
                        // .finally(() =>
                        // setTimeout(function() {
                        //   commit('SET_PRELOADER', false)
                        // }, 2000))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getExpensesToBeDue ({ commit }) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/expenses/expenses-to-be-due')
                        .then(response => commit('SET_EXPENSES_TO_BE_DUE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getIncomesToBeDue ({ commit }) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/dashboard/incomes/incomes-to-be-due')
                        .then(response => commit('SET_INCOMES_TO_BE_DUE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  }
}
