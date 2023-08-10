<template>
  <div class="">
    <b-card class="shadow">
      <legend>Signup</legend>
      <br />
      <br />
      <b-form @submit="onSubmit">
        <b-form-group label="Name:">
          <b-form-input v-model="form.name" type="text" required></b-form-input>
        </b-form-group>
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
        <b-form-group label="Re type password:">
          <b-form-input
            v-model="form.repassword"
            type="password"
            required
          ></b-form-input>
        </b-form-group>

        <b-row style="margin-top: 15px;">
          <b-col>
            <span class="options">Already a user?<br><a href="#" @click="goToLogIn()">[Log in here]</a></span>
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
              <b-button type="submit" variant="primary">Sign Up</b-button>
            </b-overlay>
          </b-col>
        </b-row>
      </b-form>
    </b-card>
  </div>
</template>

<script>
import _axios from "../common/apiClient";
import msgBoxModal from "@/common/modal";

export default {
  name: "Signup",
  data() {
    return {
      form: {
        name: "",
        email: "",
        password: "",
        repassword: "",
      },

      busy: false,
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.busy = true;
      this.signup();
    },
    signup() {
      _axios
        .post("auth/register", this.form)
        .then((response) => {
            this.busy = false;
            msgBoxModal("Done!", response.data.message, "success");
            this.$router.push("/");
        }).catch((error) => {
          this.busy = false;
          msgBoxModal("Error", error.response.data.message, "danger");
        });
    },
    goToLogIn() {
      this.$router.push("/");
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
