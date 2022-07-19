import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    pathsNotLoggedIn: [
      'main',
      'notFound',
      'login',
      'signUp',
      'generalSignUp',
      'counselorSignUp',
      'findPw',
      'newPw'
    ],
    member: null,
    upToDate: true
  },
  getters: {
    pathsNotLoggedIn (state) {
      return state.pathsNotLoggedIn
    },
    member (state) {
      return state.member
    },
    upToDate (state) {
      return state.upToDate
    }
  },
  mutations: {
    member (state, member) {
      state.member = member
    },
    upToDate (state, upToDate) {
      state.upToDate = upToDate
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [
    createPersistedState()
  ]
})
