<template>
  <div>
    <v-card class="mx-auto">
      <v-sheet
        class="v-sheet--offset mx-auto pa-8"
        style="background: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <Bar
          :chart-options="chartOptions"
          :chart-data="chartData"
          :chart-id="chartId"
          :dataset-id-key="datasetIdKey"
          :plugins="plugins"
          :css-classes="cssClasses"
          :styles="styles"
          :width="width"
          :height="height"
        />
      </v-sheet>

      <div>
        <div class="ml-5">
          <h3 class="font-weight-thin" color="grey">Despesas por categoria</h3>
          <br>
          <br>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { Bar } from "vue-chartjs/legacy";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import moment from "moment";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

export default {
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: "bar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 500,
    },
    height: {
      type: Number,
      default: 240,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isLoading: false,
      // month: 1,
      // year: 2021,
      headers: [
        {
          text: 'Nome',
          align: 'start',
          value: 'nome',
          groupable: false,
        },
        {
          text: 'Total',
          align: 'start',
          value: 'total',
          groupable: false,
        },
        {
          text: 'Data',
          align: 'start',
          value: 'data',
          groupable: false,
        }
      ],
      chartOptions: {
        responsive: true,
        borderColor: ["white"],
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            // display: false,
            grid: {
              borderColor: "white",
              display: false,
            },
            ticks: {
              color: "white",
            },
          },
          y: {
            // display: false,
            grid: {
              borderColor: "transparent",
              display: false,
            },
            ticks: {
              display: true,
              color: "white",
            },
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters({
      months: "months",
      month: "month",
      year: "year",
      expensesByCategoryChart: "expensesByCategoryChart",
    }),
    me() {
      return this.$store.getters.me;
    },
    labels() {
      return this.$store.getters.expensesByCategoryChart.labels;
    },
    values() {
      return this.$store.getters.expensesByCategoryChart.values;
    },
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            data: this.values,
            backgroundColor: ["rgba(255, 255, 255, 0.3)"],
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions(["getExpensesByCategoryChartBar"]),
    ...mapMutations(["SET_DATE_FILTER", "SET_PRELOADER"]),

    setDateToday() {
      const date = new Date();
      // this.year = date.getFullYear();
      // this.month = date.getMonth() + 1;
    },

    // prev() {
    //   this.month--;
    //   if (this.month === 0) {
    //     this.month = 12;
    //     this.year--;
    //   }
    // },
    // next() {
    //   this.month++;
    //   if (this.month === 13) {
    //     this.month = 1;
    //     this.year++;
    //   }
    // },
    formatDateYearMonthFromApi() {
      var date = moment(this.year + "-" + this.month).format("YYYY-MM");
      return date;
    },

    getChartByCategory() {
      this.isLoading = true;
      const date = this.formatDateYearMonthFromApi();

      setTimeout(() => {
        const params = {
          userId: this.me.id,
          due_date: date,
        };
        this.getExpensesByCategoryChartBar(params)
          .then((res) => {})
          .finally(() => {
            this.isLoading = false;
          });
      }, 5000);
    },
  },
  created() {
    // this.setDateToday();
    this.getChartByCategory();
  },
  watch: {
    month() {
      this.getChartByCategory();
    }
  },
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
