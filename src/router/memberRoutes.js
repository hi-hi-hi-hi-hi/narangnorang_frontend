export default [{
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
    path: '/generalEdit',
    name: 'generalEdit',
    component: () => import('../views/member/GeneralEditView.vue')
  },
  {
    path: '/counselorEdit',
    name: 'counselorEdit',
    component: () => import('../views/member/CounselorEditView.vue')
  },
  {
    path: '/myPage/newPw',
    name: 'newPw',
    component: () => import('../views/member/NewPwView.vue')
  },
  {
    path: '/photoUpdate',
    name: 'photoUpdate',
    component: () => import('../views/member/PhotoUpdateView.vue')
  }
]
