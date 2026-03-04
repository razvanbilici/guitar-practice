import { createRouter, createWebHistory } from "vue-router";


// component: () => import("..") => doesn't import the components in a large batch, 
// requests them only when needed

const routes = [
    {path: "/", name: "Home", component: () => import("../pages/Home.vue") },
  { path: "/songs", name: "Songs", component: () => import("../pages/Songs.vue") },
  { path: "/theory", name: "Theory", component: () => import("../pages/Theory.vue") },
  { path: "/progress", name: "Progress", component: () => import("../pages/Songs.vue") },

  {
    path: "/theory/scales/:key/:mode",
    name: "ScaleDetail",
    component: () => import("../pages/ScaleInfo.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
