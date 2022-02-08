export const state = {
  drawer: null,
  preloader: false,
  textpreloader: 'Carregando...',
  barImage: require('@/assets/image-bar.jpg'),
  barColor: 'rgba(0, 0, 5, .10), rgba(0, 0, 5, .8)',
  months: {
    data: [
      { id: 1, name: 'Janeiro' },
      { id: 2, name: 'Fevereiro' },
      { id: 3, name: 'Março' },
      { id: 4, name: 'Abril' },
      { id: 5, name: 'Maio' },
      { id: 6, name: 'Junho' },
      { id: 7, name: 'Julho' },
      { id: 8, name: 'Agosto' },
      { id: 9, name: 'Setembro' },
      { id: 10, name: 'Outubro' },
      { id: 11, name: 'Novembro' },
      { id: 12, name: 'Dezembro' },
    ],
  },
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
  months: (state) => {
    return state.months
  },
}
