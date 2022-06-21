<template>
	<div class="top" v-if="privilege === 3">
		<router-link class="top-link" to="/">고객문의</router-link> |
		<router-link class="top-link" to="/">알림</router-link> |
		<router-link class="top-link" to="/message">쪽지</router-link> |
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 2">
		<router-link class="top-link" to="/">고객문의</router-link> |
		<router-link class="top-link" to="/">알림</router-link> |
		<router-link class="top-link" to="/message">쪽지</router-link> |
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 1">
		<router-link class="top-link" to="/">고객문의</router-link> |
		<router-link class="top-link" to="/">알림</router-link> |
		<router-link class="top-link" to="/message">쪽지</router-link> |
		<router-link class="top-link" to="/myPage">내정보</router-link>
	</div>
	<div class="top" v-else-if="privilege === 0">
		<router-link class="top-link" to="/">고객문의</router-link>
	</div>
</template>

<script>
export default {
	props: {
		privilege: Number
	}
}
</script>
