export default {
  SET_RECURRING_EXPENSES (state, recurringExpenses) {
    state.recurringExpenses = recurringExpenses
  },

  STORE_RECURRING_EXPENSE (state, recurringExpense) {
    state.recurringExpenses.push(recurringExpense)
  },

  UPDATE_RECURRING_EXPENSE (state, recurringExpense) {
    for (var i = 0; i <= state.recurringExpenses.data.length; i++) {
      if (state.recurringExpenses.data[i].id === recurringExpense.id) {
        state.recurringExpenses.data[i] = recurringExpense
        break
      }
    }
  },

  DELETE_RECURRING_EXPENSE (state, recurringExpense) {
    for (var i = 0; i <= state.recurringExpenses.data.length; i++) {
      if (state.recurringExpenses.data[i].id === recurringExpense.id) {
        state.recurringExpenses.data.splice(i, 1)
        break
      }
    }
  },
}
