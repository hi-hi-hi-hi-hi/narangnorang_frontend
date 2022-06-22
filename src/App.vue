<template>
	<div>
		<!-- Start Header -->
		<router-link v-if="getPrivilege" to="/home" style="position:absolute;top:20px;left:100px;">
			<img :src="require('@/assets/header/logo.png')" style="max-width: 200px;">
		</router-link>
		<TopComponent v-if="getPrivilege" :privilege="member.privilege" />
		<button type="button" class="btn" v-if="getPrivilege" @click="logout" style="position:absolute;top:27px;right:100px;">로그아웃</button>
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
					alert('로그인을 해주세요')
					this.member = null
					this.$router.push('/')
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
