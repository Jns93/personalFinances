<template>
  <v-container
    id="receitas"
    fluid
    tag="section"
    style="height: 90%; background: #fafafa"
  >
    <v-row justify="center">
      <v-btn class="mr-5" dark color="grey" icon @click.prevent="prevControlMonth">
        <v-icon large> mdi-chevron-left </v-icon>
      </v-btn>
      <h2
        class="font-weight-regular mt-1"
        v-for="item in incomes.months"
        :key="item.id"
      >
        {{ item[month - 1].name }} {{ year }}
      </h2>
      <v-btn class="ml-5" dark color="grey" icon @click.prevent="nextControlMonth">
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
            @click.prevent="receiveIncomesSelected()"
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
          >
            <v-icon dark> mdi-plus </v-icon>
          </v-btn>
        </template>
        <span>Cadastrar receita</span>
      </v-tooltip>
    </v-row>
    <base-material-card
      icon="mdi-arrow-top-right"
      title="Receitas"
      class="px-5 py-3"
      color="success"
    >
      <v-simple-table dense>
        <thead>
          <tr>
            <th class="font-weight-bold">
              <label class="form-checkbox">
                <input
                  type="checkbox"
                  v-model="selectAll"
                  @click="selectItemsReceived"
                />
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
          <tr v-for="(income, index) in incomes.incomes" :key="index">
            <td>
              <label class="form-checkbox">
                <input
                  :disabled="income.fl_pay == true"
                  type="checkbox"
                  :value="income.id"
                  v-model="selected"
                />
                <i class="form-icon"></i>
              </label>
            </td>
            <td>{{ income.name }}</td>
            <td>{{ income.description }}</td>
            <td>{{ income.category.name }}</td>
            <td>{{ income.created_at | moment("DD/MM/YYYY") }}</td>
            <td>{{ income.due_date | moment("DD/MM/YYYY") }}</td>
            <td>
              <v-chip small :color="income.fl_pay ? 'success' : 'error'">
                {{ income.fl_pay ? "Recebido" : "Á receber" }}
              </v-chip>
            </td>
            <td class="text-center">
              <v-btn
                small
                icon
                color="grey"
                @click="incomeSubcategoryId = income.subcategory_id"
                @click.prevent="openModalEditIncome(income)"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn
                small
                icon
                color="grey"
                @click="modalDelete = true"
                @click.prevent="incomeId = income.id"
              >
                <v-icon>mdi-delete</v-icon>
              </v-btn>
            </td>
            <td class="text-right">
              {{ income.amount | money }}
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
                Total: {{ sumTotalIncomes() | money }}
              </td>
            </tr>
          </template>
          <tr>
            <span>
              Á receber: {{ sumTotalWillReceiveIncomes() | money }} <br />
              Recebido: {{ sumTotalReceivedIncomes() | money }}
            </span>
          </tr>
        </v-tooltip>
      </v-simple-table>
    </base-material-card>

    <div class="py-3" />
    <!-- MODAL STORE INCOME -->
    <template>
      <v-row justify="center">
        <v-dialog v-model="modalStore" persistent max-width="600px">
          <v-card>
            <v-card-title>
              <span class="headline">Registrar receita</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Nome da receita*"
                      required
                      v-model="incomeName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Descrição"
                      v-model="incomeDescription"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Categoria*"
                      required
                      v-model="incomeCategoryId"
                      :items="categories.categories.data"
                      item-text="name"
                      item-value="id"
                      v-on:change="
                        getSubcategoriesByCategoryForForm(incomeCategoryId)
                      "
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Subcategoria*"
                      v-model="incomeSubcategoryId"
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
                      v-model="incomeAmount"
                      v-money
                      >{{ incomeAmount }}
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Vencimento*"
                      type="date"
                      v-model="incomeDueDate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6"> </v-col>
                  <v-checkbox
                    class="ml-4"
                    v-model="incomeFlFixed"
                    label="Despesa fixa"
                  ></v-checkbox>
                  <v-checkbox
                    class="ml-4"
                    v-model="incomeFlPay"
                    label="Dar baixa"
                  ></v-checkbox>
                </v-row>
              </v-container>
              <small>(*) campos de preenchimento obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeResetFormIncome()">
                Close
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="saveFormAndCreateIncome()"
              >
                Save
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-row>
    </template>
    <!-- MODAL EDIT INCOME -->
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
                      v-model="incomeName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Descrição"
                      v-model="incomeDescription"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Categoria*"
                      required
                      v-model="incomeCategoryId"
                      :items="categories.categories.data"
                      item-text="name"
                      item-value="id"
                      v-on:change="
                        getSubcategoriesByCategoryForForm(incomeCategoryId)
                      "
                    >
                    </v-select>
                  </v-col>
                  <v-col cols="12" sm="6">
                    <v-select
                      label="Subcategoria*"
                      v-model="incomeSubcategoryId"
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
                      v-model.lazy="incomeAmount"
                      v-money
                    >
                    </v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6">
                    <v-text-field
                      label="Vencimento*"
                      type="date"
                      v-model="incomeDueDate"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="6"> </v-col>
                  <v-checkbox
                    class="ml-4"
                    v-model="incomeFlFixed"
                    label="Despesa fixa"
                  ></v-checkbox>
                  <v-checkbox
                    class="ml-4"
                    v-model="incomeFlPay"
                    label="Dar baixa"
                  ></v-checkbox>
                </v-row>
              </v-container>
              <small>(*) campos de preenchimento obrigatório</small>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeResetFormIncome()">
                Close
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveFormEditIncome()">
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
              Deseja deletar essa receita ?
            </v-card-title>
            <v-card-text> Essa operação não poderá ser desfeita </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="grey" text @click="modalDelete = false">
                Fechar
              </v-btn>
              <v-btn
                color="error"
                text
                @click.prevent="saveFormAndRemoveIncome()"
              >
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
import { mapActions, mapState, mapMutations, mapGetters } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    selected: [],
    selectAll: false,
    subcategoriesByCategory: [],
    month: null,
    year: null,
    modalStore: false,
    modalInfo: false,
    modalDelete: false,
    modalEdit: false,
    incomeId: null,
    // userId: 1,
    incomeName: "",
    incomeDescription: "",
    incomeCategoryId: null,
    incomeSubcategoryId: null,
    incomeAmount: null,
    incomeDueDate: null,
    incomeFlFixed: false,
    incomeFlPay: false,
  }),

  created() {
    this.setDateToday();
    this.getIncomesByMonthFromState();
    this.getCategories();
    this.getAllSubcategories();
  },

  computed: {
    ...mapState({
      categories: (state) => state.categories,
      subcategories: (state) => state.subcategories,
      incomes: (state) => state.incomes,
      loading: (state) => state.preloader,
      me: (state) => state.auth.me,
    }),
  },

  methods: {
    ...mapActions([
      "getCategories",
      "getAllSubcategories",
      "getSubcategoriesByCategory",
      "getIncomesByMonth",
      "storeIncome",
      "deleteIncome",
      "actionPayIncomesSelected",
      "updateIncome",
    ]),

    ...mapMutations(["STORE_INCOME"]),

    ...mapGetters([]),

    prevControlMonth() {
      this.month--;
      if (this.month === 0) {
        this.month = 12;
        this.year--;
      }
      this.getIncomesByMonthFromState();
    },
    nextControlMonth() {
      this.month++;
      if (this.month === 13) {
        this.month = 1;
        this.year++;
      }
      this.getIncomesByMonthFromState();
    },

    getIncomesByMonthFromState() {
      this.resetIncomesState();
      const monthYear = this.formatDateYearMonth();

      if (this.me.id === "") {
        setTimeout(() => {
          const params = {
            userId: this.me.id,
            due_date: monthYear,
          };
          this.getIncomesByMonth(params);
        }, 3000);
      } else {
        const params = {
          userId: this.me.id,
          due_date: monthYear,
        };
        this.getIncomesByMonth(params);
      }
    },

    resetIncomesState() {
      this.incomes.incomes = [];
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

    closeResetFormIncome() {
      this.modalStore = false;
      this.modalEdit = false;
      this.incomeId = null;
      // this. userId: 1,
      this.incomeName = null;
      this.incomeDescription = null;
      this.incomeCategoryId = null;
      this.incomeSubcategoryId = null;
      this.incomeAmount = 0;
      this.incomeDueDate = null;
      this.incomeFlFixed = false;
      this.incomeFlPay = false;
      this.subcategoriesByCategory = [];
    },

    selectItemsReceived() {
      this.selected = [];
      if (!this.selectAll) {
        for (var i = 0; i <= this.$store.state.incomes.incomes.length; i++) {
          if (!this.$store.state.incomes.incomes[i].fl_pay) {
            this.selected.push(this.$store.state.incomes.incomes[i].id);
          }
        }
      }
    },

    getSubcategoriesByCategoryForForm(id) {
      this.subcategoriesByCategory = [];
      for (var i = 0; i < this.subcategories.subcategories.data.length; i++) {
        if (this.subcategories.subcategories.data[i].category_id === id) {
          this.subcategoriesByCategory.push(
            this.subcategories.subcategories.data[i]
          );
        }
      }
    },

    sumTotalIncomes() {
      let total = 0;
      this.incomes.incomes.map((item, index) => {
        total = total + parseFloat(item.amount);
      });
      return total;
    },

    sumTotalWillReceiveIncomes() {
      let totalToPay = 0;
      this.incomes.incomes.map((item, index) => {
        if (!item.fl_pay) {
          totalToPay = totalToPay + parseFloat(item.amount);
        }
      });
      return totalToPay;
    },

    sumTotalReceivedIncomes() {
      let totalPaid = 0;
      this.incomes.incomes.map((item, index) => {
        if (item.fl_pay) {
          totalPaid = totalPaid + parseFloat(item.amount);
        }
      });
      return totalPaid;
    },

    saveFormAndCreateIncome() {
      const params = {
        category_id: this.incomeCategoryId,
        subcategory_id: this.incomeSubcategoryId,
        name: this.incomeName,
        amount: this.incomeAmount,
        installments: this.expInstallments,
        due_date: this.incomeDueDate,
        fl_pay: this.incomeFlPay,
        description: this.incomeDescription,
        fl_fixed: this.incomeFlFixed,
        fl_essential: this.expFlEssential,
        fl_split: this.expFlSplit,
      };
      this.storeIncome(params)
        .then(this.getIncomesByMonthFromState)
        .finally(
          this.closeResetFormIncome(),
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

    saveFormAndRemoveIncome() {
      const params = {
        id: this.incomeId,
      };
      this.deleteIncome(params).then(
        this.closeForm(),
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

    openModalEditIncome(income) {
      this.getSubcategoriesByCategoryForForm(income.category_id);
      this.incomeId = income.id;
      this.incomeName = income.name;
      this.incomeDescription = income.description;
      this.incomeCategoryId = income.category_id;
      this.incomeSubcategoryId = income.subcategory_id;
      this.incomeAmount = income.amount;
      this.incomeDueDate = income.due_date;
      this.incomeFlFixed = income.fl_fixed;
      this.incomeFlPay = income.fl_pay;
      this.modalEdit = true;
    },

    saveFormEditIncome() {
      const params = {
        id: this.incomeId,
        category_id: this.incomeCategoryId,
        subcategory_id: this.incomeSubcategoryId,
        name: this.incomeName,
        amount: this.incomeAmount,
        due_date: this.incomeDueDate,
        fl_pay: this.incomeFlPay,
        description: this.incomeDescription,
        fl_fixed: this.incomeFlFixed,
      };

      this.updateIncome(params)
        .then(this.getIncomesByMonthFromState)
        .finally(
          this.closeResetFormIncome(),
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

    receiveIncomesSelected() {
      const params = [];
      for (var i = 0; i < this.selected.length; i++) {
        params.push({ id: this.selected[i] });
      }
      this.actionPayIncomesSelected(params).finally(
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

    closeForm() {
      this.modalStore = false;
      this.modalDelete = false;
      this.incomeId = null;
    },

    // formatPrice (value) {
    //   const val = (value / 1).toFixed(2).replace('.', ',')
    //   return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    // },

    // setAmountInVMoneyPlugin(amount) {
    //   this.$refs.amount.$el.getElementsByTagName("input")[0].value = amount;
    //   this.incomeAmount = amount;
    // },
  },
};
</script>
