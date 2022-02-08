<template>
  <v-app>
    <v-main style="background: #fafafa">
      <v-container flud>
        <router-view />
      </v-container>
    </v-main>
    <dashboard-core-footer />
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardCoreView',

    components: {
      DashboardCoreFooter: () => import('./Footer'),
    },
  }
</script>
