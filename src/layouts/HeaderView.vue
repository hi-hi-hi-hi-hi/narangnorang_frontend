<template>
    <img :src="require('@/assets/header/logo.png')" style="max-width:20%;heigth:auto;">
    <div class="top" v-if="headerVisible">
        <router-link class="nav_link" to="/home">나랑노랑</router-link> |
        <router-link class="nav_link" to="/">쪽지</router-link> |
        <router-link class="nav_link" to="/">알림</router-link> |
        <router-link class="nav_link" to="/myPage">내 정보</router-link> |
        <router-link class="nav_link" to="/">고객문의</router-link> |
        <router-link class="nav_link" to="/">로그아웃</router-link>
    </div>
    <div class="navBar" v-if="headerVisible">
        <router-link class="nav_link" to="/post">커뮤니티</router-link> |
        <router-link class="nav_link" to="/test">테스트</router-link> |
        <router-link class="nav_link" to="/counsel">상담하기</router-link> |
        <router-link class="nav_link" to="/mynorang">나의노랑</router-link>
    </div>
</template>
<script>
import router from '../router'
let headerVisible = true // eslint-disable-line no-unused-vars

router.afterEach((to, from) => {
  headerVisible = (to.path === '/post') || (to.path === '/home')
})

export default {
  data () {
    return {
      headerVisible: headerVisible
    }
  }
}
</script>
