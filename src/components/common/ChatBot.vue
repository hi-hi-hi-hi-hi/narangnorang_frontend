<template>
	<div v-if="member.privilege === 3">
		<button v-if="!modal" @click="open" class="btn-norang">
			<img src="@/assets/common/norang.png" width="70">
		</button>
		<div v-if="modal" class="black-bg" @click="close">
			<div class="white-bg container">
				<!-- 대화 상대 -->
				<div class="action-header clearfix">
					<div class="row">
						<div class="pull-left hidden-xs col-6">
							<img src="@/assets/common/norang.png" class="img-avatar m-r-10">
							<h5><b>오늘의 챌린지</b></h5>
							<h5><b>{{ challenge }}</b></h5>
						</div>
						<div v-show="challengeSend" class="col-6">
							<input type="file" @change="multipartFile = $event.target.files[0]" id="input-file">
							<label for="input-file" v-if="multipartFile == null">파일선택</label>
							<label for="input-file" v-else>{{multipartFile.name}}</label><br>
							<input type="text" v-model="title" placeholder="제목을 입력하세요" size="14">
							<button type="button" @click="postChallenge" class="btn btn-outline-dark">업로드</button>
						</div>
					</div>
				</div>
				<!-- 대화내역 부분 -->
				<div class="history">
					<div v-for="(message, i) in messageList" :key="i">
						<!-- 상대가 보냄 -->
						<div v-if="message.from === '노랑이'" class="message-feed media">
							<div class="pull-left">
								<img src="@/assets/common/norang.png" class="img-avatar">
							</div>
							<div class="media-body">
								<div class="mf-content">
									{{ message.content }}
								</div>
							</div>
						</div>
						<!-- 내가 보냄 -->
						<div v-else class="message-feed right">
							<div class="media-body">
								<div class="mf-content">
									{{ message.content }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div v-if="dailyLogSend" class="msb-reply text-center">
					<input type="number" v-model="sleep" min="0" max="24" required="required">시간<br>
					<input type="radio" v-model="medicine" :value="0">X
					<input type="radio" v-model="medicine" :value="1">
					<img src="@/assets/mynorang/medicine.png" width="20">
					<button type="button" @click="postDailyLog"><b class="send-button">전송</b></button>
				</div>
				<div v-if="moodStateSend" class="msb-reply text-center">
					<div>0 ~ 100</div>
					<input type="range" v-model="state" min="0" max="100" required="required">점<br>
					<button type="button" @click="postMoodState"><b class="send-button">전송</b></button>
				</div>
				<div v-if="messageSend" class="msb-reply">
					<textarea v-model="content" @keyup.enter="sendMessage" placeholder="내용을 입력하세요"></textarea>
					<button type="button" @click="sendMessage"><b class="send-button">전송</b></button>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.btn-norang {
		position: fixed;
		right: 5%;
		bottom: 5%;
		border-radius: 100%;
		border: none;
		z-index: 3;
	}

	.btn-norang:hover {
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
	}

    .black-bg {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.05);
        z-index: 3;
    }

    .white-bg {
        position: fixed;
        right: 10%; bottom: 10%;
        width: 20%; height: 65%;
        padding: 20px;
        border-radius: 10px;
        background: white;
    }

	input[type="file"] {
		display: none;
	}
</style>

