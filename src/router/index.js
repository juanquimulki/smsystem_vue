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
    meta: { opcion: 0 },
  },
  {
    path: "/signup",
    name: "signup",
    component: Signup,
    meta: { opcion: 0 },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: { opcion: 0 },
  },
  {
    path: "/suscriptions",
    name: "suscriptions",
    component: Suscriptions,
    meta: { opcion: 0 },
  },
  {
    path: "/mysuscriptions",
    name: "mysuscriptions",
    component: MySuscriptions,
    meta: { opcion: 0 },
  },
];

const router = new VueRouter({
  routes,
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== "login" && !router.app.$session.exists())
//     next({ name: "login" });
//   else {
//     if (to.meta.opcion == 0) {
//       next();
//     } else {
//       let opciones = router.app.$session.get("opciones");
//       if (opciones.includes(to.meta.opcion)) {
//         next();
//       }
//     }
//   }
// });

export default router;
