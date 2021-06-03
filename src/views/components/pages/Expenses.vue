<template>
  <v-container id="despesas" fluid tag="section" style="height: 95%; background: #FAFAFA" >
    <v-row justify="center">
      <v-btn class="mr-5" icon @click.prevent="prev">
        <v-icon large> mdi-chevron-left </v-icon>
      </v-btn>
      <h2
        class="font-weight-regular mt-1"
        v-for="item in expenses.months"
        :key="item.id"
      >
        {{ item[month - 1].name }} {{ year }}
      </h2>
      <v-btn class="ml-5" icon @click.prevent="next">
        <v-icon large> mdi-chevron-right </v-icon>
      </v-btn>
    </v-row>
    <v-row>
      <v-spacer></v-spacer>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-1"
            fab
            dark
            color="success"
            small
            elevation="2"
            v-bind="attrs"
            v-on="on"
            @click.prevent="payExpensesSelected()"
          >
            <v-icon dark> mdi-check </v-icon>
          </v-btn>
        </template>
        <span>Dar baixa</span>
      </v-tooltip>
      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            class="ml-1 mr-4"
            fab
            dark
            color="indigo"
            small
            elevation="2"
            v-bind="attrs"
            v-on="on"
            @click.prevent="modalStore = true"
            @click="setAmountInVMoneyPlugin(0)"
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </template>
        <span>Cadastrar despesa</span>
      </v-tooltip>
    </v-row>
    <base-material-card
      icon="mdi-arrow-bottom-left-thick"
      title="Despesas"
      class="px-5 py-3"
      color="error"
    >
      <v-simple-table dense>
        <thead>
          <tr>
            <th class="font-weight-bold">
              <label class="form-checkbox">
                <input type="checkbox" v-model="selectAll" @click="select" />
                <i class="form-icon"></i>
              </label>
            </th>
            <th class="font-weight-bold">Nome</th>
            <th class="font-weight-bold">Descrição</th>
            <th class="font-weight-bold">Categoria</th>
            <th class="font-weight-bold">Data de cadastro</th>
            <th class="font-weight-bold">Vencimento</th>
            <th class="font-weight-bold">Status</th>
            <th class="font-weight-bold text-center">Ações</th>
            <th class="font-weight-bold text-right">Valor</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="(expense, index) in expenses.expenses" :key="index">
            <td>
              <label class="form-checkbox">
                <input
                  :disabled="expense.fl_pay == true"
                  type="checkbox"
                  :value="expense.id"
                  v-model="selected"
                />
                <i class="form-icon"></i>
              </label>
            </td>
            <td>{{ expense.name }}</td>
            <td>{{ expense.description }}</td>
            <td>{{ expense.category.name }}</td>
            <td>{{ expense.created_at | moment("DD/MM/YYYY") }}</td>
            <td>{{ expense.due_date | moment("DD/MM/YYYY") }}</td>
            <td>
              <v-chip small :color="expense.fl_pay ? 'success' : 'error'">
                {{ expense.fl_pay ? "Pago" : "Á pagar" }}
              </v-chip>
            </td>
            <td class="text-center">
              <v-btn
                icon
                color="grey"
                @click="subcategoryId = expense.subcategory_id"
                @click.prevent="openModalEditExpense(expense)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                icon
                color="grey"
                @click="modalDelete = true"
                @click.prevent="expId = expense.id"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
            <td class="text-right">
              {{ expense.amount | money }}
            </td>
          </tr>
        </tbody>
        <v-progress-linear
          :active="loading"
          :indeterminate="loading"
          absolute
          bottom
          color="grey"
        ></v-progress-linear>
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <tr>
              <td colspan="8"></td>
              <td class="text-right" v-bind="attrs" v-on="on">
                <v-icon>mdi-information-variant</v-icon>
                Total: {{ totalExpenses() | money }}
              </td>
            </tr>
          </template>
          <tr>
            <span>
              Á pagar: {{ totalToPayExpenses() | money }} <br />
              Pago: {{ totalPaidExpenses() | money }}
            </span>
          </tr>
        </v-tooltip>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
    <!-- MODAL STORE EXPENSE -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="modalStore" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Registrar despesa</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Nome da despesa*"
                      required
                      v-model="expName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Descrição"
                      v-model="expDescription"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Categoria*"
                      required
                      v-model="expCategoryId"
                      :items="categories.categories.data"
                      item-text="name"
                      item-value="id"
                      v-on:change="getSubcategories(expCategoryId)"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Subcategoria*"
                      v-model="subcategoryId"
                      :items="subcategoriesByCategory"
                      item-text="name"
                      item-value="id"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      id="amount"
                      ref="amount"
                      label="Valor*"
                      required
                      v-model="expAmount"
                      v-money="money"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Vencimento*"
                      type="date"
                      v-model="expDueDate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Número de parcelas*"
                      type="number"
                      v-model="expInstallments"
                      :value="1"
                      min="1"
                    ></v-text-field>
                  </v-col>
                  <v-checkbox
                    class="ml-4"
                    v-model="expFlSplit"
                    label="Dividir despesa"
                  ></v-checkbox>
                  <v-checkbox
                    class="ml-4"
                    v-model="expFlEssential"
                    label="Despesa essencial"
                  ></v-checkbox>
                  <v-checkbox
                    class="ml-4"
                    v-model="expFlPay"
                    label="Dar baixa"
                  ></v-checkbox>
                </v-row>
              </v-container>
              <small>(*) campos de preenchimento obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click.prevent="modalStore = false"
              >
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="createExpense()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- MODAL EDIT EXPENSE -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="modalEdit" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Editar despesa</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Nome da despesa*"
                      required
                      v-model="expName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Descrição"
                      v-model="expDescription"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Categoria*"
                      required
                      v-model="expCategoryId"
                      :items="categories.categories.data"
                      item-text="name"
                      item-value="id"
                      v-on:change="getSubcategories(expCategoryId)"
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Subcategoria*"
                      v-model="subcategoryId"
                      :items="subcategoriesByCategory"
                      item-text="name"
                      item-value="id"
                    ></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      id="amount"
                      ref="amount"
                      label="Valor*"
                      required
                      v-model.lazy="expAmount"
                      v-money="money"
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Vencimento*"
                      type="date"
                      v-model="expDueDate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      disabled
                      label="Número de parcelas*"
                      type="number"
                      v-model="expInstallments"
                      :value="1"
                      min="1"
                    ></v-text-field>
                  </v-col>
                  <v-checkbox
                    class="ml-4"
                    v-model="expFlFixed"
                    label="Despesa fixa"
                  ></v-checkbox>
                  <v-checkbox
                    disabled
                    class="ml-4"
                    v-model="expFlSplit"
                    label="Dividir despesa"
                  ></v-checkbox>
                  <v-checkbox
                    class="ml-4"
                    v-model="expFlEssential"
                    label="Despesa essencial"
                  ></v-checkbox>
                  <v-checkbox
                    class="ml-4"
                    v-model="expFlPay"
                    label="Dar baixa"
                  ></v-checkbox>
                </v-row>
              </v-container>
              <small>(*) campos de preenchimento obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="modalEdit = false"
                @click.prevent="closeResetFormExp()"
              >
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveEditExpense()">
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- MODAL CONFIRM DELETE -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="modalDelete" persistent max-width="400">
          <v-card>
            <v-card-title class="headline">
              Deseja deletar a categoria ?
            </v-card-title>
            <v-card-text> Essa operação não poderá ser desfeita </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="modalDelete = false">
                Fechar
              </v-btn>
              <v-btn color="error" text @click.prevent="removeExpense()">
                Deletar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
  </v-container>
