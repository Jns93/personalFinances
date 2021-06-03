<template>
  <v-main style="height: 90%" id="inspire">
    <v-container
      fluid
      class="fill-height white back"
      :style="{ backgroundImage: 'url(${image})' }"
    >
      <v-layout align-center justify-center>
        <notifications group="foo" />
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-4">
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
      image: image,

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
.back {
  background-image: url(https://images.pexels.com/photos/186077/pexels-photo-186077.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260);
  background-size: cover;
}
#inspire {
  background: none;
}
</style>
