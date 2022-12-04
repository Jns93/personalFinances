export default {
  SET_INDICATORS_MONTH (state, indicators) {
    console.log('SET_INDICATORS_MONTH =>', indicators);
    state.totalExpenses = indicators.totalExpenses
    state.totalIncomes = indicators.totalIncomes
    state.balance = indicators.balance
    state.percentOfSavings = indicators.percentOfSavings
    state.balanceGoal = indicators.balanceGoal
    state.averageIncomes = indicators.averageIncomes
    state.averageExpenses = indicators.averageExpenses
  },

  SET_TOTAL_AMOUNT_INCOMES_IN_STATE (state, totalIncomesAmount) {
    state.totalAmountIncomes = totalIncomesAmount
  },

  SET_TOTAL_AMOUNT_EXPENSES_IN_STATE (state, totalExpensesAmount) {
    console.log('total amount expenses', totalExpensesAmount)
    state.totalAmountExpenses = totalExpensesAmount
  },

  // SET_PERCENT_OF_SAVING_IN_STATE (state, percentOfSaving) {
  //   state.percentOfSaving = percentOfSaving
  // },

  // SET_BALANCE_IN_STATE (state, balance) {
  //   state.balance = balance
  // },

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

  SET_EXPENSES_BY_CATEGORY_CHART (state, expenses) {
    state.charts.expensesByCategory.labels = expenses.map(function(item) {
      let label = item.category.match(/.{1,8}/g);
      return label[0];
    });
    state.charts.expensesByCategory.values = expenses.map(function(item) {
      return parseFloat(item.amount)
    });
  },


  SET_EXPENSES_BY_MONTH_CHART (state, expenses) {
    state.charts.expensesByMonth.labels = expenses.map(function(item) {
      let month = '';
      switch (item.month) {
        case 1:
          month = 'Jan';
          break;
        case 2:
          month = 'Fev';
          break;
        case 3:
          month = 'Mar';
          break;
        case 4:
          month = 'Abr';
          break;
        case 5:
          month = 'Mai';
          break;
        case 6:
          month = 'Jun';
          break;
        case 7:
          month = 'Jul';
          break;
        case 8:
          month = 'Ago';
          break;
        case 9:
          month = 'Set';
          break;
        case 10:
          month = 'Out';
          break;
        case 11:
          month = 'Nov';
          break;
        case 12:
          month = 'Dez';
          break;
      }
      return month;
    });

    state.charts.expensesByMonth.values = expenses.map(function(item) {
      return parseFloat(item.amount)
    });
  },

  SET_INCOMES_BY_MONTH_CHART (state, incomes) {
    state.charts.incomesByMonth.labels = incomes.map(function(item) {
      let month = '';
      switch (item.month) {
        case 1:
          month = 'Jan';
          break;
        case 2:
          month = 'Fev';
          break;
        case 3:
          month = 'Mar';
          break;
        case 4:
          month = 'Abr';
          break;
        case 5:
          month = 'Mai';
          break;
        case 6:
          month = 'Jun';
          break;
        case 7:
          month = 'Jul';
          break;
        case 8:
          month = 'Ago';
          break;
        case 9:
          month = 'Set';
          break;
        case 10:
          month = 'Out';
          break;
        case 11:
          month = 'Nov';
          break;
        case 12:
          month = 'Dez';
          break;
      }
      return month;
    });

    state.charts.incomesByMonth.values = incomes.map(function(item) {
      return parseFloat(item.amount)
    });
  }
}
