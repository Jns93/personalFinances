<template>
  <v-app>

    <login />

  </v-app>
</template>


<script>
  export default {
    name: 'AuthTemplate',

    components: {
      Login: () => import('./components/auth/Login')
    },

  }
</script>
