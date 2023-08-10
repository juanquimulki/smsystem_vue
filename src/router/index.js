import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/Login";
import Signup from "../views/Signup";
import Dashboard from "../views/Dashboard";
import Suscriptions from "../views/Suscriptions";
import MySuscriptions from "../views/MySuscriptions";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "login",
    component: Login,
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
  },
  {
    path: "/suscriptions",
    name: "suscriptions",
    component: Suscriptions,
  },
  {
    path: "/mysuscriptions",
    name: "mysuscriptions",
    component: MySuscriptions,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.name !== "login") {
    if (to.name === "signup") {
      if (router.app.$session.exists()) {
        next({ name: "dashboard" });
      } else {
        next();
      }
    } else {
      if (to.name === "suscriptions") {
        next();
      } else {
        if (router.app.$session.exists()) {
          next();
        } else {
          next({ name: "login" });
        }
      }
    }
  } else {
    if (router.app.$session.exists()) {
      next({ name: "dashboard" });
    } else {
      next();
    }
  }
});

export default router;
