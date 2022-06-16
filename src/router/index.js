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
    path: '/counselorSignUp',
    name: 'counselorSignUp',
    component: () => import('../views/member/CounselorSignUpView.vue')
  },
  {
    path: '/findPw',
    name: 'findPw',
    component: () => import('../views/member/FindPwView.vue')
  },
  {
    path: '/myPage',
    name: 'myPage',
    component: () => import('../views/member/MyPageView.vue')
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
