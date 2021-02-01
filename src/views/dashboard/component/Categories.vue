<template>
  <!-- eslint-disable -->
  <v-container
    id="categories"
    fluid
    tag="section"
  >
    <v-row>
      <v-spacer></v-spacer>
      <p
      class="font-weight-medium mt-3 text--disabled"
      >
      Cadastrar categoria</p>
      <v-btn
        class="mx-2"
        fab
        dark
        color="indigo"
        small
        elevation="2"
        @click.prevent="modalStoreCategory = true"
      >
        <v-icon dark>
          mdi-plus
        </v-icon>
      </v-btn>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-col cols="12">
        <base-material-card
          color="blue"
        >
          <template v-slot:heading>
            <div class="display-2 font-weight-medium">
              Listagem de categorias
            </div>
            <v-progress-linear
              :active="loading"
              :indeterminate="loading"
              absolute
              bottom
              color="deep-purple accent-4"
            ></v-progress-linear>
          </template>

          <v-card-text>
            <v-container
              class="pa-0"
              fluid
            >
              <v-simple-table>
                <thead>
                  <tr>
                    <th class="font-weight-bold">
                      id
                    </th>
                    <th class="font-weight-bold" colspan="6">
                      Nome da Categoria
                    </th>
                    <th class="font-weight-bold text-center">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr v-for="(category, index) in categories.categories.data" :key="index">
                    <td>{{ category.id }}</td>
                    <td colspan="6">{{ category.name }}</td>
                    <td class="text-center">
                        <v-btn
                          fab
                          dark
                          x-small
                          color="indigo"
                          elevation="2"
                          @click.prevent="getSubcategories(category)"
                          @click="modalSubcategories = true"
                        >
                          <v-icon dark>
                            mdi-format-list-bulleted-square
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="ml-1"
                          fab
                          dark
                          x-small
                          color="primary"
                          elevation="2"
                          @click.prevent="openModalUpdateCategory(category)"
                        >
                          <v-icon dark>
                            mdi-pencil
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="ml-1"
                          fab
                          dark
                          x-small
                          color="error"
                          elevation="2"
                          @click="modalConfirmDeleteCategory = true"
                          @click.prevent="id = category.id"
                        >
                          <v-icon dark>
                            mdi-delete
                          </v-icon>
                        </v-btn>
                        <v-btn
                          class="mx-2"
                          fab
                          dark
                          color="cyan"
                          x-small
                          elevation="2"
                          @click.prevent="openModalStoreSubcategory(category)"
                        >
                          <v-icon dark>
                            mdi-plus
                          </v-icon>
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

<!-- MODAL STORE CATEGORY -->
    <v-dialog
      v-model="modalStoreCategory"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          Cadastrar categoria
        </v-card-title>
        <v-card-text>
          <div class="text-center">
          </div>
          <v-text-field
            label="Nome da categoria*"
            required
            color="blue"
            v-model="name">
          </v-text-field>
        </v-card-text>
        <v-card-actions
        class="text-right">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click.prevent="closeModal()"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="createCategory(name)"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- MODAL UPDATE CATEGORY -->
    <v-dialog
      v-model="modalUpdateCategory"
      max-width="400px"
    >

      <v-card>
        <v-card-title>
        Editar categoria
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Nome da categoria*"
            required
            color="blue"
            >
          </v-text-field>
        </v-card-text>
        <v-card-actions
        class="text-right">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click.prevent="closeModal()"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="editCategory()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- MODAL CONFIRM DELETE CATEGORY -->
    <v-dialog
      v-model="modalConfirmDeleteCategory"
      max-width="390"
    >
      <v-card>
        <v-card-title class="headline">
          Deseja deletar a categoria ?
        </v-card-title>

        <v-card-text>
          Essa operação não poderá ser desfeita.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue"
            text
            @click="closeModal()"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="red"
            text
            @click.prevent="removeCategory(id)"
          >
            Apagar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- MODAL SUBCATEGORIES -->
    <v-dialog
      v-model="modalSubcategories"
      max-width="500px"
    >
      <v-card>
        <v-card-title
        v-show="!loading">
          Subcategorias de {{ name }}
        </v-card-title>
        <v-card-text>
          <div class="text-center">
            <v-progress-circular
              :indeterminate="loading"
              v-show="loading"
            ></v-progress-circular>
          </div>
          <v-simple-table
          v-show="!loading">
              <thead>
                <tr>
                  <th class="font-weight-bold">
                    id
                  </th>
                  <th class="font-weight-bold" colspan="6">
                    Nome da Subcategoria
                  </th>
                  <th class="font-weight-bold text-center">
                    Ações
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="(subcategory, index) in subcategories.subcategories.data" :key="index">
                  <td>{{ subcategory.id }}</td>
                  <td colspan="6">{{ subcategory.name }}</td>
                  <td class="text-center">
                      <v-btn
                        class="ml-1"
                        fab
                        dark
                        x-small
                        color="primary"
                        elevation="2"
                        @click.prevent="openModalUpdateSubcategory(subcategory)"
                      >
                        <v-icon dark>
                          mdi-pencil
                        </v-icon>
                      </v-btn>
                      <v-btn
                        class="ml-1"
                        fab
                        dark
                        x-small
                        color="error"
                        elevation="2"
                        @click.prevent="modalConfirmDeleteSubcategory = true"
                        @click="id = subcategory.id"
                      >
                        <v-icon dark>
                          mdi-delete
                        </v-icon>
                      </v-btn>
                  </td>
                </tr>
              </tbody>
            </v-simple-table>
        </v-card-text>
        <v-card-actions
        class="text-right">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click.prevent="closeModal()"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- MODAL STORE SUBCATEGORY -->
    <v-dialog
      v-model="modalStoreSubcategory"
      max-width="400px"
    >
      <v-card>
        <v-card-title>
          Cadastrar Subcategoria
        </v-card-title>
        <v-card-text>
          <div class="text-center">
          </div>
          <v-text-field
            label="Nome da subcategoria*"
            required
            color="blue"
            v-model="name">
          </v-text-field>
        </v-card-text>
        <v-card-actions
        class="text-right">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click.prevent="closeModal()"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="createSubcategory()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- MODAL CONFIRM DELETE SUBCATEGORY -->
    <v-dialog
      v-model="modalConfirmDeleteSubcategory"
      max-width="390"
    >
      <v-card>
        <v-card-title class="headline">
          Tem certeza que deseja deletar a Subcategoria ?
        </v-card-title>

        <v-card-text>
          Essa operação não poderá ser desfeita.
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="blue"
            text
            @click.prevent="modalConfirmDeleteSubcategory = false"
          >
            Cancelar
          </v-btn>

          <v-btn
            color="red"
            text
            @click.prevent="removeSubcategory()"
          >
            Apagar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

