import { createRouter, createWebHistory } from 'vue-router'
import counselRoutes from './counselRoutes'
import memberRoutes from './memberRoutes'
import messageRoutes from './messageRoutes'
import miniroomRoutes from './miniroomRoutes'
import myNorangRoutes from './myNorangRoutes'
import postRoutes from './postRoutes'
import testRoutes from './testRoutes'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('../views/NotFoundView.vue')
  }
]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    ...routes,
    ...counselRoutes,
    ...memberRoutes,
    ...messageRoutes,
    ...miniroomRoutes,
    ...myNorangRoutes,
    ...postRoutes,
    ...testRoutes
  ]
})

export default router
