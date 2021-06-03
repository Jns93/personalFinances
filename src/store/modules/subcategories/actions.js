import Vue from 'vue'
import { TOKEN_NAME } from '@/configs/api'

export default {
  getAllSubcategories ({ commit }) {

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http('/subcategories/all', {headers})
                        .then(response => commit('SET_SUBCATEGORIES', response.data))
  },

  getSubcategoriesByCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http('/subcategories', { params, headers })
                        .then(response => commit('SET_SUBCATEGORIES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeSubcategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.post('/subcategories/store', params, {headers})
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateSubcategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.put('/subcategories/update', params, {headers})
                              .then(response => commit('UPDATE_SUBCATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteSubcategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    const token = localStorage.getItem(TOKEN_NAME)
    const headers = {
      Authorization: `Bearer ${token}`
    }
    return Vue.prototype.$http.delete('/subcategories/delete', { data: { id: params.id }, headers })
                              .then(response => commit('DELETE_SUBCATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
