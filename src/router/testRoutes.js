export default [{
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
  }
]
