import Vue from 'vue'
import { TOKEN_NAME } from '@/configs/api'

export default {
  getIncomesByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http('/incomes/byMonth', { params, headers })
                        .then(response => commit('SET_INCOMES_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeIncome ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.post('/incomes/store', params, {headers})
                              .catch(error => {
                                console.log('error', error)
                              })
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteIncome ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.delete('/incomes/delete', { data: { id: params.id }, headers })
                              .then(response => commit('DELETE_INCOME_FROM_STATE', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  actionPayIncomesSelected ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.put('/incomes/pay', params)
                              .then(commit('UPDATE_INCOME_STATUS_IN_STATE', params, {headers}))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateIncome ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.put('/incomes/update', params, {headers})
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
