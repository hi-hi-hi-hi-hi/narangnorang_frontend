<template>
  <div class="login">
    <h1>로그인</h1>
    <div>
      <div>이메일</div>
      <input type="email" v-model="email" required="required" placeholder="이메일을 입력해주세요" />
      <div>비밀번호</div>
      <input type="password" v-model="password" required="required" placeholder="비밀번호를 입력해주세요" /><br />
      <input type="button" value="로그인" @click="login" />
    </div>
    <router-link to="/findPw">Forgot Password?</router-link><br />
    <router-link to="/signUp">회원 가입</router-link>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      axios({
        url: '/api/login',
        method: 'post',
        params: { email: this.email, password: this.password },
        responseType: 'json'
      }).then((response) => {
        if (response.data !== '') {
          this.$router.push('/home')
        } else {
          alert('이메일 및 비밀번호를 확인해주세요')
        }
      })
    }
  }
}
</script>
