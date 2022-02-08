<template>
  <v-container
    id="dashboard"
    fluid
    tag="section"
    style="height: 90%; background: #fafafa"
  >
    <div class="text-center">
      <v-container
      v-show="loading"
        id="dashboard"
        fluid
        tag="section"
        style="height: 90%; background: #fafafa"
      >
        <v-progress-circular
          indeterminate
          color="grey"
          size="50"
        ></v-progress-circular>
        <h1 class="mt-3" style="color: grey">Carregando...</h1>
      </v-container>
    </div>
    <!-- INDICADORES DO MÊS -->
    <indicators-month v-show="!loading"></indicators-month>

    <!-- INDICADORES DO ANO E AVISOS-->
    <!-- <p class="font-weight-thin mb-0">Indicadores do ano</p>
    <v-row> -->
      <!-- CHART DAILY -->
      <!-- <v-col cols="12" lg="4">
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="success"
            elevation="2"
          >
            <v-sparkline
              :labels="incomesYearChart.data.labels"
              :value="incomesYearChart.data.values"
              color="white"
              line-width="2"
              padding="16"
              auto-draw
              auto-line-width
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="caption grey--text font-weight-light"
              >last registration 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="mt-4 mx-auto">
          <v-sheet class="v-sheet--offset mx-auto" color="red" elevation="2">
            <v-sparkline
              :labels="expensesYearChart.data.labels"
              :value="expensesYearChart.data.values"
              color="white"
              line-width="2"
              padding="16"
              auto-draw
              auto-line-width
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="caption grey--text font-weight-light"
              >last registration 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-col> -->

      <!-- <v-col cols="12" lg="4">
        <v-card class="mt-4 mx-auto">
          <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="2">
            <v-sparkline
              :labels="expensesYearChart.data.labels"
              :value="expensesYearChart.data.values"
              color="white"
              line-width="2"
              padding="16"
              auto-draw
              auto-line-width
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="title font-weight-light mb-2">User Registrations</div>
            <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="caption grey--text font-weight-light"
              >last registration 26 minutes ago</span
            >
          </v-card-text>
        </v-card>
      </v-col> -->

      <!-- <v-col cols="12" md="6">
        <base-material-card color="grey darken-4" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              Despesas próximas do vencimento
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headersToBeDueTable"
              :items="expensesToBeDueItems.data"
            >
              <template v-slot:item.due_date="{ item }">
                <v-chip v-if="item.due_date <= now" color="error">
                  {{ item.due_date | moment("DD/MM/YYYY") }}
                </v-chip>
                <v-chip v-else color="yellow">
                  {{ item.due_date | moment("DD/MM/YYYY") }}
                </v-chip>
              </template>
              <template v-slot:item.amount="{ item }">
                {{ item.amount | money }}
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col> -->

      <!-- <v-col cols="12" md="6">
        <base-material-card color="grey darken-4" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              A receber
            </div>
          </template>
          <v-card-text>
            <v-data-table
              :headers="headersToBeDueTable"
              :items="incomesToBeDueItems.data"
            >
              <template v-slot:item.due_date="{ item }">
                {{ item.due_date | moment("DD/MM/YYYY") }}
              </template>
              <template v-slot:item.amount="{ item }">
                {{ item.amount | money }}
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col> -->
    <!-- </v-row> -->
  </v-container>

</template>

<script>
import { VMoney } from "v-money";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import moment from "moment";
import IndicatorsMonth from './Dashboard/IndicatorsMonth.vue'

export default {
  // name: 'DashboardDashboard',
  components: {
    'indicators-month': IndicatorsMonth,
   },
  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false,
      },
      // incomesChart: {
      //   data: {
      //     labels: [],
      //     values: [],
      //   },
      // },
      // expensesChart: {
      //   data: {
      //     labels: [],
      //     values: [],
      //   },
      // },
      headersToBeDueTable: [
        {
          sortable: true,
          text: "ID",
          value: "id",
        },
        {
          sortable: true,
          text: "Name",
          value: "name",
        },
        {
          sortable: true,
          text: "Categoria",
          value: "category",
        },
        {
          sortable: true,
          text: "Vencimento",
          value: "due_date",
        },
        {
          sortable: true,
          text: "Valor",
          value: "amount",
        },
      ],
      tabs: 0,
      tasks: {
        0: [
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: false,
          },
          {
            text: "Create 4 Invisible User Experiences you Never Knew About",
            value: true,
          },
        ],
        1: [
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: false,
          },
        ],
        2: [
          {
            text:
              "Lines From Great Russian Literature? Or E-mails From My Boss?",
            value: false,
          },
          {
            text:
              "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",
            value: true,
          },
          {
            text:
              'Sign contract for "What are conference organizers afraid of?"',
            value: true,
          },
        ],
      },
      list: {
        0: false,
        1: false,
        2: false,
      },
      now: moment().format(),
    };
  },

  directives: { money: VMoney },

  beforeCreate() {},
  created() {
    this.$store.commit('SET_PRELOADER', true)
    // this.getTotalIncomesByMonthFromState();
    // this.getAverageIncomesByYearFromState();
    // this.getTotalExpensesByMonthFromState();
    // this.getAverageExpensesByYearFromState();
    // this.getPercentageOfSavingsByMonthFromState();
    // this.getAveragePercentOfSavingByYearFromState();
    // this.getBalanceByMonthFromState();
    // this.getBalanceGoalByMonthFromState();
    // this.getIncomesYearChartFromState();
    // this.getExpensesYearChartFromState();
    // this.getIncomesToBeDueFromState();
    // this.getExpensesToBeDueFromState();
  },

  mounted() {},

  watch: {},

  computed: {
    ...mapState({
      loading: (state) => state.preloader,
      me: (state) => state.auth.me,
    }),
    ...mapGetters({
      // months: "months",
      // dateFilter: "dateFilter",
      // totalAmountIncomes: "totalAmountIncomes",
      // totalAmountExpenses: "totalAmountExpenses",
      // percentOfSaving: "percentOfSaving",
      // balance: "balance",
      // balanceGoal: "balanceGoal",
      // averageIncomes: "averageIncomes",
      // averageExpenses: "averageExpenses",
      // averagePercentOfSaving: "averagePercentOfSaving",
      // //necessario colocar o sufixo getter pois houve conflito dentro do metodo getExpensesYearChartFromState
      // incomesYearChart: "incomesYearChart",
      // expensesYearChart: "expensesYearChart",
      // expensesToBeDue: "expensesToBeDue",
      // incomesToBeDue: "incomesToBeDue",
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

    ...mapMutations([]),

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
