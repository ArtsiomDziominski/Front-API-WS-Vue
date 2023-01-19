// Composables
import {createRouter, createWebHistory} from 'vue-router'
import TheMain from "@/views/TheMain.vue";

const routes = [
  {
    path: '/',
    name: 'TheMain',
    component: TheMain,
  },
  {
    path: '/setting',
    name: 'TheSetting',
    component: () => import("@/views/TheSettings.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
