<template>
  <v-container
    id="recurring"
    fluid
    tag="section"
    style="height: 90%; background: #fafafa"
  >
    <v-row>
      <v-spacer></v-spacer>
      <v-btn
        class="mx-2"
        fab
        dark
        color="indigo"
        small
        elevation="2"
        @click.prevent="modalStoreRecurringExpense = true"
      >
        <v-icon dark> mdi-plus </v-icon>
      </v-btn>
    </v-row>
    <v-row align="center" justify="center">
      <v-col cols="12">
        <base-material-card color="indigo">
          <template v-slot:heading>
            <div class="display-2 font-weight-medium">
              Despensas recorrentes
            </div>
            <v-progress-linear
              :active="isLoading"
              :indeterminate="loading"
              absolute
              bottom
              color="deep-purple accent-4"
            ></v-progress-linear>
          </template>

          <v-card-text>
            <v-container class="pa-0" fluid>
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="font-weight-bold">id</th>
                    <th class="font-weight-bold" colspan="6">Despesa</th>
                    <th class="font-weight-bold">Tipo</th>
                    <th class="font-weight-bold">Valor</th>
                    <th class="font-weight-bold text-center">Ações</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(
                      expense, index
                    ) in recurringExpenses.recurringExpenses"
                    :key="index"
                  >
                    <td>{{ expense.id }}</td>
                    <td colspan="6">{{ expense.name }}</td>
                    <td>{{ expense.type }}</td>
                    <td>{{ expense.amount | money }}</td>
                    <td class="text-center">
                      <v-btn
                        class="ml-1"
                        fab
                        dark
                        x-small
                        color="primary"
                        elevation="2"
                        @click.prevent="
                          openModalUpdateRecurringExpense(expense)
                        "
                      >
                        <v-icon dark> mdi-pencil </v-icon>
                      </v-btn>
                      <v-btn
                        class="ml-1"
                        fab
                        dark
                        x-small
                        color="error"
                        elevation="2"
                        @click="modalConfirmDeleteRecurringExpense = true"
                        @click.prevent="id = expense.id"
                      >
                        <v-icon dark> mdi-delete </v-icon>
                      </v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-simple-table>
            </v-container>
          </v-card-text>
        </base-material-card>
      </v-col>
    </v-row>

    <!-- MODAL STORE RECURRING EXPENSE -->
    <v-dialog v-model="modalStoreRecurringExpense" max-width="600px">
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
                  v-model="expSubcategoryId"
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
                  v-money
                >
                </v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-select
                  label="Vencimento*"
                  required
                  :items="days"
                  v-model="expExpirationDay"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-select
                  label="Tipo*"
                  required
                  :items="types"
                  v-model="expType"
                ></v-select>
              </v-col>
              <v-col></v-col>
            </v-row>
            <v-row>
              <v-checkbox
                class="ml-4"
                v-model="expFlEssential"
                label="Despesa essencial"
              ></v-checkbox>
              <v-checkbox
                class="ml-4"
                v-model="expFlFixed"
                label="Despesa fixa"
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
            @click="closeModal()"
            :disabled="isLoading"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="createRecurringExpense()"
            :disabled="isLoading"
          >
            <v-progress-circular
              v-show="isLoading"
              :size="15"
              width="2"
              indeterminate
              color="grey"
            ></v-progress-circular>
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- MODAL UPDATE CATEGORY -->
    <v-dialog v-model="modalUpdateRecurringExpense" max-width="400px">
      <v-card>
        <v-card-title> Editar despesa </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Nome da despesa*"
            required
            color="blue"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions class="text-right">
          <v-spacer></v-spacer>
          <v-btn text @click.prevent="closeModal()"> Fechar </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="editRecurringExpense()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- MODAL CONFIRM DELETE -->
    <template>
      <v-row justify="center">
        <v-dialog
          v-model="modalConfirmDeleteRecurringExpense"
          persistent
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline">
              Deseja deletar a despesa ?
            </v-card-title>
            <v-card-text> Essa operação não poderá ser desfeita </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="grey"
                text
                @click="modalDelete = false"
                :disabled="isLoading"
              >
                Fechar
              </v-btn>
              <v-btn
                color="error"
                text
                :disabled="isLoading"
                @click="removeRecurringExpense()"
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
import { mapActions, mapState, mapMutations } from "vuex";
import moment from "moment";

