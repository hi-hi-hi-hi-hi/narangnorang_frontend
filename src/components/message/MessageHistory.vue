<template>
    <div v-if="showHistory === true" class="history-section list-outer">
        <div class="ms-body">
            <!-- 대화상대 -->
            <div class="action-header clearfix">
                <div class="pull-left hidden-xs">
                    <div class="lv-avatar pull-left">
                    </div>
                    <h3 v-if="messageInfo.recieverName === null"><b class="no-user">탈퇴한 사용자</b></h3>
                    <h3 v-else><b>{{ messageInfo.recieverName }}</b></h3>
                    <b class="counselor" v-if="messageInfo.recieverPrivilege == 1 && messageInfo.recieverName !== null">
            상담사
          </b>
                </div>
            </div>
            <!-- 대화내역 부분 -->
            <div class="history">
                <div v-for="(message, idx) in list" :key="idx" ref="history">
                    <!-- 상대가 보냄 -->
                    <div v-if="message.senderId === otherId" class="message-feed media">
                        <div class="pull-left">
                            <img v-if="messageInfo.recieverName === null" class="img-avatar no-img" src="@/assets/common/norang.png">
                            <img v-else :src="'/webapp/resources/images/member/' + messageInfo.recieverId + '.png'" class="img-avatar" @error="replaceImg">
                        </div>
                        <div class="media-body">
                            <div class="mf-content">
                                {{ message.content }}
                            </div>
                            <small class="mf-date">{{ message.datetime }}</small>
                        </div>
                    </div>

                    <!-- 내가 보냄 -->
                    <div v-else class="message-feed right">
                        <div class="media-body">
                            <div class="mf-content">
                                {{ message.content }}
                            </div>
                            <small class="mf-date">{{ message.datetime }}</small>
                        </div>
                    </div>
                </div>
            </div>

            <div class="msb-reply" v-if="list[0] != null && (list[0].senderName == null || list[0].recieverName == null)">
                <textarea @keyup.enter="sendMessage" placeholder="내용을 입력하세요" readonly></textarea>
                <button @click="sendMessage" disabled><b class="send-button">전송</b></button>
            </div>
            <div class="msb-reply" v-else>
                <textarea v-model="messageInfo.content" @keyup.enter="sendMessage" placeholder="내용을 입력하세요"></textarea>
                <button @click="sendMessage"><b class="send-button">전송</b></button>
            </div>
        </div>
    </div>
</template>

<script>
import img from '@/assets/member/noImage.jpg'

export default {
    name: 'MessageHistory',
	data () {
		return {
			showHistory: null,
			otherId: null,
			list: [],
            messageInfo: {
                recieverId: null,
                recieverName: '',
                recieverPrivilege: null,
                content: ''
            },
            image: null,
            timer: null
		}
	},
	created () {
		this.getInfoFromSibling()
        this.timer = setInterval(this.getHistory, 3000)
	},
    updated () {
		this.$nextTick(function () {
			const history = document.querySelector('.history')
			history.scrollTop = history.scrollHeight
		})
    },
	methods: {
        replaceImg (e) {
            e.target.src = img
        },
		getHistory () {
            if (this.otherId == null) {
                return
            }
			this.axios({
				url: '/api/message/history',
				method: 'GET',
				params: {
					otherId: this.otherId
				}
			})
			.then((res) => {
				this.list = res.data.messageHistory
                this.getRecieverInfo()
			})
			.catch((err) => {
				console.log(err)
			})
		},
		getInfoFromSibling () {
			this.emitter.on('showHistory', showHistory => {
			this.showHistory = showHistory
			}
			)
			this.emitter.on('otherId', otherId => {
				this.otherId = otherId
				this.getHistory()
			}
			)
		},
        getRecieverInfo () {
            if (this.list[0].recieverId === this.otherId) {
                this.messageInfo.recieverId = this.list[0].recieverId
                this.messageInfo.recieverName = this.list[0].recieverName
                this.messageInfo.recieverPrivilege = this.list[0].recieverPrivilege
            } else {
                this.messageInfo.recieverId = this.list[0].senderId
                this.messageInfo.recieverName = this.list[0].senderName
                this.messageInfo.recieverPrivilege = this.list[0].senderPrivilege
            }
        },
        sendMessage () {
            const checkContent = this.messageInfo.content.replace(/ /g, '')
            if (checkContent.length === 0) {
                alert('내용을 입력해주세요.')
                this.messageInfo.content = ''
            }
            this.axios({
                url: '/api/message/send',
                method: 'POST',
                params: this.messageInfo
            })
            .then((res) => {
                this.messageInfo.content = ''
                this.getHistory()
            })
            .catch((error) => {
                console.log(error)
            })
        }
	}
}
</script>

<style scoped>

body {
    font-size: 13px;
    line-height: 1.42857143;
    color: #767676;
    background-color: #edecec;
}

.no-img {
    filter: grayscale(100%);
}

.no-user {
    font-size: 11px;
    color: grey;
}

.counselor {
    font-size: 15px;
    color: green;
}

.message-feed {
    padding: 20px;
}
.message-feed.right>.pull-right {
    margin-left: 15px;
}
.message-feed:not(.right) .mf-content {
    background: #03a9f4;
    color: #fff;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.message-feed.right .mf-content {
    background: #eee;
}
.mf-content {
    padding: 12px 17px 13px;
    border-radius: 2px;
    display: inline-block;
    max-width: 80%
}
.mf-date {
    display: block;
    color: #B3B3B3;
    margin-top: 7px;
}
.mf-date>i {
    font-size: 14px;
    line-height: 100%;
    position: relative;
    top: 1px;
}
.msb-reply {
    box-shadow: 0 -20px 20px -5px #fff;
    position: relative;
    margin-top: 30px;
    border-top: 1px solid #eee;
    background: #f8f8f8;
}

.msb-reply textarea {
    width: 90%;
    font-size: 13px;
    border: 0;
    padding: 10px 15px;
    resize: none;
    height: 60px;
    background: 0 0;
}
.msb-reply button {
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
    height: 100%;
    width: 60px;
    font-size: 25px;
    color: #2196f3;
    background: 0 0;
}
.msb-reply button:hover {
    background: #f2f2f2;
}
.img-avatar {
    height: 37px;
    border-radius: 2px;
    width: 37px;
}

.action-header {
    position: relative;
    background: #f8f8f8;
    padding: 15px 13px 15px 17px;
}

.ms-body{
    background:#fff;
}

.message-feed.right {
    text-align: right;
}

.history {
	height: 480px;
	overflow:auto;
}

.send-button {
    color: black;
    font-size: 10px;
}

.list-outer {
  height: 700px;
  padding: 12px;
  background-color:#fffce8;
  border-radius: 5px;
}
.history-section{
    grid-column: 2;
    grid-row: 1;
    margin-right:30%;
}

</style>
