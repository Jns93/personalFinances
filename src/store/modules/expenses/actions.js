import { TOKEN_NAME } from '@/configs/api'

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

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http('/expenses/byMonth', { params, headers })
                        .then(response => commit('SET_EXPENSES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.post('/expenses/store', params, {headers})
                              // .then(response => commit('STORE_EXPENSE', response.data))
                              .catch(error => {
                                console.log('error', error)
                              })
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.delete('/expenses/delete', { data: { id: params.id }, headers })
                              .then(response => commit('DELETE_EXPENSE', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  actionPayExpensesSelected ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.put('/expenses/pay', params, {headers})
                              .then(commit('UPDATE_EXPENSE_STATUS', params, {headers}))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.put('/expenses/update', params, {headers})
                              // .then(response => commit('UPDATE_EXPENSE', response.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
