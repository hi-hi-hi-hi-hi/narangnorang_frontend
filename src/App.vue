<template>
	<div>
		<!-- Start Header -->
		<router-link class="header" v-if="getPrivilege" to="/home">
			<img :src="require('@/assets/header/logo.png')">
		</router-link>
		<TopComponent v-if="getPrivilege" :privilege="member.privilege" :id="member.id"/>
		<button type="button" class="btn" v-if="getPrivilege" @click="logout">로그아웃</button>
		<NavBarComponent v-if="getPrivilege" :privilege="member.privilege" />
		<!-- End Header -->

		<!-- Start Main -->
		<router-view :member="member" class="body-part" />
		<!-- End Main -->

		<ChatBot v-if="getPrivilege" :privilege="member.privilege" @challengeComplete="getSession" />

		<!-- Start Footer -->
		<footer></footer>
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
.body-part {
	width: 80%;
	height: 650px;
	overflow-x: hidden;
	overflow-y: auto;
	scrollbar-width: thin;
}

.body-part::-webkit-scrollbar {
    width: 5px;  /* 스크롤바의 너비 */
}

.body-part::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #cdcdcdb1; /* 스크롤바의 색상 */
    border-radius: 10px;
}

.body-part::-webkit-scrollbar-track {
    background: rgba(213, 213, 213, 0.1);  /*스크롤바 뒷 배경 색상*/
}
</style>
