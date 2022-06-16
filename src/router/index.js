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
    path: '/post/write',
    name: 'postWrite',
    component: () => import('../views/post/PostWrite.vue')
  },
  {
    path: '/test',
    name: 'testList',
    component: () => import('../views/test/TestListView.vue')
  },
  {
    path: '/test/:type',
    name: 'test',
    component: () => import('../views/test/TestView.vue')
  },
  {
    path: '/test/:type/:result',
    name: 'testResult',
    component: () => import('../views/test/TestResultView.vue')
  },
  {
    path: '/mynorang',
    name: 'myNorang',
    component: () => import('../views/mynorang/MyNorangView.vue')
  },
  {
    path: '/mynorang/testresult',
    name: 'myNorangTestResult',
    component: () => import('../views/mynorang/TestResultView.vue')
  },
  {
    path: '/mynorang/moodstate',
    name: 'myNorangMoodState',
    component: () => import('../views/mynorang/MoodStateView.vue')
  },
  {
    path: '/mynorang/dailylog',
    name: 'myNorangDailyLog',
    component: () => import('../views/mynorang/DailyLogView.vue')
  },
  {
    path: '/mynorang/challenge',
    name: 'myNorangChallenge',
    component: () => import('../views/mynorang/ChallengeView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
