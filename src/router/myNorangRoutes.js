export default [
  {
    path: '/mynorang/testresult',
    component: () => import('../views/mynorang/TestResultView.vue')
  },
  {
    path: '/mynorang/moodstate',
    component: () => import('../views/mynorang/MoodStateView.vue')
  },
  {
    path: '/mynorang/dailylog',
    query: {},
    component: () => import('../views/mynorang/DailyLogView.vue')
  },
  {
    path: '/mynorang/challenge',
    component: () => import('../views/mynorang/ChallengeView.vue')
  }
]
