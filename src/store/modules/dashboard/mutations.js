export default {
  SET_TOTAL_AMOUNT_INCOMES_IN_STATE (state, totalIncomesAmount) {
    state.totalAmountIncomes = totalIncomesAmount
  },

  SET_TOTAL_AMOUNT_EXPENSES_IN_STATE (state, totalExpensesAmount) {
    state.totalAmountExpenses = totalExpensesAmount
  },

  SET_PERCENT_OF_SAVING_IN_STATE (state, percentOfSaving) {
    state.percentOfSaving = percentOfSaving
  },

  SET_BALANCE_IN_STATE (state, balance) {
    state.balance = balance
  },
}
