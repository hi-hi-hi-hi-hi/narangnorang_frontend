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
    upToDate: true,
    stompClient: null,
    unreads: 0,
    messageList: [],
    other: null,
    messageHistory: []
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
    },
    stompClient (state) {
      return state.stompClient
    },
    unreads (state) {
      return state.unreads
    },
    messageList (state) {
      return state.messageList
    },
    other (state) {
      return state.other
    },
    messageHistory (state) {
      return state.messageHistory
    }
  },
  mutations: {
    member (state, member) {
      state.member = member
    },
    upToDate (state, upToDate) {
      state.upToDate = upToDate
    },
    stompClient (state, stompClient) {
      state.stompClient = stompClient
    },
    unreads (state, unreads) {
      state.unreads = unreads
    },
    messageList (state, messageList) {
      state.messageList = messageList
    },
    other (state, other) {
      state.other = other
    },
    messageHistory (state, messageHistory) {
      state.messageHistory = messageHistory
    },
    pushIntoMessageHistory (state, message) {
      state.messageHistory.push(message)
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
