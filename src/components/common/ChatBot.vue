<template>
	<button type="button" v-if="!showChatBot" @click="open">열기</button>
	<div v-if="showChatBot" class="black-bg">
		<div class="white-bg">
			<button type="button" @click="close">닫기</button>
			<div>{{challenge}}</div>
			<hr>
			<div v-if="challengeSend">
				<input type="file" @change="multipartFile = $event.target.files[0]">
				<input type="text" v-model="title">
				<button type="button" @click="postChallenge(multipartFile, title)">업로드</button>
			</div>
			<hr>
			<div style="width: 400px; height: 400px; overflow: auto;">
				<ChatMessage v-for="(message, i) in messageList" :key="i" :from="message.from" :content="message.content" />
			</div>
			<div v-if="dailyLogSend">
				<input type="number" v-model="sleep" min="0" max="24" required="required">
				<input type="radio" v-model="medicine" value="0">X
				<input type="radio" v-model="medicine" value="1">
				<img src="@/assets/mynorang/medicine.png" width="20">
				<button type="button" @click="postDailyLog(sleep, medicine)">전송</button>
			</div>
			<div v-if="moodStateSend">
				<input type="number" v-model="state" min="0" max="100" required="required">
				<button type="button" @click="postMoodState(state)">전송</button>
			</div>
			<div v-if="messageSend">
				<input type="text">
				<button type="button" disabled="true">전송</button>
			</div>
		</div>
	</div>
</template>

<style scope>
	body {
		margin : 0;
	}
	div {
		box-sizing: border-box;
	}
	.black-bg {
		width: 100%; height: 100%;
		background: rgba(0, 0, 0, 0.5);
		padding: 20px;
		position: fixed;
		z-index: 100;
	}
	.white-bg {
		width: 100%;
		background: white;
		padding: 20px;
		border-radius: 8px;
	}
</style>

<script>
import ChatMessage from '@/components/common/ChatMessage'
export default {
	components: {
		ChatMessage
	},
	data () {
		return {
			showChatBot: false,
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
			messageSend: false
		}
	},
	methods: {
		open () {
			this.showChatBot = true
			this.messageList = []
			this.getChallenge()
			this.getDailyLog()
		},
		close () {
			this.showChatBot = false
		},
		getChallenge () {
			this.axios({
				url: '/api/norang2/challenge',
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
				url: '/api/norang2/dailylog',
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
				url: '/api/norang2/moodstate',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data.flag) {
					this.startChat()
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
				url: '/api/norang2/challenge',
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
				}
			})
		},
		postDailyLog (sleep, medicine) {
			this.axios({
				url: '/api/norang2/dailylog',
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
				url: '/api/norang2/moodstate',
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
					this.startChat()
				}
			})
		},
		startChat () {
			const from = '노랑이'
			const content = '나랑노랑!'
			const message = { from: from, content: content }
			this.messageList.push(message)
			this.messageSend = true
		}
	}
}
</script>
