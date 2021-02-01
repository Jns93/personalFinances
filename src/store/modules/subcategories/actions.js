import Vue from 'vue'
export default {
  getAllSubcategories ({ commit }) {
    return Vue.prototype.$http('/subcategories/all')
                        .then(response => commit('SET_SUBCATEGORIES', response.data))
  },

  getSubcategoriesByCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http('/subcategories', { params })
                        .then(response => commit('SET_SUBCATEGORIES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeSubcategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http.post('/subcategories/store', params)
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateSubcategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http.put('/subcategories/update', params)
                              .then(response => commit('UPDATE_SUBCATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteSubcategory ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.delete('/subcategories/delete', { data: { id: params.id } })
                              .then(response => commit('DELETE_SUBCATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