</template>

<script>
import { VMoney } from "v-money";
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    money: {
      decimal: ",",
      thousands: ".",
      precision: 2,
      masked: false,
    },
    selected: [],
    selectAll: false,
    subcategoriesByCategory: [],
    month: 1,
    year: 2021,
    modalStore: false,
    modalInfo: false,
    modalDelete: false,
    modalEdit: false,
    expId: null,
    // userId: 1,
    expName: "",
    expDescription: "",
    expCategoryId: null,
    subcategoryId: 0,
    expAmount: null,
    expDueDate: null,
    expInstallments: 1,
    expFlFixed: false,
    expFlEssential: false,
    expFlPay: false,
    expFlSplit: false,
    isLoading: false
  }),

  directives: { money: VMoney },


  created() {
    this.getCategories();
    this.getAllSubcategories();
    this.setDateToday();
    this.getExpensesByMonthFromState();
  },

  computed: {
    ...mapState({
      categories: (state) => state.categories,
      subcategories: (state) => state.subcategories,
      expenses: (state) => state.expenses,
      loading: (state) => state.preloader,
      me: state => state.auth.me,
    }),
  },

  methods: {
    ...mapActions([
      "getCategories",
      "getAllSubcategories",
      "getSubcategoriesByCategory",
      "getExpensesByMonth",
      "storeExpense",
      "deleteExpense",
      "actionPayExpensesSelected",
      "updateExpense",
      "getMe",
    ]),

    ...mapMutations(["STORE_EXPENSE"]),

    prev() {
      this.month--;
      if (this.month === 0) {
        this.month = 12;
        this.year--;
      }
      this.getExpensesByMonthFromState();
    },
    next() {
      this.month++;
      if (this.month === 13) {
        this.month = 1;
        this.year++;
      }
      this.getExpensesByMonthFromState();
    },

    getExpensesByMonthFromState() {
      this.resetExpensesState();

      const monthYear = this.formatDateYearMonth();
    if(this.me.id === '') {
      setTimeout(() => {
        const params = {
          userId: this.me.id,
          due_date: monthYear,
        };
        this.getExpensesByMonth(params);
      }, 3000);
    }
    else {
      const params = {
          userId: this.me.id,
          due_date: monthYear,
        };
        this.getExpensesByMonth(params);
    }
    },

    resetExpensesState() {
      this.expenses.expenses = [];
    },

    setDateToday() {
      const date = new Date();

      this.year = date.getFullYear();
      this.month = date.getMonth() + 1;
    },

    formatDateYearMonth() {
      var date = moment(this.year + "-" + this.month).format("YYYY-MM");
      return date;
    },

    closeResetFormExpense() {
      this.modalStore = false;
      this.expId = null;
      // this. userId: 1,
      this.expName = "";
      this.expDescription = "";
      this.expCategoryId = null;
      this.subcategoryId = null;
      this.expAmount = 0;
      this.expDueDate = null;
      this.expInstallments = null;
      this.expFlFixed = false;
      this.expFlEssential = false;
      this.expFlPay = false;
      this.expFlSplit = false;
      this.subcategoriesByCategory = [];
    },

    select() {
      this.selected = [];
      if (!this.selectAll) {
        for (var i = 0; i <= this.$store.state.expenses.expenses.length; i++) {
          if (!this.$store.state.expenses.expenses[i].fl_pay) {
            this.selected.push(this.$store.state.expenses.expenses[i].id);
          }
        }
      }
    },

    getSubcategories(id) {
      console.log("teste2");
      this.subcategoriesByCategory = [];
      for (var i = 0; i < this.subcategories.subcategories.data.length; i++) {
        if (this.subcategories.subcategories.data[i].category_id === id) {
          this.subcategoriesByCategory.push(
            this.subcategories.subcategories.data[i]
          );
        }
      }
    },

    totalExpenses() {
      let total = 0;
      this.expenses.expenses.map((item, index) => {
        total = total + parseFloat(item.amount);
      });
      return total;
    },

    totalToPayExpenses() {
      let totalToPay = 0;
      this.expenses.expenses.map((item, index) => {
        if (!item.fl_pay) {
          totalToPay = totalToPay + parseFloat(item.amount);
        }
      });
      return totalToPay;
    },

    totalPaidExpenses() {
      let totalPaid = 0;
      this.expenses.expenses.map((item, index) => {
        if (item.fl_pay) {
          totalPaid = totalPaid + parseFloat(item.amount);
        }
      });
      return totalPaid;
    },

    createExpense() {
      const params = {
        category_id: this.expCategoryId,
        subcategory_id: this.subcategoryId,
        name: this.expName,
        amount: this.expAmount,
        installments: this.expInstallments,
        due_date: this.expDueDate,
        fl_pay: this.expFlPay,
        description: this.expDescription,
        fl_fixed: this.expFlFixed,
        fl_essential: this.expFlEssential,
        fl_split: this.expFlSplit,
      };
      this.storeExpense(params)
        .then(this.getExpensesByMonthFromState)
        .finally(
          this.closeResetFormExpense(),
          setTimeout(() => {
            this.$swal({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "success",
              title: "Despesa registrada!",
            });
          }, 4000)
        );
    },

    removeExpense() {
      const params = {
        id: this.expId,
      };
      this.deleteExpense(params).then(
        this.close(),
        this.$swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: "Despesa removida",
        })
      );
    },

    openModalEditExpense(expense) {
      this.getSubcategories(expense.category_id);
      this.expId = expense.id;
      // this. userId: 1,
      this.expName = expense.name;
      this.expDescription = expense.description;
      this.expCategoryId = expense.category_id;
      this.subcategoryId = expense.subcategory_id;
      this.expAmount = expense.amount;
      this.expDueDate = expense.due_date;
      this.expInstallments = expense.installments;
      this.expFlFixed = expense.fl_fixed;
      this.expFlEssential = expense.fl_essential;
      this.expFlPay = expense.fl_pay;
      this.expFlSplit = expense.fl_split;
      this.modalEdit = true;

      this.setAmountInVMoneyPlugin(expense.amount);
    },

    saveEditExpense() {
      const params = {
        id: this.expId,
        category_id: this.expCategoryId,
        subcategory_id: this.subcategoryId,
        name: this.expName,
        amount: this.expAmount,
        installments: this.expInstallments,
        due_date: this.expDueDate,
        fl_pay: this.expFlPay,
        description: this.expDescription,
        fl_fixed: this.expFlFixed,
        fl_essential: this.expFlEssential,
        fl_split: this.expFlSplit,
      };

      this.updateExpense(params)
        .then(this.getExpensesByMonthFromState)
        .finally(
          (this.modalEdit = false),
          setTimeout(() => {
            this.$swal({
              toast: true,
              position: "bottom-end",
              showConfirmButton: false,
              timer: 3000,
              icon: "success",
              title: "Operação concluida!",
            });
          }, 4500)
        );
    },

    payExpensesSelected() {
      const params = [];
      for (var i = 0; i < this.selected.length; i++) {
        params.push({ id: this.selected[i] });
      }
      this.actionPayExpensesSelected(params).finally(
        setTimeout(() => {
          this.$swal({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Operação concluida!",
          });
        }, 0)
      );
    },

    close() {
      this.modalStore = false;
      this.modalDelete = false;
      this.expId = null;
    },

    closeResetFormExp() {
      this.modalStore = false;
      this.modalEdit = false;
      this.expId = null;
      // this. userId: 1,
      this.expName = null;
      this.expDescription = null;
      this.expCategoryId = null;
      this.subcategoryId = null;
      this.expAmount = 0;
      this.expDueDate = null;
      this.expFlFixed = false;
      this.expFlPay = false;
      this.subcategoriesByCategory = [];
    },

    setAmountInVMoneyPlugin(amount) {
      this.$refs.amount.$el.getElementsByTagName("input")[0].value = amount;
      this.expAmount = amount;
    },
  },
};
</script>
