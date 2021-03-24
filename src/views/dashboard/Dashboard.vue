<template>
  <v-container id="dashboard" fluid tag="section" v-if="!loading">
    <!-- CONTROLES MÊS E ANO -->
    <v-row justify="center">
      <v-btn class="mr-5" icon @click.prevent="prev">
        <v-icon large> mdi-chevron-left </v-icon>
      </v-btn>
      <h2
        class="font-weight-regular mt-1"
        v-for="item in months"
        :key="item.id"
      >
        {{ item[month - 1].name }} {{ year }}
      </h2>
      <v-btn class="ml-5" icon @click.prevent="next">
        <v-icon large> mdi-chevron-right </v-icon>
      </v-btn>
    </v-row>

    <!-- INDICADORES DO MÊS -->
    <p class="font-weight-thin mb-0 mt-6">Indicadores do mês</p>

    <v-row>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="green"
          icon="mdi-arrow-top-right"
          title="Receita"
          :value="applyFilterVmoney(totalAmountIncomes)"
          sub-icon="mdi-information-variant"
          :sub-text="
            'Média de rendimentos do ano: ' + applyFilterVmoney(averageIncomes)
          "
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="red"
          icon="mdi-arrow-bottom-left"
          title="Despesas"
          :value="applyFilterVmoney(totalAmountExpenses)"
          sub-icon="mdi-information-variant"
          :sub-text="
            'Média de despesas do ano: ' + applyFilterVmoney(averageExpenses)
          "
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="yellow"
          icon="mdi-sack-percent"
          title="Percentual econômico"
          :value="percentOfSaving + '%'"
          sub-icon="mdi-information-variant"
          :sub-text="
            'Percentual econômico médio: ' + averagePercentOfSaving + '%'
          "
        />
      </v-col>

      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="info"
          icon="mdi-currency-usd"
          title="Saldo"
          :value="applyFilterVmoney(balance)"
          sub-icon="mdi-bullseye-arrow"
          :sub-text="
            'Meta do mês: ' +
            applyFilterVmoney(balanceGoal) +
            ' (30% da sua renda)'
          "
        />
      </v-col>
    </v-row>
    <!-- INDICADORES DO ANO E AVISOS-->
    <p class="font-weight-thin mb-0">Indicadores do ano</p>
    <v-row>
      <!-- CHART DAILY -->
      <v-col cols="12" lg="4">
        <v-card class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto"
            color="success"
            elevation="12"
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
          <v-sheet class="v-sheet--offset mx-auto" color="red" elevation="12">
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
      </v-col>

      <v-col cols="12" lg="4">
        <v-card class="mt-4 mx-auto">
          <v-sheet class="v-sheet--offset mx-auto" color="cyan" elevation="12">
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
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="grey darken-4" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <!-- <v-icon> mdi-alert </v-icon> -->
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
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="grey darken-4" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <!-- <v-icon> mdi-arrow-bottom-left </v-icon> -->
              A receber
            </div>
          </template>
          <v-card-text>
            <v-data-table
            :headers="headersToBeDueTable"
            :items="incomesToBeDueItems.data">
              <template v-slot:item.due_date="{ item }">
                {{ item.due_date | moment("DD/MM/YYYY") }}
              </template>
              <template v-slot:item.amount="{ item }">
                {{ item.amount | money }}
              </template>
            </v-data-table>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>
  </v-container>
  <v-container id="dashboard" fluid tag="section" v-else>
    <div class="text-center">
      <v-progress-circular
        indeterminate
        color="grey"
        size="50"
      ></v-progress-circular>
      <h1 class="mt-3" style="color:grey;">Carregando...</h1>
    </div>
  </v-container>
</template>

