export default [{
    path: '/counsel',
    name: 'counsel',
    component: () => import('../views/counsel/CounselorListView.vue')
  },
  {
    path: '/counsel/map',
    name: 'counselMap',
    component: () => import('../views/counsel/CenterMapView.vue')
  }
]
