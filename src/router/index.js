import { createRouter, createWebHashHistory } from "vue-router";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/login",
      component: () => import("../views/Login.vue"),
    },
    {
      path: "/dashboard",
      component: () => import("../views/Dashboard.vue"),
    },
  ],
});
