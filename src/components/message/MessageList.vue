<template>
  <!-- 대화 List -->
  <div class="list-outer list-section">
    <div v-for="(message, idx) in messageList" :key="idx" class="friend-drawer friend-drawer list-inner">
      <img v-if="message.senderName == null || message.recieverName == null" class="col-3 profile-image no-img" src="@/assets/common/norang.png">
      <img v-else-if="message.senderId === member.id" class="col-3 profile-image" :src="'/upload/member/' + message.recieverId + '.png'" @error="replaceImg">
      <img v-else class="col-3 profile-image" :src="'/upload/member/' + message.senderId + '.png'">
      <!-- 대화 상대 -->
      <div class="col-5 text">
        <h6 v-if="message.senderName == null || message.recieverName == null">
          <b class="no-user">탈퇴한 사용자</b>
        </h6>
        <h6 v-else-if="message.senderId === member.id">
          {{ message.recieverName }}
          <b class="counselor" v-if="message.recieverPrivilege === 1 && message.recieverName != null">상담사</b>
        </h6>
        <h6 v-else>
          {{ message.senderName }}
          <b class="counselor" v-if="message.senderPrivilege === 1 && message.senderName != null">상담사</b>
        </h6>
        <!-- 최근 메시지 -->
        <p class="text-muted">
          <a @click="showMessageHistory(message)">{{ message.content }}</a>
          <b v-if="message.read === 0 && message.senderId !== member.id" class="new">new!</b>
        </p>
      </div>
      <!-- 최근 시간 -->
      <div v-if="message.datetime.substring(0, 10) === currentDatetime.substring(0, 10)" class="col-4 time text-muted small">{{ message.datetime.substring(10, 19) }}</div>
      <div v-else class="col-4 time text-muted small">{{ message.datetime.substring(2, 10) }}</div>
    </div>
  </div>
</template>

<script>
import img from '@/assets/member/noImage.jpg'

export default {
  computed: {
    member () {
      return this.$store.getters.member
    },
    currentDatetime () {
      return this.$store.getters.currentDatetime
    },
    messageList () {
      return this.$store.getters.messageList
    },
    other () {
      return this.$store.getters.other
    }
	},
  methods: {
    replaceImg (e) {
      e.target.src = img
    },
    getHistory () {
			this.axios({
				url: '/api/message/history',
				method: 'GET',
				params: { otherId: this.other.id }
			}).then((res) => {
				this.$store.commit('messageHistory', res.data.messageHistory)
			})
		},
    showMessageHistory (message) {
      message.read = 1
      let other = null
      if (this.member.id === message.senderId) {
        other = {
          id: message.recieverId,
          name: message.recieverName,
          privilege: message.recieverPrivilege
        }
      } else {
        other = {
          id: message.senderId,
          name: message.senderName,
          privilege: message.senderPrivilege
        }
      }
      this.$store.commit('other', other)
      this.$store.commit('updateUnreads')
      this.$store.commit('currentDatetime')
      this.$store.commit('updateMessageList', message)
      this.getHistory()
    }
  },
  created () {
    this.$store.commit('currentDatetime')
  },
  unmounted () {
    this.$store.commit('other', null)
    this.$store.commit('messageHistory', [])
  }
}
</script>

<style scoped>
.profile-image {
  width: 50px;
  height: 50px;
  border-radius: 40px;
}

.no-img {
  filter: grayscale(100%);
}

.no-user {
  font-size: 11px;
  color: grey;
}

.counselor {
  font-size: 11px;
  color: green;
}

.new {
  font-size: 11px;
  color: red;
}
.friend-drawer {
  padding: 10px 15px;
  display: flex;
  vertical-align: baseline;
  background: #fff;
  transition: .3s ease;
}
.text {
  margin-left: 12px;
  width: 70%;
}

h6 {
  margin-top: 6px;
  margin-bottom: 0;
}

p {
  margin: 0;
}

.time {
  color: grey;
  float: right;
}

a:hover {
  cursor: pointer;
}

.list-outer {
  height: 700px;
  padding: 12px;
  background-color:#fffce8;
  border-radius: 5px;
}

.list-section{
  grid-column: 1;
  grid-row: 1;
  margin-left: 30%;
}

</style>
