export default [{
    path: '/home',
    name: 'home',
    component: () => import('../views/miniroom/HomeView.vue')
  },
  {
    path: '/home/buy',
    name: 'HomeBuy',
    component: () => import('../views/miniroom/HomeBuyView.vue')
  },
  {
    path: '/home/style',
    name: 'HomeStyle',
    component: () => import('../views/miniroom/HomeStyleView.vue')
  },
  {
    path: '/home/wish',
    name: 'HomeWish',
    component: () => import('../views/miniroom/HomeWishView.vue')
  },
  {
    path: '/home/css',
    name: 'HomeCSS',
    component: () => import('../views/miniroom/HomeCSSView.vue')
  }
]
