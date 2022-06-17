export default [{
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
