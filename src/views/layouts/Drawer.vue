<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    mobile-breakpoint="960"
    :src="barImage"
    app
    width="260"
    v-bind="$attrs"
    disable-route-watcher

  >
    <template v-slot:img="props">
      <v-img
        :gradient="`to bottom, ${barColor}`"
        v-bind="props"
      />
    </template>


    <v-list
      dense
      nav
    >
      <v-list-item>
        <v-list-item-avatar
          class="align-self-center"
          color="white"
          contain
        >
          <v-img
            max-height="30"
          />
        </v-list-item-avatar>

      <v-list-item-content>
          <v-spacer></v-spacer>
          <v-list-item-title
            class="display-1"
            v-text="profile.title"
          />
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-divider class="mb-2" />

    <v-list
      expand
      nav
    >




      <template v-for="(item, i) in computedItems">
        <base-item-group
          v-if="item.children"
          :key="`group-${i}`"
          :item="item"
        >
          <!--  -->
        </base-item-group>

        <base-item
          v-else
          :key="`item-${i}`"
          :item="item"
        />
      </template>


    </v-list>

    <v-list>
      <v-divider class="mb-3" />
      <v-list-item
      class="align-self-center mr-5 ml-5"
      >
        <template>
          Dark Mode
          <v-spacer />
              <v-switch
                v-model="$vuetify.theme.dark"
                class="ma-0 pa-0"
                color="indigo darken-3"
                hide-details
              />
        </template>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'

  export default {
    name: 'DashboardCoreDrawer',

    props: {
      expandOnHover: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'dashboard',
          to: '/dashboard',
        },
        {
          icon: 'mdi-arrow-top-right',
          title: 'Receitas',
          to: '/receitas',
        },
        {
          title: 'Despesas',
          icon: 'mdi-arrow-bottom-left',
          to: '/despesas',
        },
        {
          title: 'Categorias',
          icon: 'mdi-format-font',
          to: '/categories',
        },
        // {
        //   title: 'Agendamentos',
        //   icon: 'mdi-chart-bubble',
        //   to: '/components/icons',
        // },
        // {
        //   title: 'Relatórios',
        //   icon: 'mdi-map-marker',
        //   to: '/maps/google-maps',
        // },
        // {
        //   title: 'notifications',
        //   icon: 'mdi-bell',
        //   to: '/components/notifications',
        // },
      ],
    }),

    computed: {
      ...mapState(['barColor', 'barImage']),
      drawer: {
        get () {
          return this.$store.state.drawer
        },
        set (val) {
          this.$store.commit('SET_DRAWER', val)
        },
      },
      computedItems () {
        return this.items.map(this.mapItem)
      },
      profile () {
        return {
          avatar: true,
          title: 'Finanças pessoais',
        }
      },
    },

    methods: {
      mapItem (item) {
        return {
          ...item,
          children: item.children ? item.children.map(this.mapItem) : undefined,
          title: item.title,
        }
      },
    },
  }
</script>

<style lang="sass">
  @import '~vuetify/src/styles/tools/_rtl.sass'

  #core-navigation-drawer
    .v-list-group__header.v-list-item--active:before
      opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px
        color: white

        +ltr()
          margin-right: 24px
          margin-left: 12px !important

        +rtl()
          margin-left: 24px
          margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
          padding-left: 8px

        +rtl()
          padding-right: 8px

      .v-list-group__header
        +ltr()
          padding-right: 0

        +rtl()
          padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
            margin-right: 8px

          +rtl()
            margin-left: 8px
</style>
