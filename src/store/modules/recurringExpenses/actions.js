import { TOKEN_NAME } from '@/configs/api'

import Vue from 'vue'
export default {
  getRecurringExpenses ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    console.log(headers);
    return Vue.prototype.$http('/recurringExpenses', { params, headers })
                        .then(response => commit('SET_RECURRING_EXPENSES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeRecurringExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.post('/recurringExpenses/store', params, { headers })
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateRecurringExpense ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.put('/recurringExpenses/update', params, {headers})
                              .then(response => commit('UPDATE_RECURRING_EXPENSE', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteRecurringExpense ({ commit }, id) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.delete('/recurringExpenses/delete', { data: { id: id }, headers })
                              .then(response => commit('DELETE_RECURRING_EXPENSE', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
