export default {
  months: (state) => {
    return state.months
  },
  totalAmountIncomes: (state) => {
    return state.totalAmountIncomes
  },
  totalAmountExpenses: (state) => {
    return state.totalAmountExpenses
  },
  percentOfSaving: (state) => {
    return state.percentOfSaving
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
  averagePercentOfSaving: (state) => {
    return state.averagePercentOfSaving
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
