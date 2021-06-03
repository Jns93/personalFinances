<template>
  <v-app>

    <dashboard-core-app-bar />

    <dashboard-core-drawer />

    <dashboard-core-view />

  </v-app>
</template>

<script>
  export default {
    name: 'DashboardTemplate',

    components: {
      DashboardCoreAppBar: () => import('./layouts/AppBar'),
      DashboardCoreDrawer: () => import('./layouts/Drawer'),
      DashboardCoreView: () => import('./layouts/View'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