<script>
import chatBotAPI from '@/components/common/chatBotAPI'
export default {
	data () {
		return {
			modal: false,
			challenge: '',
			challengeSend: false,
			messageList: [],
			multipartFile: null,
			title: '',
			dailyLogSend: false,
			sleep: 0,
            medicine: null,
			moodStateSend: false,
			state: 0,
			messageSend: false,
			content: ''
		}
	},
	computed: {
		member () {
            return this.$store.getters.member
        }
	},
	methods: {
		open () {
			this.modal = true
			this.challenge = ''
			this.challengeSend = false
			this.messageList = []
			this.multipartFile = null
			this.title = ''
			this.dailyLogSend = false
			this.sleep = 0
            this.medicine = null
			this.moodStateSend = false
			this.state = 0
			this.messageSend = false
			this.content = ''
			this.getChallenge()
			this.getDailyLog()
		},
		close (event) {
			if (event.target.className === 'black-bg') {
				this.modal = false
			}
		},
		getChallenge () {
			this.axios({
				url: '/api/chatbot/challenge',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					this.challenge = '완료!'
					this.challengeSend = false
				} else {
					this.challenge = response.data.challenge + ' 사진 찍기!'
					this.challengeSend = true
				}
			})
		},
		getDailyLog () {
			this.axios({
				url: '/api/chatbot/dailylog',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					this.getMoodState()
				} else {
					const from = '노랑이'
					const content = '수면 시간이랑, 약 먹었는지 알려줄 수 있어?'
					const message = { from, content }
					this.messageList.push(message)
					this.dailyLogSend = true
				}
			})
		},
		getMoodState () {
			this.axios({
				url: '/api/chatbot/moodstate',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				const from = '노랑이'
				let content = ''
				if (response.data.flag) {
					content = '나랑노랑!'
					this.messageSend = true
				} else {
					content = '기분은 좀 어때?'
					this.moodStateSend = true
				}
				const message = { from, content }
				this.messageList.push(message)
			})
		},
		postChallenge () {
			if (this.multipartFile == null) {
				alert('파일을 선택해주세요')
                return
            } else if (this.title === '') {
				alert('제목을 입력해주세요')
				return
			}
			const formData = new FormData()
			formData.append('multipartFile', this.multipartFile)
			formData.append('title', this.title)
			this.axios({
				url: '/api/chatbot/challenge',
				method: 'post',
				data: formData,
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					const from = '나'
					const content = this.title + '.png'
					const message = { from, content }
					this.messageList.push(message)
					this.challengeSend = false
					this.getChallenge()
					this.$store.commit('upToDate', false)
				}
			})
		},
		postDailyLog () {
			if (this.sleep < 0 || this.sleep > 24 || !Number.isInteger(this.sleep)) {
                alert('0 이상 24 이하의 자연수로 입력해주세요')
                return
            }
			this.axios({
				url: '/api/chatbot/dailylog',
				method: 'post',
				data: {
					sleep: this.sleep,
					medicine: this.medicine
				},
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					const from = '나'
					let content = this.sleep + '시간잤어'
					let message = { from, content }
					this.messageList.push(message)
					if (this.medicine != null) {
						if (this.medicine === 0) {
							content = '약은 아직 안 먹었어'
						} else if (this.medicine === 1) {
							content = '약도 먹었어'
						}
						message = { from, content }
						this.messageList.push(message)
					}
					this.dailyLogSend = false
					this.getMoodState()
					this.$store.commit('upToDate', false)
				}
			})
		},
		postMoodState () {
			this.axios({
				url: '/api/chatbot/moodstate',
				method: 'post',
				data: {
					state: this.state
				},
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					let from = '나'
					let content = this.state + '점'
					let message = { from, content }
					this.messageList.push(message)
					this.moodStateSend = false
					from = '노랑이'
					content = '지금 기분이 ' + this.state + '점이네?'
					message = { from, content }
					this.messageList.push(message)
					content = '무슨 '
					if (this.state < 50) {
						content += '안 '
					}
					content += '좋은 일 있어?'
					message = { from, content }
					this.messageList.push(message)
					this.messageSend = true
					this.$store.commit('upToDate', false)
				}
			})
		},
		sendMessage () {
			let from = '나'
			let content = this.content
			let message = { from, content }
			this.messageList.push(message)
			this.content = ''
			from = '노랑이'
			content = chatBotAPI(content)
			message = { from, content }
			this.messageList.push(message)
		}
	},
	updated () {
		this.$nextTick(function () {
			const history = document.querySelector('.history')
			history.scrollTop = history.scrollHeight
		})
	}
}
</script>

<style scoped>
body {
    font-family: Roboto,sans-serif;
    font-size: 13px;
    line-height: 1.42857143;
    color: #767676;
    background-color: #edecec;
}

#messages-main {
    position: relative;
    margin: 0 auto;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

#messages-main:after, #messages-main:before {
    content: " ";
    display: table;
}

@media (min-width:768px) {
    #messages-main .ms-body {
		padding-left: 240px;
	}
}

@media (max-width:767px) {
    #messages-main .ms-menu {
		height: calc(100% - 58px);
		display: none;
		z-index: 1;
		top: 58px;
	}
	#messages-main .ms-body {
		overflow: hidden;
	}
}

#messages-main #ms-compose {
    position: fixed;
    bottom: 120px;
    z-index: 1;
    right: 30px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .14), 0 4px 8px rgba(0, 0, 0, .28);
}

#ms-menu-trigger {
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
    padding-right: 10px;
    padding-top: 19px;
}

#ms-menu-trigger i {
    font-size: 21px;
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
    max-width: 80%;
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
	height: 10%;
    box-shadow: 0 -20px 20px -5px #fff;
    position: relative;
    margin-top: 30px;
    border-top: 1px solid #eee;
    background: #f8f8f8;
}

.msb-reply textarea {
    width: 80%;
	height: 100%;
    font-size: 13px;
    border: 0;
    padding: 10px 15px;
    resize: none;
    background: 0 0;
}

.msb-reply button {
    width: 20%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    border: 0;
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
    background: #fff;
}

#ms-menu-trigger {
    user-select: none;
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 100%;
    padding-right: 10px;
    padding-top: 19px;
    cursor: pointer;
}

#ms-menu-trigger, .message-feed.right {
    text-align: right;
}

.history {
	height: 60%;
	overflow: auto;
}

.send-button {
    color: black;
    font-size: 10px;
}

.history-section{
    grid-column: 2;
    grid-row: 1;
    margin-right: 30%;
    margin-top: 10%;
}
</style>
