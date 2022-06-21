<template>
	<div class="nav-bar" v-if="privilege === 3">
		<router-link class="nav-bar-link" to="/post">커뮤니티</router-link> |
		<router-link class="nav-bar-link" to="/counsel">상담하기</router-link> |
		<router-link class="nav-bar-link" to="/test">테스트</router-link> |
		<router-link class="nav-bar-link" to="/mynorang/challenge">나의노랑</router-link>
	</div>
	<div class="nav-bar" v-else-if="privilege === 2">
		<router-link class="nav-bar-link" to="/post">커뮤니티</router-link> |
		<router-link class="nav-bar-link" to="/counsel">상담하기</router-link> |
		<router-link class="nav-bar-link" to="/test">테스트</router-link> |
		<router-link class="nav-bar-link" to="/mynorang/challenge">나의노랑</router-link>
	</div>
	<div class="nav-bar" v-else-if="privilege === 1">
		<router-link class="nav-bar-link" to="/post">커뮤니티</router-link> |
		<router-link class="nav-bar-link" to="/counsel">상담하기</router-link> |
		<router-link class="nav-bar-link" to="/test">테스트</router-link> |
		<router-link class="nav-bar-link" to="/mynorang/challenge">나의노랑</router-link>
	</div>
	<div class="nav-bar" v-else-if="privilege === 0">
		<router-link class="nav-bar-link" to="/memberManagement">계정관리</router-link> |
		<router-link class="nav-bar-link" to="/counselorPrivilege">상담사 승인 관리</router-link>
	</div>
</template>

<script>
export default {
	props: {
		privilege: Number
	}
}
</script>
