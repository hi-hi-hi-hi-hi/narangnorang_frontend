<template>
	<button type="button" v-if="!modal" @click="open" style="position: fixed; right: 5%; bottom: 5%; border-radius: 40%; z-index: 3;">
		<img src="@/assets/common/norang.png" width="70">
	</button>
	<div v-if="modal" class="black-bg" @click="close">
		<div class="white-bg container">
			<!-- 대화 상대 -->
			<div class="action-header clearfix">
				<div class="row">
					<div class="pull-left hidden-xs col-6">
						<img src="@/assets/counsel/norang.png" alt="" class="img-avatar m-r-10">
						<h5><b>{{ challenge }}</b></h5>
					</div>
					<div v-show="!challengeSend" class="col-6">
						<input type="file" @change="multipartFile = $event.target.files[0]">
						<input type="text" v-model="title">
						<button type="button" @click="postChallenge(multipartFile, title)" class="btn btn-outline-dark">업로드</button>
					</div>
				</div>
            </div>
			<!-- 대화내역 부분 -->
			<div class="history">
				<div v-for="(message, i) in messageList" :key="i">
					<!-- 상대가 보냄 -->
					<div v-if="message.from === '노랑이'" class="message-feed media">
						<div class="pull-left">
							<img src="@/assets/common/norang.png" alt="" class="img-avatar">
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
			<div v-if="dailyLogSend">
				<input type="number" v-model="sleep" min="0" max="24" required="required"><br>
				<input type="radio" v-model="medicine" value="0">X
				<input type="radio" v-model="medicine" value="1">
				<img src="@/assets/mynorang/medicine.png" width="20"><br>
				<button type="button" @click="postDailyLog(sleep, medicine)" class="btn btn-outline-dark">전송</button>
			</div>
			<div v-if="moodStateSend">
				<input type="number" v-model="state" min="0" max="100" required="required">
				<button type="button" @click="postMoodState(state)" class="btn btn-outline-dark">전송</button>
			</div>
			<div v-if="messageSend" class="msb-reply">
                <textarea v-model="content" @keyup.enter="sendMessage" placeholder="내용을 입력하세요"></textarea>
                <button type="button" @click="sendMessage"><b class="send-button">전송</b></button>
            </div>
		</div>
	</div>
</template>

<style scoped>
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
        width: 33%; height: 85%;
        padding: 5px;
        border-radius: 10px;
        background: white;
    }

</style>

<script>
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
	methods: {
		open () {
			this.modal = true
			this.messageList = []
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
				url: '/api/norang/challenge',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					this.challenge = '오늘의 챌린지 완료!'
					this.challengeSend = false
				} else {
					this.challenge = '오늘의 챌린지 ' + response.data.challenge + '찍기!'
					this.challengeSend = true
				}
			})
		},
		getDailyLog () {
			this.axios({
				url: '/api/norang/dailylog',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					this.getMoodState()
				} else {
					const from = '노랑이'
					const content = '수면시간이랑 약먹었는지 알려줘!'
					const message = { from: from, content: content }
					this.messageList.push(message)
					this.dailyLogSend = true
				}
			})
		},
		getMoodState () {
			this.axios({
				url: '/api/norang/moodstate',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					this.sendMessage()
				} else {
					const from = '노랑이'
					const content = '기분은 어때?'
					const message = { from: from, content: content }
					this.messageList.push(message)
					this.moodStateSend = true
				}
			})
		},
		postChallenge (multipartFile, title) {
			const formData = new FormData()
			formData.append('multipartFile', multipartFile)
			formData.append('title', title)
			this.axios({
				url: '/api/norang/challenge',
				method: 'post',
				data: formData,
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					const from = '나'
					const content = title + '.png'
					const message = { from: from, content: content }
					this.messageList.push(message)
					this.challengeSend = false
					this.getChallenge()
					this.$emit('challengeComplete')
				}
			})
		},
		postDailyLog (sleep, medicine) {
			this.axios({
				url: '/api/norang/dailylog',
				method: 'post',
				data: {
					sleep: sleep,
					medicine: medicine
				},
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					const from = '나'
					let content = sleep + '시간잤어'
					let message = { from: from, content: content }
					this.messageList.push(message)
					if (medicine === 0) {
						content = '약은 아직 안 먹었어'
						message = { from: from, content: content }
						this.messageList.push(message)
					} else if (medicine === 1) {
						content = '약도 먹었어'
						message = { from: from, content: content }
						this.messageList.push(message)
					}
					this.dailyLogSend = false
					this.getMoodState()
				}
			})
		},
		postMoodState (state) {
			this.axios({
				url: '/api/norang/moodstate',
				method: 'post',
				data: {
					state: state
				},
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					const from = '나'
					const content = state + '점'
					const message = { from: from, content: content }
					this.messageList.push(message)
					this.moodStateSend = false
					this.sendMessage()
				}
			})
		},
		sendMessage () {
			const from = '노랑이'
			const content = '나랑노랑!'
			const message = { from: from, content: content }
			this.messageList.push(message)
			this.messageSend = true
			for (let j = 0; j < 3; j++) {
				const from = '나'
				const content = '싫어!'
				const message = { from: from, content: content }
				this.messageList.push(message)
				this.messageSend = true
			}
		}
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
