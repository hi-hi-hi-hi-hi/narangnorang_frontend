export default [{
    path: '/post',
    name: 'post',
    component: () => import('../views/post/PostView.vue')
  },
  {
    path: '/post/retrieve',
    name: 'postRetrieve',
    component: () => import('../views/post/PostRetrieve.vue')
  },
  {
    path: '/post/write',
    name: 'postWrite',
    component: () => import('../views/post/PostWrite.vue')
  }
]
