import { createRouter, createWebHistory } from 'vue-router'
import counselRoutes from './counselRoutes'
import memberRoutes from './memberRoutes'
import miniroomRoutes from './miniroomRoutes'
import myNorangRoutes from './myNorangRoutes'
import postRoutes from './postRoutes'
import testRoutes from './testRoutes'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...routes,
    ...counselRoutes,
    ...memberRoutes,
    ...miniroomRoutes,
    ...myNorangRoutes,
    ...postRoutes,
    ...testRoutes
  ]
})

export default router
