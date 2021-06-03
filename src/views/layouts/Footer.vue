<template>
  <v-footer
    id="dashboard-core-footer"
    style="background: #FAFAFA"
  >
    <v-container >
      <v-row
        align="center"
        no-gutters
      >
        <v-col
          cols="12"
         class="text-center"
        >
          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; {{ new Date().getFullYear() }}
            by <strong>Jonas Pereira</strong>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({

    }),
  }
</script>

<style lang="sass">

</style>
