<template>
  <v-app-bar
    id="app-bar"
    absolute
    app
    color="#FAFAFA"
    flat
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>



    <v-spacer />

    <v-btn
      class="ml-2"
      min-width="0"
      text
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
    <v-btn
      class="ml-2"
      min-width="0"
      text
      @click.prevent="leave()"
      @click="loading = !loading"
      v-if="!loading"
    >
      <span>Sair</span>
    </v-btn>
    <v-btn
      class="ml-3"
      min-width="0"
      text
      v-else
      disabled
    >
      <span>Sair
        <v-progress-circular
          indeterminate
          color="grey"
          :size="11"
          :width="2"
        ></v-progress-circular>
      </span>
    </v-btn>
  </v-app-bar>
</template>

<script>
  // Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations, mapActions } from 'vuex'

  export default {
    name: 'DashboardCoreAppBar',

    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(VListItem, {
                  attrs: this.$attrs,
                  class: {
                    'black--text': !hover,
                    'white--text secondary elevation-12': hover,
                  },
                  props: {
                    activeClass: '',
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                }, this.$slots.default)
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        loading: false,
      }
    },

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      ...mapActions([
        "logout"
      ]),

      leave() {
        this.logout()
          .then((response) => {})
          .finally(() => (this.$router.push({name: 'Login'})));
      },
    },
  }
</script>
