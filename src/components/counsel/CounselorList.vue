<template>
    <!-- 모달창 -->
    <div class="black-bg" v-if="modal == true">
        <div class="white-bg form-group">
	    <h3><b>상담신청</b></h3>
		받는사람: <b> {{ messageInfo.recieverName }} </b> 상담사
		<textarea class="form-control" ref="content" v-model="messageInfo.content" rows="20" cols="50" placeholder="이 곳에 고민을 작성해주세요."></textarea>
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
    name: 'CounselorList',
    data () {
        return {
            list: {},
            modal: false,
            messageInfo: {
                recieverId: null,
                recieverName: '',
                recieverPrivilege: null,
                content: ''
            }
        }
    },
    components: {
        CounselorCard
    },
    mounted () {
        this.getList()
    },
    methods: {
        getList () {
            this.axios.get('/api/counsel/list', {

            })
            .then((res) => {
                this.list = res.data.counselorList
            })
            .catch((err) => {
                console.log(err)
            })
        },
        viewModal (id, name, privilege) {
            this.messageInfo.recieverId = id
            this.messageInfo.recieverName = name
            this.messageInfo.recieverPrivilege = privilege
            this.modal = true
        },
        clearAll () {
            this.messageInfo.recieverId = null
            this.messageInfo.recieverName = ''
            this.messageInfo.recieverPrivilege = null
            this.messageInfo.content = ''
        },
        requestCounsel () {
            const checkContent = this.messageInfo.content.replace(/ /g, '')
            console.log(this.messageInfo.content)
            if (checkContent.length === 0) {
                alert('내용을 입력해주세요.')
                this.messageInfo.content = ''
                this.$refs.content.focus()
            }
            this.axios({
                url: '/api/message/send',
                method: 'POST',
                params: this.messageInfo
            })
            .then((res) => {
                this.clearAll()
                this.modal = false
                alert('상담신청 완료')
            })
            .catch((error) => {
                console.log(error)
            })
        }
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
