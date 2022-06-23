<template>
	<div>
		<!-- Start Header -->
		<router-link class="header" v-if="getPrivilege" to="/home">
			<img :src="require('@/assets/header/logo.png')">
		</router-link>
		<TopComponent v-if="getPrivilege" :privilege="member.privilege" />
		<button type="button" class="btn" v-if="getPrivilege" @click="logout">로그아웃</button>
		<NavBarComponent v-if="getPrivilege" :privilege="member.privilege" />
		<!-- End Header -->

		<!-- Start Main -->
		<router-view :member="member" />
		<!-- End Main -->

		<ChatBot v-if="getPrivilege" :privilege="member.privilege" @challengeComplete="getSession" />

		<!-- Start Footer -->
		<!-- End Footer -->
	</div>
</template>

<script>
import TopComponent from '@/components/common/TopComponent'
import NavBarComponent from '@/components/common/NavBarComponent'
import ChatBot from '@/components/common/ChatBot'
export default {
	components: {
		TopComponent,
		NavBarComponent,
		ChatBot
	},
	data () {
		return {
			pathsNotLoggedIn: [
				'main',
				'notFound',
				'login',
				'signUp',
				'generalSignUp',
				'counselorSignUp',
				'findPw'
			],
			member: null
		}
	},
	computed: {
		getPrivilege () {
            return this.member != null && !this.pathsNotLoggedIn.includes(this.$route.name)
        }
	},
	methods: {
		// 세션 얻어오기
		getSession () {
			this.axios({
				url: '/api/loginSession',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data === '') {
					this.member = null
					this.$router.push('/login')
				} else {
					this.member = response.data
				}
			})
		},
		// 로그아웃
		logout () {
			this.axios({
				url: '/api/logout',
				method: 'GET'
			}).then((response) => {
				this.member = null
				this.$router.push('/')
			})
		}
	},
	watch: {
        '$route' (to, from) {
			if (!this.pathsNotLoggedIn.includes(this.$route.name)) {
            	this.getSession()
			} else if (this.member != null) {
				this.logout()
			}
        }
    }
}
</script>

<style scoped>
.header {
	position: absolute;
	top: 20px;
	left: 100px;
}

img {
	max-width: 200px;
}

button {
	position: absolute;
	top: 27px;
	right: 100px;
}
</style>
