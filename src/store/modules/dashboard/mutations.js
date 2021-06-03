export default {
  SET_TOTAL_AMOUNT_INCOMES_IN_STATE (state, totalIncomesAmount) {
    state.totalAmountIncomes = totalIncomesAmount
  },

  SET_TOTAL_AMOUNT_EXPENSES_IN_STATE (state, totalExpensesAmount) {
    console.log('total amount expenses', totalExpensesAmount)
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

  SET_INCOMES_YEAR_CHART_IN_STATE (state, incomesYearChart) {
    // state.incomesYearChart = incomesYearChart
    let months = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
    state.incomesYearChart.data.labels = incomesYearChart.map(function(item) {
      return months[item.month -1];
    })

    state.incomesYearChart.data.values = incomesYearChart.map(function(item) {
      return parseFloat(item.amount);
    })
  },

  SET_EXPENSES_YEAR_CHART_IN_STATE (state, expensesYearChart) {
    // state.expensesYearChart = expensesYearChart
    let months = ["JAN","FEV","MAR","ABR","MAI","JUN","JUL","AGO","SET","OUT","NOV","DEZ"];
    state.expensesYearChart.data.labels = expensesYearChart.map(function(item) {
      return months[item.month -1];
    })

    state.expensesYearChart.data.values = expensesYearChart.map(function(item) {
      return parseFloat(item.amount);
    })
  },

  SET_EXPENSES_TO_BE_DUE (state, expensesToBeDue) {
    state.expensesToBeDue.data = expensesToBeDue.map(function(item) {
      return {
        'id': item.id,
        'name': item.name,
        'category': item.category.name,
        'due_date': item.due_date,
        'amount': item.amount
      }
    })
  },

  SET_INCOMES_TO_BE_DUE (state, incomesToBeDue) {
    state.incomesToBeDue.data = incomesToBeDue.map(function(item) {
      return {
        'id': item.id,
        'name': item.name,
        'category': item.category.name,
        'due_date': item.due_date,
        'amount': item.amount
      }
    })
  },

}
