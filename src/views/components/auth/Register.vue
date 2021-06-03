<template>
  <v-main style="height: 90%" id="inspire">
    <v-container
      fluid
      class="fill-height white back"
      :style="{ backgroundImage: 'url(${image})' }"
    >
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card class="elevation-4">
            <v-toolbar dark color="blue">
              <v-toolbar-title>Cadastro</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <!-- <validation-observer> -->
                <v-form
                  @submit.prevent="registerUser"
                  ref="form"
                  v-model="valid"
                  lazy-validation
                  >
                    <v-text-field
                      name="name"
                      label="Nome:"
                      type="text"
                      v-model="formData.name"
                      :rules="validateName"
                      required
                    ></v-text-field>

                  <v-text-field
                    id="email"
                    name="email"
                    label="e-mail"
                    type="email"
                    v-model="formData.email"
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    name="password"
                    label="password"
                    type="password"
                    v-model="formData.password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="blue" :disabled="loading"
                      >Cadastrar</v-btn
                    >
                  </v-card-actions>
                </v-form>
              <!-- </validation-observer> -->
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

  data() {
    return {
      valid: true,
      image: image,
      loading: false,
      formData: {
        name: "",
        email: "",
        password: "",
      },
      errors: {
        name: "",
        email: "",
        password: "",
      },
      validateName: [
        v => !!v || this.errors.name,
      ]
    };
  },
  methods: {
    ...mapActions(["register"]),

    resetForm() {

    },

    registerUser() {
      this.resetForm();
      this.loading = true;

      this.register(this.formData)
        .then((response) => {})
        .catch((error) => {
          const errorResponse = error.response;

          if (errorResponse.status === 422) {
            this.errors = Object.assign(this.errors, errorResponse.data.errors);

            setTimeout(() => this.resetForm(), 2000);

            return;
          }
        })
        .finally(() => (this.loading = false));
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
