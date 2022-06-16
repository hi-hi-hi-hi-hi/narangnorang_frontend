import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  // common
  {
    path: '/',
    name: 'main',
    component: () => import('../views/MainView.vue')
  },

  // Member
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

  // Post
  {
    path: '/post',
    name: 'post',
    component: () => import('../views/post/PostView.vue')
  },
  {
    path: '/post/write',
    name: 'postWrite',
    component: () => import('../views/post/PostWrite.vue')
  },

  // Test
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test/TestView.vue')
  },
  {
    path: '/test/1',
    name: 'test1',
    component: () => import('../views/test/Test1View.vue')
  },

  // Counsel
  {
    path: '/counsel',
    name: 'counsel',
    component: () => import('../views/counsel/CounselView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
