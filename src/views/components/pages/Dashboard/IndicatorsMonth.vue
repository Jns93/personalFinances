<template>
  <div>
    <!-- CONTROLES DE DATA -->
    <div>
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
    </div>
    <!-- INDICADORES DO MES -->
    <div v-if="!loading">
      <p class="font-weight-thin mb-0 mt-6">Indicadores do mês</p>

      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <base-material-stats-card
            color="green"
            icon="mdi-arrow-top-right"
            title="Receita"
            :value="applyFilterVmoney(totalIncomes)"
            sub-icon="mdi-information-variant"
            :sub-text="
              'Média de rendimentos do ano: ' +
              applyFilterVmoney(averageIncomes)
            "
          >
              <v-progress-circular
                indeterminate
                size="64"
              ></v-progress-circular>

          </base-material-stats-card>
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <base-material-stats-card
            color="red"
            icon="mdi-arrow-bottom-left"
            title="Despesas"
            :value="applyFilterVmoney(totalExpenses)"
            :disabled="loading"
            sub-icon="mdi-information-variant"
            :sub-text="
              'Média de despesas do ano: ' + applyFilterVmoney(totalExpenses)
            "
          />
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <base-material-stats-card
            color="yellow"
            icon="mdi-sack-percent"
            title="Percentual econômico"
            :value="percentOfSavings + '%'"
            sub-icon="mdi-information-variant"
            :sub-text="'Percentual econômico médio: ' + percentOfSavings + '%'"
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
    </div>
  </div>
</template>

<script>
import { VMoney } from "v-money";
import moment from "moment";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
      month: 1,
      year: 2021,
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.preloader,
    }),
    ...mapGetters({
      months: "months",
      totalExpenses: "totalExpenses",
      totalIncomes: "totalIncomes",
      percentOfSavings: "percentOfSavings",
      balance: "balance",
      balanceGoal: "balanceGoal",
      averageIncomes: "averageIncomes",
    }),
    me() {
      return this.$store.getters.me
    },
  },
  methods: {
    ...mapActions(["actionGetIndicatorsByMonth", ]),
    ...mapMutations(['SET_DATE_FILTER', 'SET_PRELOADER']),

    getIndicatorsByMonth() {
      this.$store.commit('SET_PRELOADER', true)

      setTimeout(() => {
        const date = this.formatDateYearMonthFromApi()
        const params = {
          userId: this.me.id,
          due_date: date,
        };
        console.log('params =>', params)

        this.actionGetIndicatorsByMonth(params)
            .finally(() => {this.$store.commit('SET_PRELOADER', false)});
      }, 5000);
    },

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
      this.getIndicatorsByMonth()
    },

    next() {
      this.month++;
      if (this.month === 13) {
        this.month = 1;
        this.year++;
      }
      this.getIndicatorsByMonth()
    },

    applyFilterVmoney(value) {
      console.log("entrou no apply =>", value);
      return this.$options.filters.money(value);
    },

    formatDateYearMonthFromApi() {
      var date = moment(this.year + "-" + this.month).format("YYYY-MM");
      return date
    },
  },
  created() {
    this.setDateToday()
    this.getIndicatorsByMonth();
  },
  watch: {},
};
</script>
