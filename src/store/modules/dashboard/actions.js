import Vue from 'vue'
export default {
  getIncomesByMonth ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http('/incomes/byMonth', { params })
                        .then(response => commit('SET_INCOMES_IN_STATE', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeIncome ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.post('/incomes/store', params)
                              .catch(error => {
                                console.log('error', error)
                              })
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteIncome ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.delete('/incomes/delete', { data: { id: params.id } })
                              .then(response => commit('DELETE_INCOME_FROM_STATE', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  actionPayIncomesSelected ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.put('/incomes/pay', params)
                              .then(commit('UPDATE_INCOME_STATUS_IN_STATE', params))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateIncome ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.put('/incomes/update', params)
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
