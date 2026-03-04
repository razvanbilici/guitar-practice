import { createRouter, createWebHistory } from "vue-router";

// Import page components
import Songs from "../pages/Songs.vue";
import Theory from "../pages/Theory.vue";
import Progress from "../pages/Progress.vue";
import Home from "../pages/Home.vue";

const routes = [
    {path: "/", name: "Home", component: Home},
  { path: "/songs", name: "Songs", component: Songs },
  { path: "/theory", name: "Theory", component: Theory },
  { path: "/progress", name: "Progress", component: Progress },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
