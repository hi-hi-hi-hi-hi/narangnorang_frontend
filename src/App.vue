<template>
	<div>
		<!-- Header & ChatBot -->
		<div v-if="!pathNotLoggedIn && member != null">
			<router-link to="/home" class="home"><img :src="require('@/assets/common/logo.png')"></router-link>
			<TopComponent :privilege="member.privilege" :id="member.id"/>
			<button type="button" @click="logout" class="btn">로그아웃</button>
			<NavBarComponent :privilege="member.privilege" />
			<ChatBot :privilege="member.privilege" />
		</div>
		<!-- Header & ChatBot -->

		<router-view :member="member" />
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
	computed: {
		pathNotLoggedIn () {
			return this.$store.getters.pathsNotLoggedIn.includes(this.$route.name)
		},
		member () {
            return this.$store.getters.member
        }
	},
	methods: {
		logout () {
			this.axios({
				url: '/api/logout',
				method: 'GET'
			}).then((response) => {
				this.$store.commit('member', null)
				this.$router.push('/')
			})
		}
	},
	watch: {
        // '$route' (to, from) {
		// 	if (!this.pathNotLoggedIn && this.member == null) {
		// 		this.logout()
		// 	}
        // }
    }
}
</script>

<style scoped>
.home {
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
