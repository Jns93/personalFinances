import Vue from 'vue'
export default {
  getCategories ({ commit }) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http('/categories')
                        .then(response => commit('SET_CATEGORIES', response.data))
                        .finally(() => commit('SET_PRELOADER', false))
  },

  storeCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http.post('/categories/store', params)
                              .finally(() => commit('SET_PRELOADER', false))
  },

  updateCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)

    return Vue.prototype.$http.put('/categories/update', params)
                              .then(response => commit('UPDATE_CATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },

  deleteCategory ({ commit }, params) {
    commit('SET_PRELOADER', true)
    return Vue.prototype.$http.delete('/categories/delete', { data: { id: params.id } })
                              .then(response => commit('DELETE_CATEGORY', response.data.data))
                              .finally(() => commit('SET_PRELOADER', false))
  },
}
