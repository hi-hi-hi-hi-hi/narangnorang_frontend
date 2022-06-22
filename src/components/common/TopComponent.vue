<template>
	<div class="top" v-if="privilege === 3" style="">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<router-link class="top-link" to="/">알림</router-link>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope"></i><b>{{ unreads }}</b>쪽지</router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 2">
		<router-link class="top-link" to="/faq">고객문의</router-link> |
		<router-link class="top-link" to="/">알림</router-link> |
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope"></i><b>{{ unreads }}</b>쪽지</router-link> |
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 1">
		<router-link class="top-link" to="/faq">고객문의</router-link> |
		<router-link class="top-link" to="/">알림</router-link> |
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope"></i><b>{{ unreads }}</b>쪽지</router-link> |
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 0">
		<router-link class="top-link" to="/faq">고객문의</router-link>
	</div>
</template>

<style scoped>
	b {
		color: red;
		font-size: 20px;
	}
	.top-link {
		text-decoration: none;
		color: gray;
		margin: 10px;
	}
	.top {
		position: absolute;
		right: 200px;
		top: 30px;
	}
</style>

<script>
export default {
	data () {
		return {
      		unreads: 0,
      		timer: null
		}
	},
	props: {
		privilege: Number
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
			})
		}
	},
	created () {
		this.getUnreads()
		this.timer = setInterval(this.getUnreads, 3000)
	},
	beforeUnmount () {
		clearInterval(this.timer)
	}
}
</script>
