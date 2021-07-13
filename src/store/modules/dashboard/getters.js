export default {
 totalIncomes: (state) => {
    return state.totalIncomes
  },

  totalExpenses: (state) => {
    return state.totalExpenses
  },

  percentOfSavings: (state) => {
    return state.percentOfSavings
  },

  balance: (state) => {
    return state.balance
  },

  balanceGoal: (state) => {
    return state.balanceGoal
  },

  averageIncomes: (state) => {
    return state.averageIncomes
  },

  averageExpenses: (state) => {
    return state.averageExpenses
  },

  averagePercentOfSavings: (state) => {
    return state.averagePercentOfSavings
  },

  incomesYearChart: (state) => {
    console.log('getter incomes year', state.incomesYearChart)
    return state.incomesYearChart
  },

  expensesYearChart: (state) => {
    return state.expensesYearChart
  },

  expensesToBeDue: (state) => {
    return state.expensesToBeDue
  },

  incomesToBeDue: (state) => {
    return state.incomesToBeDue
  }
}
