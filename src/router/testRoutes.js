export default [{
    path: '/test',
    component: () => import('../views/test/TestListView.vue')
  },
  {
    path: '/test/:type',
    component: () => import('../views/test/TestView.vue')
  },
  {
    path: '/test/:type/:result',
    component: () => import('../views/test/TestResultView.vue')
  }
]
