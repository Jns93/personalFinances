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
            'Média de rendimentos por mês: ' +
            applyFilterVmoney(averageIncomes)
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
            'Média de despesas por mês: ' +
            applyFilterVmoney(averageExpenses)
          "
        />
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <base-material-stats-card
          color="yellow"
          icon="mdi-sack-percent"
          title="Percentual econômico"
          :value="percentOfSaving + '%'"
          sub-icon="mdi-bullseye-arrow"
          :sub-text="
            'Percentual de econômia médio: ' +
            averagePercentOfSaving + '%'
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
          :sub-text="'Objetivo: ' + applyFilterVmoney(balanceGoal)"
        />
      </v-col>
    </v-row>
    <!-- INDICADORES DO ANO E AVISOS-->
    <p class="font-weight-thin mb-0">Indicadores do ano</p>
    <v-row>
      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="emailsSubscriptionChart.data"
          :options="emailsSubscriptionChart.options"
          :responsive-options="emailsSubscriptionChart.responsiveOptions"
          color="#E91E63"
          hover-reveal
          type="Bar"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">Saldo por mês</h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Acompanhe a sua performance por mês ao longo do ano.
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 10 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="dailySalesChart.data"
          :options="dailySalesChart.options"
          color="success"
          hover-reveal
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h4 class="card-title font-weight-light mt-2 ml-2">
            Receita por mês
          </h4>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Acompanhe a sua performance por mês ao longo do ano.
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >updated 4 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>

      <v-col cols="12" lg="4">
        <base-material-chart-card
          :data="dataCompletedTasksChart.data"
          :options="dataCompletedTasksChart.options"
          hover-reveal
          color="info"
          type="Line"
        >
          <template v-slot:reveal-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" color="info" icon v-on="on">
                  <v-icon color="info"> mdi-refresh </v-icon>
                </v-btn>
              </template>

              <span>Refresh</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ attrs, on }">
                <v-btn v-bind="attrs" light icon v-on="on">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
              </template>

              <span>Change Date</span>
            </v-tooltip>
          </template>

          <h3 class="card-title font-weight-light mt-2 ml-2">
            Despesas por mês
          </h3>

          <p class="d-inline-flex font-weight-light ml-2 mt-1">
            Last Last Campaign Performance
          </p>

          <template v-slot:actions>
            <v-icon class="mr-1" small> mdi-clock-outline </v-icon>
            <span class="caption grey--text font-weight-light"
              >campaign sent 26 minutes ago</span
            >
          </template>
        </base-material-chart-card>
      </v-col>
      <v-col cols="12" md="6">
        <base-material-card color="orange" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <v-icon> mdi-alert </v-icon>
              Despesas próximas do vencimento
            </div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="items" />
          </v-card-text>
        </base-material-card>
      </v-col>

      <v-col cols="12" md="6">
        <base-material-card color="red" class="px-5 py-3">
          <template v-slot:heading>
            <div class="display-2 font-weight-light">
              <v-icon> mdi-arrow-bottom-left </v-icon>
              Despesas do mês
            </div>
          </template>
          <v-card-text>
            <v-data-table :headers="headers" :items="items" />
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
      <h1 class="mt-3">Carregando...</h1>
    </div>
  </v-container>
  <!-- <v-container v-else>
    <div class="text-center">
      <v-progress-circular
        indeterminate
        color="grey"
      ></v-progress-circular>
    </div>
    <v-skeleton-loader
      v-bind="attrs"
      type="article, actions"
    ></v-skeleton-loader>
    <v-skeleton-loader v-bind="attrs" type="article"></v-skeleton-loader>
    <v-skeleton-loader v-bind="attrs" type="card-avatar"></v-skeleton-loader>
    <v-skeleton-loader v-bind="attrs" type="article"></v-skeleton-loader>
    <v-skeleton-loader v-bind="attrs" type="actions"></v-skeleton-loader>
    <v-skeleton-loader v-bind="attrs" type="article"></v-skeleton-loader>
  </v-container> -->

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
      dailySalesChart: {
        data: {
          labels: ["M", "T", "W", "T", "F", "S", "S"],
          series: [[12, 17, 7, 17, 23, 18, 38]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 50, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      dataCompletedTasksChart: {
        data: {
          labels: ["12am", "3pm", "6pm", "9pm", "12pm", "3am", "6am", "9am"],
          series: [[230, 750, 450, 300, 280, 240, 200, 190]],
        },
        options: {
          lineSmooth: this.$chartist.Interpolation.cardinal({
            tension: 0,
          }),
          low: 0,
          high: 1000, // creative tim: we recommend you to set the high sa the biggest value + something for a better look
          chartPadding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
          },
        },
      },
      emailsSubscriptionChart: {
        data: {
          labels: [
            "Ja",
            "Fe",
            "Ma",
            "Ap",
            "Mai",
            "Ju",
            "Jul",
            "Au",
            "Se",
            "Oc",
            "No",
            "De",
          ],
          series: [
            [542, 443, 320, 780, 553, 453, 326, 434, 568, 610, 756, 895],
          ],
        },
        options: {
          axisX: {
            showGrid: false,
          },
          low: 0,
          high: 1000,
          chartPadding: {
            top: 0,
            right: 5,
            bottom: 0,
            left: 0,
          },
        },
        responsiveOptions: [
          [
            "screen and (max-width: 640px)",
            {
              seriesBarDistance: 5,
              axisX: {
                labelInterpolationFnc: function (value) {
                  return value[0];
                },
              },
            },
          ],
        ],
      },
      headers: [
        {
          sortable: false,
          text: "ID",
          value: "id",
        },
        {
          sortable: false,
          text: "Name",
          value: "name",
        },
        {
          sortable: false,
          text: "Salary",
          value: "salary",
          align: "right",
        },
        {
          sortable: false,
          text: "Country",
          value: "country",
          align: "right",
        },
        {
          sortable: false,
          text: "City",
          value: "city",
          align: "right",
        },
      ],
      items: [
        {
          id: 1,
          name: "Dakota Rice",
          country: "Niger",
          city: "Oud-Tunrhout",
          salary: "$35,738",
        },
        {
          id: 2,
          name: "Minerva Hooper",
          country: "Curaçao",
          city: "Sinaai-Waas",
          salary: "$23,738",
        },
        {
          id: 3,
          name: "Sage Rodriguez",
          country: "Netherlands",
          city: "Overland Park",
          salary: "$56,142",
        },
        {
          id: 4,
          name: "Philip Chanley",
          country: "Korea, South",
          city: "Gloucester",
          salary: "$38,735",
        },
        {
          id: 5,
          name: "Doris Greene",
          country: "Malawi",
          city: "Feldkirchen in Kārnten",
          salary: "$63,542",
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
    };
  },

  directives: { money: VMoney },

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
  },

  computed: {
    ...mapState({
      loading: (state) => state.preloader,
    }),
    ...mapGetters({
      months: 'months',
      totalAmountIncomes: 'totalAmountIncomes',
      totalAmountExpenses: 'totalAmountExpenses',
      percentOfSaving: 'percentOfSaving',
      balance: 'balance',
      balanceGoal: 'balanceGoal',
      averageIncomes: 'averageIncomes',
      averageExpenses: 'averageExpenses',
      averagePercentOfSaving: 'averagePercentOfSaving',
    })
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
    ]),

    ...mapMutations([]),

    // ...mapGetters([]),

    resetAllState() {
      console.log("reset state", this.balance);
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
      this.getAverageIncomesByYearFromState();
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
      this.getAverageIncomesByYearFromState();
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
      this.totalAmountIncomes = this.totalAmountIncomes;
    },

    getTotalExpensesByMonthFromState() {
      const monthYear = this.formatDateYearMonthFromApi();
      const params = {
        due_date: monthYear,
      };

      this.getTotalExpensesByMonth(params);
      this.totalAmountExpenses = this.totalAmountExpenses;
    },

    getPercentageOfSavingsByMonthFromState() {
      const monthYear = this.formatDateYearMonthFromApi();
      const params = {
        due_date: monthYear,
      };

      this.getPercentageOfSavingsByMonth(params);
      this.percentOfSaving = this.percentOfSaving;
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

    complete(index) {
      this.list[index] = !this.list[index];
    },
  },
};
</script>
