<template>
  <!-- 대화 List -->
  <div class="list-outer list-section">
    <div v-for="(message, idx) in list" :key="idx" class="friend-drawer friend-drawer list-inner">
      <img v-if="message.senderName === null || message.recieverName === null" class="col-3 profile-image no-img"
        src="@/assets/common/norang.png">
     <img v-else-if="message.senderId === userId" class="col-3 profile-image"
        :src="'/webapp/resources/images/member/' + message.recieverId + '.png'" @error="replaceImg">
      <img v-else class="col-3 profile-image" :src="'/webapp/resources/images/member/' + message.senderId + '.png'">
      <!-- 대화 상대 -->
      <div class="col-5 text">
        <h6 v-if="message.senderName === null || message.recieverName === null">
          <b class="no-user">탈퇴한 사용자</b>
        </h6>
        <h6 v-else-if="message.senderId === userId">
        {{ message.recieverName }}
          <b class="counselor" v-if="message.recieverPrivilege == 1 && message.recieverName !== null">
            상담사
          </b>
        </h6>
        <h6 v-else>
          {{ message.senderName }}
          <b class="counselor" v-if="message.senderPrivilege == 1 && message.senderName !== null">
            상담사
          </b>
        </h6>
        <!-- 최근 메시지 -->
        <p class="text-muted">
          <a @click="showMessageHistory(message.senderId, message.recieverId)">{{ message.content }}</a>
          <b v-if="message.read === 0 && message.senderId !== userId" class="new">
            new!
          </b>
        </p>
      </div>
      <!-- 최근 시간 -->
      <div v-if="message.datetime.substring(0, 10) === todayDate" class="col-4 time text-muted small">
        {{ message.datetime.substring(10, 19) }}
      </div>
      <div v-else class="col-4 time text-muted small">
        {{ message.datetime.substring(2, 10) }}
      </div>
    </div>
  </div>
</template>

<script>
import img from '@/assets/member/noImage.jpg'

export default {
  name: 'MessageList',
  data () {
    return {
      list: [],
      userId: null,
      todayDate: '',
      image: null,
      timer: null
    }
  },
  created () {
    this.getList()
    this.timer = setInterval(this.getList, 3000)
  },
  methods: {
    replaceImg (e) {
      e.target.src = img
    },
    getList () {
      this.axios.get('/api/message/list', {

      })
      .then((res) => {
        this.list = res.data.messageList
        this.userId = res.data.userId
        this.todayDate = res.data.todayDate
      })
      .catch((err) => {
        console.log(err)
        clearInterval(this.timer)
      })
    },
    showMessageHistory (senderId, recieverId) {
      this.emitter.emit('showHistory', true)
      let otherId = null
      if (senderId === this.userId) {
        otherId = recieverId
      } else {
        otherId = senderId
      }
      this.emitter.emit('otherId', otherId)
    }
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