export default {
  data: () => ({
    modalStoreRecurringExpense: false,
    modalUpdateRecurringExpense: false,
    modalConfirmDeleteRecurringExpense: false,
    subcategoriesByCategory: [],
    name: "",
    id: null,
    expName: "",
    expDescription: "",
    expCategoryId: null,
    expSubcategoryId: 0,
    expAmount: null,
    expExpirationDay: null,
    expFlEssential: false,
    expFlFixed: true,
    expType: null,
    types: ["Despesa", "Renda"],
    days: [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      22, 23, 24, 25, 26, 27, 28,
    ],
    isLoading: false,
  }),

  created() {
    if (this.me.id === "") {
      setTimeout(() => {
        const params = {
          userId: this.me.id,
        };
        this.getRecurringExpenses(params);
      }, 3000);
    } else {
      const params = {
        userId: this.me.id,
      };
      this.getRecurringExpenses(params);
    }

    this.getCategories();
    this.getAllSubcategories();
  },

  computed: {
    ...mapState({
      me: (state) => state.auth.me,
      recurringExpenses: (state) => state.recurringExpenses,
      loading: (state) => state.preloader,
      categories: (state) => state.categories,
      subcategories: (state) => state.subcategories,
    }),
  },

  methods: {
    ...mapActions([
      "getCategories",
      "getAllSubcategories",
      "getSubcategoriesByCategory",
      "getRecurringExpenses",
      "storeRecurringExpense",
      "updateRecurringExpense",
      "deleteRecurringExpense",
      "getMe",
    ]),

    ...mapMutations(["STORE_RECURRING_EXPENSE"]),

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

    async createRecurringExpense() {
      this.isLoading = true;
      const params = {
        name: this.expName,
        description: this.expDescription,
        category_id: this.expCategoryId,
        subcategory_id: this.expSubcategoryId,
        amount: this.expAmount,
        expiration_day: this.expExpirationDay,
        fl_essential: this.expFlEssential,
        fl_fixed: this.expFlFixed,
        user_id: this.me.id,
        type: this.expType,
      };
      await this.storeRecurringExpense(params).then((response) => {
        console.log("then =>", response);
        this.STORE_RECURRING_EXPENSE(response.data),
          this.closeModal(),
          this.$swal({
            toast: true,
            position: "bottom-end",
            showConfirmButton: false,
            timer: 3000,
            icon: "success",
            title: "Recorrencia cadastrada",
          });
      });
    },

    openModalUpdateRecurringExpense(recurringExpense) {
      this.name = recurringExpense.name;
      this.modalUpdateRecurringExpense = true;
      this.id = recurringExpense.id;
    },

    editRecurringExpense() {
      const params = {
        id: this.id,
        name: this.name,
      };
      this.updateRecurringExpense(params).then(
        this.closeModal(),
        this.$swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: "Despesa atualizada",
        })
      );
    },

    async removeRecurringExpense() {
      this.isLoading = true;
      const params = {
        id: this.id,
      };
      await this.deleteRecurringExpense(params).then(
        this.closeModal(),
        this.$swal({
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
          icon: "success",
          title: "Despesa deletada",
        })
      );
    },

    closeModal() {
      this.isLoading = false;
      this.modalStoreRecurringExpense = false;
      this.modalUpdateRecurringExpense = false;
      this.modalConfirmDeleteRecurringExpense = false;
      this.confirmDeleteRecurringExpense = false;
      this.id = null;
      this.expName = "";
      (this.expDescription = ""),
        (this.expCategoryId = null),
        (this.expSubcategoryId = 0),
        (this.expAmount = null),
        (this.expExpirationDay = null),
        (this.expFlEssential = false),
        (this.expFlFixed = true),
        (this.expType = null);
    },
  },
};
</script>

<style lang="scss">
.tim-note {
  bottom: 10px;
  color: #c0c1c2;
  display: block;
  font-weight: 400;
  font-size: 13px;
  line-height: 13px;
  left: 0;
  margin-left: 20px;
  width: 260px;
}
</style>
