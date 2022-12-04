<template>
  <div>
    <v-card class="mx-auto">
      <v-sheet
        class="v-sheet--offset mx-auto pa-8"
        style="background: linear-gradient(to top, #48c6ef 0%, #6f86d6 100%)"
        elevation="12"
        max-width="calc(100% - 32px)"
      >
        <LineChartGenerator
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
          <h3 class="font-weight-thin" color="grey">Despesas por mês</h3>
          <br />
          <br />
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
import { Line as LineChartGenerator } from "vue-chartjs/legacy";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";
import moment from "moment";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  LinearScale,
  CategoryScale,
  PointElement
);

export default {
  name: "LineChart",
  components: {
    LineChartGenerator,
  },
  props: {
    chartId: {
      type: String,
      default: "line-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 300,
    },
    height: {
      type: Number,
      default: 215,
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
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      isLoading: false,
      month: 1,
      year: 2021,

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        borderColor: ["rgba(255, 255, 255, 0.4)"],
        plugins: {
          legend: {
            display: false,
          },
        },
        pointBackgroundColor: ["rgba(255, 255, 255, 0.4)"],
        pointHitRadius: 40,
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
      expensesByMonthChart: "expensesByMonthChart",
    }),
    me() {
      return this.$store.getters.me;
    },
    labels() {
      return this.$store.getters.expensesByMonthChart.labels;
    },
    values() {
      return this.$store.getters.expensesByMonthChart.values;
    },
    chartData() {
      return {
        labels: this.labels,
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            data: this.values,
          },
        ],
      };
    },
  },
  methods: {
    ...mapActions(["getExpensesByMonthChartBar"]),
    ...mapMutations(["SET_DATE_FILTER", "SET_PRELOADER"]),

    setDateToday() {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
    },

    prev() {
      this.month--;
      if (this.month === 0) {
        this.month = 12;
        this.year--;
      }
    },
    next() {
      this.month++;
      if (this.month === 13) {
        this.month = 1;
        this.year++;
      }
    },
    formatDateYearMonthFromApi() {
      var date = moment(this.year + "-" + this.month).format("YYYY-MM");
      return date;
    },

    getChartByMonth() {
      this.isLoading = true;
      const date = this.formatDateYearMonthFromApi();

      setTimeout(() => {
        const params = {
          userId: this.me.id,
          due_date: date,
        };

        this.getExpensesByMonthChartBar(params)
          .then((res) => {})
          .finally(() => {
            this.isLoading = false;
          });
      }, 5000);
    },
  },
  created() {
    this.setDateToday();
    this.getChartByMonth();
  },
  watch: {},
};
</script>

<style>
.v-sheet--offset {
  top: -24px;
  position: relative;
}
</style>