<script>
import { VMoney } from "v-money";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import moment from "moment";
export default {
  // name: 'DashboardDashboard',

  data() {
    return {
      money: {
        decimal: ",",
        thousands: ".",
        precision: 2,
        masked: false,
      },
      month: 1,
      year: 2021,
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

  beforeCreate() {

  },
  created() {
    this.setDateToday();
    this.getTotalExpensesByMonthFromState();
    this.getTotalIncomesByMonthFromState();
    this.getPercentageOfSavingsByMonthFromState();
    this.getBalanceByMonthFromState();
    this.getBalanceGoalByMonthFromState();
    this.getAverageIncomesByYearFromState();
    this.getAverageExpensesByYearFromState();
    this.getAveragePercentOfSavingByYearFromState();
    this.getIncomesYearChartFromState();
    this.getExpensesYearChartFromState();
    this.getIncomesToBeDueFromState();
    this.getExpensesToBeDueFromState();
  },

  mounted() {
  },

  watch: {},

  computed: {
    ...mapState({
      loading: (state) => state.preloader,
    }),
    ...mapGetters({
      months: "months",
      totalAmountIncomes: "totalAmountIncomes",
      totalAmountExpenses: "totalAmountExpenses",
      percentOfSaving: "percentOfSaving",
      balance: "balance",
      balanceGoal: "balanceGoal",
      averageIncomes: "averageIncomes",
      averageExpenses: "averageExpenses",
      averagePercentOfSaving: "averagePercentOfSaving",
      //necessario colocar o sufixo getter pois houve conflito dentro do metodo getExpensesYearChartFromState
      incomesYearChart: "incomesYearChart",
      expensesYearChart: "expensesYearChart",
      expensesToBeDue: "expensesToBeDue",
      incomesToBeDue: "incomesToBeDue"
    }),

    expensesToBeDueItems: function() {
      return this.expensesToBeDue
    },

    incomesToBeDueItems: function() {
      return this.incomesToBeDue
    }
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

    setDateToday() {
      const date = new Date();

      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
    },

    formatDateYearMonthFromApi() {
      var date = moment(this.year + "-" + this.month).format("YYYY-MM");
      return date;
    },

    prev() {
      this.month--;
      if (this.month === 0) {
        this.month = 12;
        this.year--;
      }
      this.getTotalExpensesByMonthFromState();
      this.getTotalIncomesByMonthFromState();
      this.getPercentageOfSavingsByMonthFromState();
      this.getBalanceByMonthFromState();
      this.getBalanceGoalByMonthFromState();
      this.getAverageIncomesByYearFromState();
      this.getExpensesYearChartFromState();
    },
    next() {
      this.month++;
      if (this.month === 13) {
        this.month = 1;
        this.year++;
      }
      this.getTotalExpensesByMonthFromState();
      this.getTotalIncomesByMonthFromState();
      this.getPercentageOfSavingsByMonthFromState();
      this.getBalanceByMonthFromState();
      this.getBalanceGoalByMonthFromState();
      this.getAverageIncomesByYearFromState();
      this.getExpensesYearChartFromState();
    },

    applyFilterVmoney(value) {
      return this.$options.filters.money(value);
    },

    getTotalIncomesByMonthFromState() {
      const monthYear = this.formatDateYearMonthFromApi();
      const params = {
        due_date: monthYear,
      };

      this.getTotalIncomesByMonth(params);
      // this.totalAmountIncomes = this.totalAmountIncomes;
    },

    getTotalExpensesByMonthFromState() {
      const monthYear = this.formatDateYearMonthFromApi();
      const params = {
        due_date: monthYear,
      };

      this.getTotalExpensesByMonth(params);
      // this.totalAmountExpenses = this.totalAmountExpenses;
    },

    getPercentageOfSavingsByMonthFromState() {
      const monthYear = this.formatDateYearMonthFromApi();
      const params = {
        due_date: monthYear,
      };

      this.getPercentageOfSavingsByMonth(params);
      // this.percentOfSaving = this.percentOfSaving;
    },

    getBalanceByMonthFromState() {
      const monthYear = this.formatDateYearMonthFromApi();
      const params = {
        due_date: monthYear,
      };

      this.getBalanceByMonth(params);
    },

    getBalanceGoalByMonthFromState() {
      const monthYear = this.formatDateYearMonthFromApi();
      const params = {
        due_date: monthYear,
      };

      this.getBalanceGoalByMonth(params);
    },

    getAverageIncomesByYearFromState() {
      const params = {
        due_date: this.year,
      };

      this.getAverageIncomesByYear(params);
    },

    getAverageExpensesByYearFromState() {
      const params = {
        due_date: this.year,
      };

      this.getAverageExpensesByYear(params);
    },

    getAveragePercentOfSavingByYearFromState() {
      const params = {
        due_date: this.year,
      };

      this.getAveragePercentOfSavingByYear(params);
    },

    getIncomesYearChartFromState() {
      const params = {
        due_date: this.year,
      };

      this.getIncomesYearChart(params)
      // .finally(
        // setTimeout(function () {
          // (this.incomesChart.data.labels = this.convertApidataToChartLabel(
          //   this.incomesYearChart
          // )),
          // (this.incomesChart.data.values = this.convertApidataToChartValues(
          //   this.incomesYearChart
          // ))
        // }, 500)
      // );
    },

    getExpensesYearChartFromState() {
      const params = {
        due_date: this.year,
      };

      this.getExpensesYearChart(params)
      // .finally(
        // setTimeout(function () {
          // this.expensesChart.data.labels = this.convertApidataToChartLabel(this.expensesYearChart),
          // this.expensesChart.data.values = this.convertApidataToChartValues(this.expensesYearChart)
        // }, 4000)
        // );
    },

    // convertApidataToChartLabel(data) {
    //   let labels = [];
    //   let months = [
    //     "JAN",
    //     "FEV",
    //     "MAR",
    //     "ABR",
    //     "MAI",
    //     "JUN",
    //     "JUL",
    //     "AGO",
    //     "SET",
    //     "OUT",
    //     "NOV",
    //     "DEZ",
    //   ];

    //   labels = data.map(function (item) {
    //     return months[item.month - 1];
    //   });
    //   return labels;
    // },

    // convertApidataToChartValues(data) {
    //   let values = [];

    //   values = data.map(function (item) {
    //     return parseFloat(item.amount);
    //   });
    //   return values;
    // },

    getExpensesToBeDueFromState () {
      this.getExpensesToBeDue()
    },

    getIncomesToBeDueFromState () {
      this.getIncomesToBeDue()
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
