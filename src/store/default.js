export const state = {
  drawer: null,
  preloader: false,
  textpreloader: 'Carregando...',
  barImage: 'https://demos.creative-tim.com/material-dashboard/assets/img/sidebar-3.jpg',
  barColor: 'rgba(0, 0, 5, .8), rgba(0, 0, 5, .8)',
  dateFilter: null,
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

  SET_DATE_FILTER (state, date) {
    state.dateFilter =  date
  },
}

export const actions = {

}

export const getters = {
  months: (state) => {
    return state.months
  },
}