<!-- MODAL UPDATE SUBCATEGORY -->
    <v-dialog
      v-model="modalUpdateSubcategory"
      max-width="400px"
    >

      <v-card>
        <v-card-title>
        Editar Subcategoria
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="name"
            label="Nome da subcategoria*"
            required
            color="blue"
            >
          </v-text-field>
        </v-card-text>
        <v-card-actions
        class="text-right">
          <v-spacer></v-spacer>
          <v-btn
            text
            @click.prevent="modalUpdateSubcategory = false"
          >
            Fechar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click.prevent="editSubcategory()"
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'

  export default {
    data: () => ({
      modalStoreCategory: false,
      modalUpdateCategory: false,
      modalConfirmDeleteCategory: false,
      modalSubcategories: false,
      modalStoreSubcategory: false,
      modalUpdateSubcategory: false,
      modalConfirmDeleteSubcategory: false,
      name: '',
      id: null,
    }),

    created () {
      this.getCategories()
    },

    computed: {
      ...mapState({
        categories: state => state.categories,
        subcategories: state => state.subcategories,
        loading: state => state.preloader,
      }),

    },

    methods: {
      ...mapActions([
        'getCategories',
        'storeCategory',
        'updateCategory',
        'deleteCategory',
        'getSubcategoriesByCategory',
        'deleteSubcategory',
        'updateSubcategory',
        'storeSubcategory',
      ]),

      ...mapMutations([
        'STORE_CATEGORY',
      ]),

      getSubcategories (category) {
        const params = {
          id_category: category.id,
        }
        this.name = category.name
        this.getSubcategoriesByCategory(params)
      },

      createCategory (name) {
        const params = {
          name: this.name,
        }
        this.storeCategory(params)
          .then(response => (this.STORE_CATEGORY(response.data.data)),
                this.closeModal(),
                this.$swal({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  icon: 'success',
                  title: 'Nova categoria cadastrada',
                }))
      },

      openModalUpdateCategory (category) {
        this.name = category.name
        this.modalUpdateCategory = true
        this.id = category.id
      },

      editCategory () {
        const params = {
          id: this.id,
          name: this.name,
        }
        this.updateCategory(params)
          .then(this.closeModal(),
                this.$swal({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  icon: 'success',
                  title: 'Categoria atualizada',
                }))
      },

      removeCategory (id) {
        const params = {
          id: this.id,
        }
        this.deleteCategory(params)
          .then(this.closeModal(),
                this.$swal({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  icon: 'success',
                  title: 'Categoria deletada',
                }))
      },

      closeModal () {
        this.modalSubcategories = false
        this.modalStoreCategory = false
        this.modalStoreSubcategory = false
        this.modalUpdateCategory = false
        this.modalConfirmDeleteCategory = false
        this.confirmDeleteCategory = false
        this.name = ''
        this.id = null
        this.subcategories.subcategories.data = []
      },

      openModalStoreSubcategory (category) {
        this.modalStoreSubcategory = true
        this.id = category.id
      },

      createSubcategory () {
        const params = {
          category_id: this.id,
          name: this.name,
        }
        this.storeSubcategory(params)
          .then(this.closeModal(),
                this.$swal({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  icon: 'success',
                  title: 'Nova subcategoria cadastrada',
                }))
      },

      openModalUpdateSubcategory (subcategory) {
        this.name = subcategory.name
        this.modalUpdateSubcategory = true
        this.id = subcategory.id
      },

      removeSubcategory () {
        const params = {
          id: this.id,
        }
        console.log(params)
        this.deleteSubcategory(params)
          .then(this.modalConfirmDeleteSubcategory = false,
                this.$swal({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  icon: 'success',
                  title: 'Subcategoria deletada',
                }))
      },

      editSubcategory () {
        console.log(this.id, this.name)
        const params = {
          id: this.id,
          name: this.name,
        }
        this.updateSubcategory(params)
          .then(this.modalUpdateSubcategory = false,
                this.$swal({
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000,
                  icon: 'success',
                  title: 'Subcategoria editada',
                }))
      },
    },

  }
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
