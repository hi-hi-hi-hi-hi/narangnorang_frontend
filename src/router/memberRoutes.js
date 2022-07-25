export default [{
    path: '/login',
    name: 'login',
    component: () => import('../views/member/LoginView.vue')
  },
  {
    path: '/kakaoLogin',
    name: 'kakaoLogin',
    component: () => import('../views/member/KakaoLoginView.vue')
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
    path: '/kakaoSignUp',
    name: 'kakaoSignUp',
    component: () => import('../views/member/KakaoSignUpView.vue')
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
    path: '/newPw',
    name: 'newPw',
    component: () => import('../views/member/NewPwView1.vue')
  },
  {
    path: '/myPage/newPw',
    name: 'myPageNewPw',
    component: () => import('../views/member/NewPwView2.vue')
  },
  {
    path: '/photoUpdate',
    name: 'photoUpdate',
    component: () => import('../views/member/PhotoUpdateView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../views/member/AdminView.vue')
  },
  {
    path: '/memberManagement',
    name: 'memberManagement',
    component: () => import('../views/member/MemberManagementView.vue')
  },
  {
    path: '/counselorPrivilege',
    name: 'counselorPrivilege',
    component: () => import('../views/member/CounselorPrivilegeView.vue')
  }
]
