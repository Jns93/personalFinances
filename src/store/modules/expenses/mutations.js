export default {
  SET_EXPENSES (state, expenses) {
    state.expenses = expenses
  },

  STORE_EXPENSE (state, expense) {
    state.expenses.push(expense)
  },

  UPDATE_EXPENSE (state, expense) {
    for (var i = 0; i <= state.expenses.length; i++) {
      if (state.expenses[i].id === expense.id) {
        console.log(state.expenses[i])
        console.log(expense)
        state.expenses[i] = expense
        break
      }
    }
    // state.expenses.find(item => {
    //   console.log(expense.id)
    //   if (item.id === expense.id) {
    //     console.log('item =>', item)
    //     console.log('expense =>', expense)
    //     item.name = expense.name
    //   }
    // })
  },

  UPDATE_EXPENSE_STATUS (state, expenses) {
    for (var n = 0; n < expenses.length; n++) {
      for (var i = 0; i <= state.expenses.length; i++) {
        console.log(expenses[n].id)
        if (state.expenses[i].id === expenses[n].id) {
          state.expenses[i].fl_pay = 1
          break
        }
      }
    }
  },

  DELETE_EXPENSE (state, expense) {
    for (var i = 0; i <= state.expenses.length; i++) {
      if (state.expenses[i].id === expense.id) {
        state.expenses.splice(i, 1)
        break
      }
    }
  },
}
