export const state = {
  drawer: null,
  preloader: false,
  textpreloader: 'Carregando...',
  barImage: require('@/assets/image-bar.jpg'),
  barColor: 'rgba(1, 1, 5, .10), rgba(1, 0, 5, .4)',
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
  month: 1,
  year: 2022,
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

  PREV_DATE (state, payload) {
    state.month--;
    if (state.month === 0) {
      state.month = 12;
      state.year--;
    }
  },
  NEXT_DATE (state, payload) {
    state.month++;
    if (state.month === 13) {
      state.month = 1;
      state.year++;
    }
  },
  SET_DATE_TODAY(state) {
    const date = new Date();
    state.year = date.getFullYear();
    state.month = date.getMonth() + 1;
  },
}

export const actions = {

}

export const getters = {
  months: (state) => {
    return state.months
  },
  month: (state) => {
    return state.month
  },
  year: (state) => {
    return state.year
  }
}
