<template>
    <!-- 모달창 -->
    <div class="black-bg" v-if="modal">
        <div class="white-bg form-group">
	    <h3><b>상담신청</b></h3>
		받는사람: <b> {{ recieverName }} </b> 상담사
		<textarea class="form-control" ref="content" v-model="content" rows="20" cols="50" placeholder="이 곳에 고민을 작성해주세요."></textarea>
        <br>
        <button type="submit" class="btn btn-outline-dark" @click="requestCounsel">보내기</button>
        <button type="button" class="btn btn-outline-dark" @click="modal = false">닫기</button>
        </div>
    </div>
    <!-- 상담사 리스트 -->
    <div class="listSection">
        <CounselorCard v-for="(counselor, idx) in list" :key="idx" :counselor="counselor"></CounselorCard>
    </div>
</template>

<script>
import CounselorCard from '@/components/counsel/CounselorCard'

export default {
    components: {
        CounselorCard
    },
    data () {
        return {
            list: {},
            modal: false,
            recieverId: 0,
            recieverName: '',
            content: ''
        }
    },
    computed: {
        member () {
            return this.$store.getters.member
        },
		stompClient () {
			return this.$store.getters.stompClient
		},
        currentDatetime () {
            return this.$store.getters.currentDatetime
        }
    },
    methods: {
        getList () {
            this.axios.get('/api/counsel/list', {})
            .then((res) => {
                this.list = res.data.counselorList
            })
        },
        viewModal (id, name) {
            this.recieverId = id
            this.recieverName = name
            this.modal = true
        },
        clearAll () {
            this.recieverId = 0
            this.recieverName = ''
            this.content = ''
        },
        requestCounsel () {
            this.$store.commit('currentDatetime')
            if (this.stompClient && this.stompClient.connected) {
                const message = {
                    type: 'message',
                    senderId: this.member.id,
                    senderName: this.member.name,
                    senderPrivilege: this.member.privilege,
                    recieverId: this.recieverId,
                    recieverName: this.recieverName,
                    recieverPrivilege: 1,
                    content: this.content,
                    datetime: this.currentDatetime,
                    read: 0
                }
                this.stompClient.send('/ws/message', JSON.stringify(message), {})
                message.read = 1
                this.$store.commit('updateMessageList', message)
				this.$store.commit('pushMessageIntoMessageHistory', message)
                this.content = ''
            }
        }
    },
    created () {
        this.getList()
    }
}
</script>

<style scoped>
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.246);
  padding: 20px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 3;
}

.white-bg {
  background: white;
  border-radius: 8px;
  padding: 20px;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 500px;
  height: 650px;
}
.listSection{
    grid-column: 2;
    grid-row: 1;
    margin: auto;
    width: 80%;
	height: 700px;
	overflow-x: hidden;
	overflow-y: auto;
	scrollbar-width: thin;
}
.btn {
padding: .2rem;
border: 1px solid rgb(137, 137, 137);
font-weight: bold;
margin-right: 5px;
float: right;
}

.listSection::-webkit-scrollbar {
    display: none;
}

</style>
