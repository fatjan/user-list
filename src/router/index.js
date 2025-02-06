import { createRouter, createWebHistory } from 'vue-router'
import UserProfileView from '../views/UserProfileView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/profile',
      name: 'UserProfile',
      component: UserProfileView,
    },
  ],
})

export default router
