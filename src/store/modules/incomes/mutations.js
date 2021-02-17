export default {
  SET_INCOMES_IN_STATE (state, incomes) {
    state.incomes = incomes
  },

  // STORE_INCOME_IN_STATE (state, income) {
  //   state.incomes.push(income)
  // },

  UPDATE_INCOME_IN_STATE (state, income) {
    for (var i = 0; i <= state.incomes.length; i++) {
      if (state.incomes[i].id === income.id) {
        state.incomes[i] = income
        break
      }
    }
  },

  UPDATE_INCOME_STATUS_IN_STATE (state, incomes) {
    for (var n = 0; n < incomes.length; n++) {
      for (var i = 0; i <= state.incomes.length; i++) {
        if (state.incomes[i].id === incomes[n].id) {
          state.incomes[i].fl_pay = 1
          break
        }
      }
    }
  },

  DELETE_INCOME_FROM_STATE (state, income) {
    for (var i = 0; i <= state.incomes.length; i++) {
      if (state.incomes[i].id === income.id) {
        state.incomes.splice(i, 1)
        break
      }
    }
  },
}
