import Vue from 'vue'
import { TOKEN_NAME } from '@/configs/api'

export default {
  state: {
    me: {
      id: '',
      name: '',
      email: '',
    },
    authenticated: false
  },

  mutations: {
    SET_ME (state, me) {
      state.me = me

      state.authenticated = true
      console.log('me atualizado');
    },

    SET_AUTHENTICATED (state, status) {
      state.authenticated = status
    },

    LOGOUT (state) {
      state.me = {
        id: '',
        name: '',
        email: ''
      }

      state.authenticated = false
    },
  },

  actions: {
    register ({ commit }, params) {
      return Vue.prototype.$http.post('/register-user', params)
    },

    login({ commit, dispatch }, params) {
      return Vue.prototype.$http.post('/sanctum/token', params)
                                  .then(response => {
                                    const token = response.data.token

                                    localStorage.setItem(TOKEN_NAME, token)
                                    localStorage.setItem("auth", "true")

                                   dispatch('getMe') //chamando a action abaixo
                                  })
    },

    async getMe({ commit }) {
      const token = localStorage.getItem(TOKEN_NAME)

      if(!token) return;

      return await Vue.prototype.$http.get('/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => commit('SET_ME', response.data.data))
      .catch(error => localStorage.removeItem(TOKEN_NAME))
    },

    logout({ commit }) {
      const token = localStorage.getItem(TOKEN_NAME)
      if(!token) return;

      return Vue.prototype.$http.post('/auth/logout', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        commit('LOGOUT')

        localStorage.removeItem(TOKEN_NAME)
        localStorage.removeItem("auth")
      })
    }
  },

  getters: {
    me: (state) => {
      return state.me
    }
  }
}
