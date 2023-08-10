<template>
  <div class="">
    <b-card class="shadow">
      <legend>Login</legend>
      <br />
      <br />
      <b-form @submit="onSubmit">
        <b-form-group label="Email:">
          <b-form-input v-model="form.email" type="email" required></b-form-input>
        </b-form-group>

        <b-form-group label="Password:">
          <b-form-input
            v-model="form.password"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-row style="margin-top: 15px;">
          <b-col>
            <span class="options">Not a user?<br><a href="#" @click="goToSignUp()">[Sign up here]</a></span>
          </b-col>
          <b-col style="text-align: right">
            <b-overlay
              :show="busy"
              rounded
              opacity="0.6"
              spinner-small
              spinner-variant="primary"
              class="d-inline-block"
            >
              <b-button type="submit" variant="primary">Log In</b-button>
            </b-overlay>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import _axios from "../common/apiClient";

export default {
  name: "Login",
  data() {
    return {
      form: {
        email: "",
        password: "",
      },

      busy: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.busy = true;
      this.login();
    },
    login() {
      _axios
        .post("auth/login", this.form)
        .then((response) => {
            this.$session.start();
            this.$session.set("id", response.data.id);
            this.$session.set("name", response.data.name);
            this.$session.set("email", response.data.email);
            this.$session.set("token", response.data.token);
            
            this.busy = false;
            this.$router.push("dashboard");
        }).catch((error) => {
          this.busy = false;
          alert(error.response.data.message);
        });
    },
    goToSignUp() {
      this.$router.push("signup");
    },
  },
};
</script>

<style scoped>
.card {
  max-width: 350px;
  margin: auto;
  margin-top: 20px;
}
.options {
  font-size: 10pt;
  color: gray;
}
</style>
