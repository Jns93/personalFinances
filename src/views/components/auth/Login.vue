<template>
  <v-app>

    <v-main id="inspire">
      <v-container
        fluid
        class="fill-height"
      >
        <v-layout align-center justify-center>
          <notifications group="foo" />
          <v-flex xs12 sm8 md4>
            <v-card class="elevation-4" style="opacity: 0.8;">
              <v-toolbar dark color="blue">
                <v-toolbar-title>Login</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form @submit.prevent="authUser">
                  <v-text-field
                    name="email"
                    label="Email"
                    type="text"
                    v-model="formData.email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="Password"
                    type="password"
                    v-model="formData.password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="grey" to="/register">Registrar</v-btn>
                    <v-btn
                      type="submit"
                      @click="loading = !loading"
                      :class="[loading ? 'disabled' : 'blue']">
                      Entrar
                        <v-progress-circular
                          class="ml-1"
                          v-if="loading"
                          indeterminate
                          color="grey darken-4"
                          :size="15"
                          :width="2"
                        ></v-progress-circular>
                    </v-btn>

                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import image from "@/assets/login.jpg";
import { mapActions } from "vuex";

export default {
  name: "Login",
  props: {
    source: String,
  },
  computed: {
    deviceName() {
      return (
        navigator.appCodeName +
        navigator.appName +
        navigator.platform +
        this.formData.email
      );
    },
  },

  data() {
    return {
      image: require('@/assets/image-bar.jpg'),

      formData: {
        email: "",
        password: "",
      },

      loading: false,
    };
  },

  methods: {
    ...mapActions(["login"]),

    authUser() {
      const params = {
        device_name: this.deviceName,
        ...this.formData,
      };

      this.login(params)
        .then(() => {
          this.$router.push({name: 'Dashboard'})
        })
        .catch((error) => {
          console.log(error.response)
          this.$notify({
            group: 'foo',
            title: 'Erro de autenticação',
            text: error.response.data.message,
            type: 'error'
          });
          this.loading = false})

    },
  },
};
</script>

<style>
#app {
  background: url('/login-background.jpg') no-repeat;
}
#inspire {
  background: none;
}
#card {
  opacity: 0.5;
}
</style>
