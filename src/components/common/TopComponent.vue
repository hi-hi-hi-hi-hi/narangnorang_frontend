<template>
	<PostNotiModal v-if="modalVal" @modalClose="modalClose" :id="member.id"/>
	<div class="top" v-if="member.privilege === 3">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<a class="top-link" @click="modalOpen()" :id="member.id"><i class="fa fa-bell faa-ring" v-bind:class="{ animated: notiLength >= 1 }"></i> 알림 <span>{{ notiLength }}</span></a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope faa-ring" v-bind:class="{ animated: unreads.length >= 1 }"></i> 쪽지 <span> {{ unreads.length }}</span></router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="member.privilege === 2">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<a class="top-link" @click="modalOpen()" :id="member.id"><i class="fa fa-bell faa-ring" v-bind:class="{ animated: notiLength >= 1 }"></i> 알림 <span>{{ notiLength }}</span></a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope faa-ring" v-bind:class="{ animated: unreads.length >= 1 }"></i> 쪽지 <span> {{ unreads.length }}</span></router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="member.privilege === 1">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<a class="top-link" @click="modalOpen()" :id="member.id"><i class="fa fa-bell faa-ring" v-bind:class="{ animated: notiLength >= 1 }"></i> 알림 <span>{{ notiLength }}</span></a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope faa-ring" v-bind:class="{ animated: unreads.length >= 1 }"></i> 쪽지 <span> {{ unreads.length }}</span></router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
</template>

<script>
import Stomp from 'webstomp-client'
import SockJS from 'sockjs-client'
import PostNotiModal from '@/components/post/PostNotiModal.vue'
export default {
	data () {
		return {
			timer2: null,
			modalVal: false,
			notiLength: 0
		}
	},
	components: {
		PostNotiModal
	},
	computed: {
		member () {
            return this.$store.getters.member
        },
		unreads () {
            return this.$store.getters.unreads
        },
		other () {
			return this.$store.getters.other
		}
	},
	methods: {
		fnGetNotiLength () {
			this.axios.get('/api/noti', {
				params: {
					memberId: this.member.id
				}
			})
			.then((res) => {
				this.notiLength = res.data.length
			})
			.catch((err) => {
				console.log(err)
				clearInterval(this.timer2)
			})
		},
		modalOpen (memberName) {
			this.modalVal = true
			this.modalMemberName = memberName
		},
		modalClose () {
			this.modalVal = false
		},
		getUnreads () {
			this.axios({
				url: '/api/message/unreads',
				method: 'GET'
			})
			.then((res) => {
				this.$store.commit('unreads', res.data.unreads)
			})
		},
		getList () {
			this.axios.get('/api/message/list', {})
			.then((res) => {
				this.$store.commit('messageList', res.data.messageList)
			})
		},
		readMessages () {
			this.axios.get('/api/message/read?otherId=' + this.other.id, {})
		},
		connect () {
			const socket = new SockJS('/ws')
			this.stompClient = Stomp.over(socket)
			this.stompClient.connect(
				{},
				frame => {
					this.$store.commit('stompClient', this.stompClient)
					this.getUnreads()
					this.getList()
					this.stompClient.subscribe('/ws/member/' + this.member.id, response => {
						const message = JSON.parse(response.body)
						if (message.type === 'message') {
							if (this.other != null && this.other.id === message.senderId) {
								this.readMessages()
								message.read = 1
								this.$store.commit('pushMessageIntoMessageHistory', message)
							} else {
								this.$store.commit('pushSenderIdIntoUnreads', message.senderId)
							}
							this.$store.commit('currentDatetime')
                			this.$store.commit('updateMessageList', message)
						}
					})
				}
			)
		}
	},
	created () {
		this.fnGetNotiLength()
		this.timer2 = setInterval(this.fnGetNotiLength, 3000)
		this.connect()
	},
	unmounted () {
		this.$store.commit('member', null)
		this.$store.commit('upToDate', true)
		this.$store.commit('stompClient', null)
		this.$store.commit('unreads', [])
		this.$store.commit('messageList', [])
		this.$store.commit('other', null)
		this.$store.commit('messageHistory', [])
		clearInterval(this.timer2)
	}
}
</script>

<style scoped>
	span {
		color: red;
		font-size: 20px;
	}
	.top-link {
		text-decoration: none;
		color: gray;
		margin: 10px;
		cursor: pointer;
	}
	.top {
		position: absolute;
		right: 200px;
		top: 30px;
	}
	.ringing-bell{
    position:absolute;
    left:50%;
    top:50%;
    transition:translate(-50%,-50%);
	}

	@-webkit-keyframes ring {
	0% {
		-webkit-transform: rotate(-15deg);
		transform: rotate(-15deg);
	}

	2% {
		-webkit-transform: rotate(15deg);
		transform: rotate(15deg);
	}

	4% {
		-webkit-transform: rotate(-18deg);
		transform: rotate(-18deg);
	}

	6% {
		-webkit-transform: rotate(18deg);
		transform: rotate(18deg);
	}

	8% {
		-webkit-transform: rotate(-22deg);
		transform: rotate(-22deg);
	}

	10% {
		-webkit-transform: rotate(22deg);
		transform: rotate(22deg);
	}

	12% {
		-webkit-transform: rotate(-18deg);
		transform: rotate(-18deg);
	}

	14% {
		-webkit-transform: rotate(18deg);
		transform: rotate(18deg);
	}

	16% {
		-webkit-transform: rotate(-12deg);
		transform: rotate(-12deg);
	}

	18% {
		-webkit-transform: rotate(12deg);
		transform: rotate(12deg);
	}

	20% {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	}

	@keyframes ring {
	0% {
		-webkit-transform: rotate(-15deg);
		-ms-transform: rotate(-15deg);
		transform: rotate(-15deg);
	}

	2% {
		-webkit-transform: rotate(15deg);
		-ms-transform: rotate(15deg);
		transform: rotate(15deg);
	}

	4% {
		-webkit-transform: rotate(-18deg);
		-ms-transform: rotate(-18deg);
		transform: rotate(-18deg);
	}

	6% {
		-webkit-transform: rotate(18deg);
		-ms-transform: rotate(18deg);
		transform: rotate(18deg);
	}

	8% {
		-webkit-transform: rotate(-22deg);
		-ms-transform: rotate(-22deg);
		transform: rotate(-22deg);
	}

	10% {
		-webkit-transform: rotate(22deg);
		-ms-transform: rotate(22deg);
		transform: rotate(22deg);
	}

	12% {
		-webkit-transform: rotate(-18deg);
		-ms-transform: rotate(-18deg);
		transform: rotate(-18deg);
	}

	14% {
		-webkit-transform: rotate(18deg);
		-ms-transform: rotate(18deg);
		transform: rotate(18deg);
	}

	16% {
		-webkit-transform: rotate(-12deg);
		-ms-transform: rotate(-12deg);
		transform: rotate(-12deg);
	}

	18% {
		-webkit-transform: rotate(12deg);
		-ms-transform: rotate(12deg);
		transform: rotate(12deg);
	}

	20% {
		-webkit-transform: rotate(0deg);
		-ms-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	}

	.faa-ring.animated,
	.faa-ring.animated-hover:hover,
	.faa-parent.animated-hover:hover > .faa-ring {
	-webkit-animation: ring 2s ease infinite;
	animation: ring 2s ease infinite;
	color: red;
	}
</style>
