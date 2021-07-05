<template>
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
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import moment from "moment";

export default {
  data() {
    return {
      month: 1,
      year: 2021,
    }
  },
  computed: {
    ...mapGetters({
      months: "months"
    })
  },
  created() {
    this.setDateToday()
  },
  methods: {
    ...mapMutations(['SET_DATE_FILTER']),
    setDateToday() {
      const date = new Date();
      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;

      this.formatDateYearMonthFromApi()
    },
    prev() {
      this.month--;
      if (this.month === 0) {
        this.month = 12;
        this.year--;
      }

      this.formatDateYearMonthFromApi()
    },
    next() {
      this.month++;
      if (this.month === 13) {
        this.month = 1;
        this.year++;
      }

      this.formatDateYearMonthFromApi()
    },
    formatDateYearMonthFromApi() {
      var date = moment(this.year + "-" + this.month).format("YYYY-MM");
      this.SET_DATE_FILTER(date);
    },
  }
}
</script>
