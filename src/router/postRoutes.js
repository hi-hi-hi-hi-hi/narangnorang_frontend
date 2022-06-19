export default [{
    path: '/post',
    name: 'post',
    component: () => import('../views/post/PostView.vue')
  },
  {
    path: '/post/:id',
    name: 'postRetrieve',
    component: () => import('../views/post/PostRetrieveView.vue')
  },
  {
    path: '/post/write',
    name: 'postWrite',
    component: () => import('../views/post/PostWriteView.vue')
  }
]
