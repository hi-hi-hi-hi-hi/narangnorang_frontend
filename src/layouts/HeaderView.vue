<template>
    <img :src="require('@/assets/header/logo.png')" style="max-width:200px;heigth:auto;">
    <div class="top" v-if="privilege === 0">
      <button type="button" @click="logout">로그아웃</button>
    </div>
    <div class="top" v-else-if="headerVisible">
        <router-link class="nav_link" to="/home">나랑노랑</router-link> |
        <router-link class="nav_link" to="/">쪽지</router-link> |
        <router-link class="nav_link" to="/">알림</router-link> |
        <router-link class="nav_link" to="/myPage">내 정보</router-link> |
        <router-link class="nav_link" to="/">고객문의</router-link> |
        <button type="button" @click="logout">로그아웃</button>
    </div>
    <div class="navBar" v-if="privilege === 0">
        <router-link class="nav_link" to="/memberManagement">계정관리</router-link> |
        <router-link class="nav_link" to="/counselorPrivilege">상담사 승인 관리</router-link>
    </div>
    <div class="navBar" v-else-if="headerVisible">
        <router-link class="nav_link" to="/post">커뮤니티</router-link> |
        <router-link class="nav_link" to="/test">테스트</router-link> |
        <router-link class="nav_link" to="/counsel">상담하기</router-link> |
        <router-link class="nav_link" to="/mynorang/challenge">나의노랑</router-link>
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
      headerVisible: headerVisible,
      privilege: 0
    }
  },
  methods: {
    // 로그아웃
    logout () {
      this.axios({
        url: '/api/logout',
        method: 'GET'
      })
      .then((response) => {
        if (response.data === true) {
          this.$router.push('/')
        }
      })
    }
  },
  mounted () {
    this.axios({
      url: '/api/loginSession',
      method: 'get',
      responseType: 'json'
    })
    .then((response) => {
      this.privilege = response.data.privilege
    })
  }
}
</script>
