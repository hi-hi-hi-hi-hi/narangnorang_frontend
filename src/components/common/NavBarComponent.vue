<template>
	<div class="navBarSection">
		<div class="nav-bar" v-if="member.privilege === 3">
			<router-link class="nav-bar-link" to="/post">커뮤니티</router-link>
			<router-link class="nav-bar-link" to="/counsel">상담하기</router-link>
			<router-link class="nav-bar-link" to="/test">테스트</router-link>
			<router-link class="nav-bar-link" to="/mynorang/challenge">나의노랑</router-link>
		</div>
		<div class="nav-bar" v-else-if="member.privilege === 2">
			<router-link class="nav-bar-link" to="/post">커뮤니티</router-link>
			<router-link class="nav-bar-link" to="/counsel">상담하기</router-link>
			<router-link class="nav-bar-link" to="/test">테스트</router-link>
			<router-link class="nav-bar-link" to="/mynorang/challenge">나의노랑</router-link>
		</div>
		<div class="nav-bar" v-else-if="member.privilege === 1">
			<router-link class="nav-bar-link" to="/post">커뮤니티</router-link>
			<router-link class="nav-bar-link" to="/counsel">상담하기</router-link>
			<router-link class="nav-bar-link" to="/test">테스트</router-link>
			<router-link class="nav-bar-link" to="/mynorang/challenge">나의노랑</router-link>
		</div>
		<div class="nav-bar" v-else-if="member.privilege === 0">
			<router-link class="nav-bar-link" to="/memberManagement">계정관리</router-link>
			<router-link class="nav-bar-link" to="/counselorPrivilege">상담사 승인 관리</router-link>
		</div>
	</div>
</template>

<script>
export default {
	computed: {
		member () {
            return this.$store.getters.member
        }
	}
}
</script>

<style scoped>
	.navBarSection {
		text-align: center;
		margin-top: 100px;
		margin-bottom: 40px;
		background-color: #fffbca60;
		border-radius: 10px;
	}
	.nav-bar {
		position: relative;
		display: inline-block;
	}

	.nav-bar a{
		font-weight: bold;
	}
	.nav-bar-link {
		text-decoration: none;
		float: left;
		padding: 0 30px;
		line-height: 80px;
		font-size: 25px;
		color: black;
	}
</style>
