import Vue from 'vue'
export default {
  getExpenses ({ commit }) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http('/expenses')
                        .then(response => commit('SET_EXPENSES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  getExpensesByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http('/expenses/byMonth', { params })
                        .then(response => commit('SET_EXPENSES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.post('/expenses/store', params)
                              // .then(response => commit('STORE_EXPENSE', response.data))
                              .catch(error => {
                                console.log('error', error)
                              })
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http.delete('/expenses/delete', { data: { id: params.id } })
                              .then(response => commit('DELETE_EXPENSE', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  actionPayExpensesSelected ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http.put('/expenses/pay', params)
                              .then(commit('UPDATE_EXPENSE_STATUS', params))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.put('/expenses/update', params)
                              // .then(response => commit('UPDATE_EXPENSE', response.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
