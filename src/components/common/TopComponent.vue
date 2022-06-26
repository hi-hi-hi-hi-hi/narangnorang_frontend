<template>
	<PostNotiModal v-if="modalVal" @modalClose="modalClose" :id="id"/>
	<div class="top" v-if="privilege === 3">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<a class="top-link" @click="modalOpen()" :id="id"><i class="fa fa-bell faa-ring" v-bind:class="{ animated: notiLength >= 1 }"></i> 알림 <span>{{ notiLength }}</span></a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope faa-ring" v-bind:class="{ animated: unreads >= 1 }"></i> 쪽지 <span> {{ unreads }}</span></router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 2">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<a class="top-link" @click="modalOpen()" :id="id"><i class="fa fa-bell faa-ring" v-bind:class="{ animated: notiLength >= 1 }"></i> 알림 <span>{{ notiLength }}</span></a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope faa-ring" v-bind:class="{ animated: unreads >= 1 }"></i> 쪽지 <span> {{ unreads }}</span></router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 1">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<a class="top-link" @click="modalOpen()" :id="id"><i class="fa fa-bell faa-ring" v-bind:class="{ animated: notiLength >= 1 }"></i> 알림 <span>{{ notiLength }}</span></a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope faa-ring" v-bind:class="{ animated: unreads >= 1 }"></i> 쪽지 <span> {{ unreads }}</span></router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
</template>

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

<script>
import PostNotiModal from '@/components/post/PostNotiModal.vue'
export default {
	data () {
		return {
      		unreads: 0,
      		timer1: null,
			timer2: null,
			modalVal: false,
			notiLength: 0
		}
	},
	components: {
		PostNotiModal
	},
	props: {
		privilege: Number,
		id: Number
	},
	methods: {
		// 쪽지 알람
		getUnreads () {
			this.axios({
				url: '/api/message/unread',
				method: 'GET'
			})
			.then((res) => {
				this.unreads = res.data.unreadCounts
			})
			.catch((err) => {
				console.log(err)
				clearInterval(this.timer1)
			})
		},
		fnGetNotiLength () {
			this.axios.get('/api/noti', {
				params: {
					memberId: this.id
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
		}
	},
	created () {
		this.getUnreads()
		this.fnGetNotiLength()
		this.timer1 = setInterval(this.getUnreads, 3000)
		this.timer2 = setInterval(this.fnGetNotiLength, 3000)
	},
	unmounted () {
		clearInterval(this.timer1)
		clearInterval(this.timer2)
	}
}
</script>
