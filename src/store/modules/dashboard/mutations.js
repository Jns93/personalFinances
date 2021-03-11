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

  SET_BALANCE_GOAL_BY_MONTH_IN_STATE (state, balanceGoal) {
    state.balanceGoal = balanceGoal
  },

  SET_AVERAGE_INCOMES_BY_YEAR_IN_STATE (state, averageIncomes) {
    state.averageIncomes = averageIncomes
  },

  SET_AVERAGE_EXPENSES_BY_YEAR_IN_STATE (state, averageExpenses) {
    state.averageExpenses = averageExpenses
  },

  SET_AVERAGE_PERCENT_OF_SAVING_BY_YEAR_IN_STATE (state, averagePercentOfSaving) {
    state.averagePercentOfSaving = averagePercentOfSaving
  },
  
}
