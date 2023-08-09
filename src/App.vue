<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info" fixed="top">
      <b-navbar-brand href="/#/dashboard">
        <span class="main-title">Subscription Management System</span>
      </b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown class="menu" text="Suscriptions" right>
            <b-dropdown-item href="#" @click="$router.push('suscriptions')" class="option">
              Suscriptions List
            </b-dropdown-item>
            <b-dropdown-item href="#" @click="logOut" class="option" v-if="$session.exists()">
              My Suscriptions
            </b-dropdown-item>
          </b-nav-item-dropdown>
          <b-nav-item-dropdown class="menu" text="My Profile" right v-if="$session.exists()">
            <b-dropdown-item disabled>{{ user }} </b-dropdown-item>
            <b-dropdown-item href="#" @click="logOut" class="option"
              ><b-icon icon="door-closed"></b-icon>&nbsp;Log out</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>

        <b-navbar-nav @click="goToLogIn()" v-if="!$session.exists()">
          <b-nav-item href="#">Log in</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div id="content">
      <router-view @setMenu="handleSetMenu"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      menu: [],
      user: "",
    };
  },
  created() {
    this.handleSetMenu();
  },
  methods: {
    handleSetMenu() {
      this.menu = [];
      this.user =
        this.$session.get("name");
    },
    logOut() {
      this.$session.destroy();

      this.$router.push("/");
    },
    goToLogIn() {
      if (this.$route.path !== "/") this.$router.push("/")
    },
  },
};
</script>

<style>
body {
  background-color: #e5e5e5 !important;
}
.main-title {
  margin-left: 10px;
  font-weight: bold;
  margin-right: 20px;
}
nav.navbar {
  background-color: #db0000 !important;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25),
    inset 0 -1px 5px rgba(0, 0, 0, 0.25);
}
li.menu a {
  color: white !important;
}
a.dropdown-item a.option {
  color: black !important;
  text-decoration: none !important;
}
a.dropdown-item.disabled {
  color: gray !important;
}
li.option a {
  color: black !important;
  text-decoration: none !important;
}
#content {
  padding: 30px;
  padding-top: 100px;
}
</style>
