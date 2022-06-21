<template>
    <img :src="require('@/assets/header/logo.png')" style="max-width:200px;heigth:auto;">
    <div class="top" v-if="privilege === 0">
      <button type="button" @click="logout">로그아웃</button>
    </div>
    <div class="top" v-else-if="headerVisible">
        <router-link class="nav_link" to="/home"><i class="fa-solid fa-house"></i></router-link> |
        <router-link class="nav_link" to="/message"><i class="fa-solid fa-envelope"></i><b>{{ unreads }}</b></router-link> |
        <router-link class="nav_link" to="/"><i class="fa-solid fa-bell"></i></router-link> |
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
      privilege: 0,
      unreads: 0,
      timer: ''
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
      .catch((err) => {
        console.log(err)
      })
    },
    // 쪽지 알람
    getUnreads () {
      this.axios({
        url: '/api/message/unread',
        method: 'GET'
      })
      .then((res) => {
        this.unreads = res.data.unreadCounts
      })
      .catch((err) => {
        console.log(err)
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
  },
  created () {
    this.getUnreads()
    this.timer = setInterval(this.getUnreads, 3000)
  }
}
</script>

<style scoped>
b{
  color: red;
  font-size: 20px;
}

.nav_link {
  text-decoration: none;
  color: black;
}

button {
  padding: 0;
  border: none;
  background: none;
}
</style>
