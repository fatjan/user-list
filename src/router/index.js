import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/profile',
    //   name: 'UserProfile',
    //   component: UserProfileView,
    // },
  ],
})

export default router
