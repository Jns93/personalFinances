import { TOKEN_NAME } from '@/configs/api'

import Vue from 'vue'
export default {
  getCategories ({ commit }) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http('/categories', {headers})
                        .then(response => commit('SET_CATEGORIES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.post('/categories/store', params, {headers})
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.put('/categories/update', params, {headers})
                              .then(response => commit('UPDATE_CATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.delete('/categories/delete', { data: { id: params.id }, headers })
                              .then(response => commit('DELETE_CATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
