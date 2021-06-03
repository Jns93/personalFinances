<template>
  <v-app>

    <dashboard-core-view />

  </v-app>
</template>


<script>
  export default {
    name: 'AuthTemplate',

    components: {
      DashboardCoreView: () => import('./layouts/View'),
    },

  }
</script>
