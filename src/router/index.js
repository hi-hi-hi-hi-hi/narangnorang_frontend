import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('../views/SignUpView.vue')
  },
  {
    path: '/generalSignUp',
    name: 'generalSignUp',
    component: () => import('../views/GeneralSignUpView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/post/PostView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
