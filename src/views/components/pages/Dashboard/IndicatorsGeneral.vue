<template>
    <div v-if="!loading">
      <p class="font-weight-thin mb-0 mt-6">Indicadores gerais</p>

      <v-row>
        <v-col cols="12" sm="6" lg="3">
          <base-material-stats-card
            color="indigo"
            icon="mdi-arrow-top-right"
            title="Despesas recorrentes"
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
            color="indigo"
            icon="mdi-arrow-bottom-left"
            title="Renda recorrente"
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
            color="indigo"
            icon="mdi-sack-percent"
            title="Despesas essenciais"
            :value="percentOfSavings + '%'"
            sub-icon="mdi-information-variant"
            :sub-text="'Percentual sob a sua renda: ' + percentOfSavings + '%'"
          />
        </v-col>

        <v-col cols="12" sm="6" lg="3">
          <base-material-stats-card
            color="indigo"
            icon="mdi-currency-usd"
            title="Saldo do ano"
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
</template>

<script>
import { VMoney } from "v-money";
import moment from "moment";
import { mapActions, mapState, mapGetters, mapMutations } from "vuex";

export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      loading: (state) => state.preloader,
    }),
    ...mapGetters({
      months: "months",
      month: "month",
      year: "year",
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
    ...mapMutations(['SET_DATE_FILTER', 'SET_PRELOADER', 'PREV_DATE', 'NEXT_DATE', 'SET_DATE_TODAY']),

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

    prev() {
      this.$store.commit('PREV_DATE');
      this.getIndicatorsByMonth()
    },

    next() {
      this.$store.commit('NEXT_DATE');
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
    this.getIndicatorsByMonth();
  },
  watch: {},
};
</script>

