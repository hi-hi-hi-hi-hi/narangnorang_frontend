<template>
	<div>
		<router-link v-if="member" class="nav_link" to="/home">
			<img :src="require('@/assets/common/logo.png')" style="width:200px;">
		</router-link>
		<TopComponent v-if="member" :privilege="privilege"/>
		<button v-if="member" type="button" @click="logout">로그아웃</button>
		<NavBarComponent v-if="member" :privilege="privilege" />
		<ChatBot v-if="member" :privilege="privilege" />
		<router-view v-on:login="login" />
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
			member: null,
			privilege: 4
		}
	},
	methods: {
		login () {
			this.axios({
				url: '/api/loginSession',
				method: 'get',
				responseType: 'json'
			}).then((response) => {
				if (response.data) {
					console.log(response.data)
					this.member = response.data
					this.privilege = response.data.privilege
				}
			})
		},
		// 로그아웃
		logout () {
			this.axios({
				url: '/api/logout',
				method: 'GET'
			}).then((response) => {
				if (response.data) {
					this.member = null
					this.privilege = 4
					this.$router.push('/')
				}
			})
		}
	},
	watch: {
        '$route' (to, from) {
            this.login()
        }
    }
}
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
html, body {
	font-family: 'Noto Sans KR', sans-serif;
}

#app {
	font-family: 'Noto Sans KR', sans-serif;
}
</style>
