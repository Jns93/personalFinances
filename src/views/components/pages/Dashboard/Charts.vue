<template>
  <div>
    <v-row>
      <v-col cols="4"  max-width="calc(100% - 32px)">
        <by-category-chart-bar></by-category-chart-bar>
      </v-col>
      <v-col cols="4"  max-width="calc(100% - 32px)">
        <expenses-by-month></expenses-by-month>
      </v-col>
      <v-col cols="4"  max-width="calc(100% - 32px)" max-heigth="150px">
        <incomes-by-month></incomes-by-month>
      </v-col>
    </v-row>
    <v-row>

    </v-row>
  </div>
</template>

<script>
import ByCategoryChartBar from "./Charts/ExpensesByCategory.vue";
import ExpensesByMonth from "./Charts/ExpensesByMonth.vue";
import IncomesByMonth from "./Charts/IncomesByMonth.vue";

export default {
  components: {
    ByCategoryChartBar: ByCategoryChartBar,
    ExpensesByMonth: ExpensesByMonth,
    IncomesByMonth:IncomesByMonth,
  },
};
</script>
