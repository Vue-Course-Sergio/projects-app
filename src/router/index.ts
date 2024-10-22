import { createRouter, createWebHistory } from 'vue-router'
import ProjectsLayout from '@/modules/projects/layouts/ProjectsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ProjectsLayout,
    },
  ],
})

export default router
