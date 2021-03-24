export const state = {
  drawer: null,
  preloader: false,
  textpreloader: 'Carregando...',
}

export const mutations = {
  SET_BAR_IMAGE (state, payload) {
    state.barImage = payload
  },

  SET_DRAWER (state, payload) {
    state.drawer = payload
  },

  SET_PRELOADER (state, status) {
    state.preloader = status
    state.textpreloader = 'Carregando'
  },

  SET_TEXT_PRELOADER (state, text) {
    state.textpreloader = text
  },
}

export const actions = {

}

export const getters = {

}
