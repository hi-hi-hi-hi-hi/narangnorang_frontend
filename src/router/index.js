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
    component: () => import('../views/member/LoginView.vue')
  },
  {
    path: '/signUp',
    name: 'signUp',
    component: () => import('../views/member/SignUpView.vue')
  },
  {
    path: '/generalSignUp',
    name: 'generalSignUp',
    component: () => import('../views/member/GeneralSignUpView.vue')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/miniroom/HomeView.vue')
  },
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/post/PostView.vue')
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/TestView.vue')
  },
  {
    path: '/test/1',
    name: 'test1',
    component: () => import('../views/test/Test1View.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
