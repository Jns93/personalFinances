export const state = {
  drawer: null,
  preloader: false,
  textpreloader: 'Carregando...',
  barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-3.jpg',
  barColor: 'rgba(0, 0, 5, .8), rgba(0, 0, 5, .8)',

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
