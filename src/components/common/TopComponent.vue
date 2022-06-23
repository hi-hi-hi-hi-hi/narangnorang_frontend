<template>
	<PostNotiModal v-if="modalVal" @modalClose="modalClose"/>
	<div class="top" v-if="privilege === 3">
		<router-link class="top-link" to="/faq">고객문의</router-link>
		<a class="top-link" @click="modalOpen()">알림</a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope"></i>쪽지<span> {{ unreads }}</span></router-link>
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 2">
		<router-link class="top-link" to="/faq">고객문의</router-link> |
		<a class="top-link" @click="modalOpen()">알림</a>
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope"></i>쪽지<span> {{ unreads }}</span></router-link> |
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 1">
		<router-link class="top-link" to="/faq">고객문의</router-link> |
		<a class="top-link" @click="modalOpen()">알림</a> |
		<router-link class="top-link" to="/message"><i class="fa-solid fa-envelope"></i>쪽지<span> {{ unreads }}</span></router-link> |
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 0">
		<router-link class="top-link" to="/faq">고객문의</router-link>
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
</style>

<script>
import PostNotiModal from '@/components/post/PostNotiModal.vue'
export default {
	data () {
		return {
      		unreads: 0,
      		timer: null,
			modalVal: false
		}
	},
	components: {
		PostNotiModal
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
				clearInterval(this.timer)
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
		this.timer = setInterval(this.getUnreads, 3000)
	}
}
</script>
