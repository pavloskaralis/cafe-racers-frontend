import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/versus-ai",
    name: "Versus AI",
    component: () => import("../views/Game.vue"),
  },
  {
    path: "/2-player/:id",
    name: "2 Player",
    component: () => import("../views/Game.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
