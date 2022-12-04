<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    style="height: 90%; background: #fafafa; vertical-align: middle; width: 90%"
  >
      <v-container
        v-show="loading"
        id="dashboard"
        fluid
        fill-height
        style="height: 80vh; background: #fafafa"
      >
        <v-row justify="center" align="center">
          <v-progress-circular
            indeterminate
            color="grey"
            size="40"
          ></v-progress-circular>
          <!-- <h4 class="mt-2 ml-2" style="color: grey">Carregando...</h4> -->

        </v-row>
      </v-container>
    <!-- INDICADORES DO MÊS -->
    <indicators-month v-show="!loading"></indicators-month>
    <charts v-show="!loading"></charts>
    <expenses-table v-show="!loading"></expenses-table>
    <!-- <indicators-general v-show="!loading"></indicators-general> -->
  </v-container>

</template>

<script>
import { VMoney } from "v-money";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import moment from "moment";
import IndicatorsMonth from './Dashboard/IndicatorsMonth.vue'
import IndicatorsGeneral from './Dashboard/IndicatorsGeneral.vue'
import ExpensesTable from './Dashboard/ExpensesTable.vue'
import Charts from './Dashboard/Charts.vue'

export default {
  // name: 'DashboardDashboard',
  components: {
    'indicators-month': IndicatorsMonth,
    'indicators-general': IndicatorsGeneral,
    'expenses-table': ExpensesTable,
    'charts': Charts
   },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false,
      },
      now: moment().format(),
    };
  },

  directives: { money: VMoney },

  beforeCreate() {},
  created() {
    this.$store.commit('SET_DATE_TODAY');
    this.createRecurring();
    this.$store.commit('SET_PRELOADER', true)
  },

  mounted() {},

  watch: {},

  computed: {
    ...mapState({
      loading: (state) => state.preloader,
      me: (state) => state.auth.me,
    }),

    expensesToBeDueItems: function () {
      return this.expensesToBeDue;
    },

    incomesToBeDueItems: function () {
      return this.incomesToBeDue;
    },
  },

  methods: {
    ...mapActions([
      "createRecurring",
      "getTotalIncomesByMonth",
      "getTotalExpensesByMonth",
      "getPercentageOfSavingsByMonth",
      "getBalanceByMonth",
      "getBalanceGoalByMonth",
      "getAverageIncomesByYear",
      "getAverageExpensesByYear",
      "getAveragePercentOfSavingByYear",
      "getIncomesYearChart",
      "getExpensesYearChart",
      "getExpensesToBeDue",
      "getIncomesToBeDue",
    ]),

    ...mapMutations(['SET_DATE_TODAY']),

    resetAllState() {
      this.balance = null;
    },

    applyFilterVmoney(value) {
      return this.$options.filters.money(value);
    },

    getTotalIncomesByMonthFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.dateFilter,
      };

      this.getTotalIncomesByMonth(params);
      // this.totalAmountIncomes = this.totalAmountIncomes;
    },

    getTotalExpensesByMonthFromState() {
      if(this.me.id === '') {
        setTimeout(() => {
          const params = {
          userId: this.me.id,
          due_date: this.dateFilter,
      };
        this.getTotalExpensesByMonth(params);
        },3000);
      } else {
        const params = {
          userId: this.me.id,
          due_date: this.dateFilter
      }
      this.getTotalExpensesByMonth(params);
      }
    },

    getPercentageOfSavingsByMonthFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.dateFilter,
      };

      this.getPercentageOfSavingsByMonth(params);
    },

    getBalanceByMonthFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.dateFilter,
      };

      this.getBalanceByMonth(params);
    },

    getBalanceGoalByMonthFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.dateFilter,
      };

      this.getBalanceGoalByMonth(params);
    },

    getAverageIncomesByYearFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.year,
      };

      this.getAverageIncomesByYear(params);
    },

    getAverageExpensesByYearFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.year,
      };

      this.getAverageExpensesByYear(params);
    },

    getAveragePercentOfSavingByYearFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.year,
      };

      this.getAveragePercentOfSavingByYear(params);
    },

    getIncomesYearChartFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.year,
      };

      this.getIncomesYearChart(params);
    },

    getExpensesYearChartFromState() {
      const params = {
        userId: this.me.id,
        due_date: this.year,
      };

      this.getExpensesYearChart(params);
    },

    getExpensesToBeDueFromState() {
      const params = {
        userId: this.me.id,
      };

      this.getExpensesToBeDue(params);
    },

    getIncomesToBeDueFromState() {
      const params = {
        userId: this.me.id,
      };

      this.getIncomesToBeDue(params);
    },

    complete(index) {
      this.list[index] = !this.list[index];
    },
  },
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
