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
    unreads: [],
    currentDatetime: '',
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
    currentDatetime (state) {
      return state.currentDatetime
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
    updateUnreads (state) {
      state.unreads = state.unreads.filter(message => message.senderId !== state.other.id)
    },
    pushMessageIntoUnreads (state, message) {
      state.unreads.push(message)
    },
    currentDatetime (state) {
      const now = new Date()
      const year = now.getFullYear()
      const month = ('0' + (now.getMonth() + 1)).slice(-2)
      const date = ('0' + now.getDate()).slice(-2)
      const hours = ('0' + now.getHours()).slice(-2)
      const minutes = ('0' + now.getMinutes()).slice(-2)
      const seconds = ('0' + now.getSeconds()).slice(-2)
      state.currentDatetime = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
    },
    messageList (state, messageList) {
      state.messageList = messageList
    },
    updateMessageList (state, message) {
      const otherId = state.member.id === message.recieverId ? message.senderId : message.recieverId
      const index = state.messageList.findIndex(m => m.senderId === otherId || m.recieverId === otherId)
      if (index === -1) {
        state.messageList.push(message)
      } else {
        state.messageList[index] = message
      }
      state.messageList.sort((a, b) => new Date(b.datetime) - new Date(a.datetime))
    },
    other (state, other) {
      state.other = other
    },
    messageHistory (state, messageHistory) {
      state.messageHistory = messageHistory
    },
    pushMessageIntoMessageHistory (state, message) {
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
