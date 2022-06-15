<template>
  <div class="login">
    <h1>로그인</h1>
    <form>
      <div>이메일</div>
      <input type="email" v-model="email" required="required" placeholder="이메일을 입력해주세요">
		  <div>비밀번호</div>
      <input type="password" v-model="password" required="required" placeholder="비밀번호를 입력해주세요"><br>
      <button type="button" @click="loginSubmit">로그인</button>
    </form>
    <router-link to="/findPw">Forgot Password?</router-link><br>
    <router-link to="/signUp">회원 가입</router-link>
  </div>
</template>

<script>
// import axios from 'axios'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  }
//   methods: {
//     loginSubmit () {
//       const loginData = {
//         email: this.email,
//         password: this.password
//       }
//       const URL = '/login'
//       axios
//         .post(URL, loginData)
//         .then(function (response) {
//           if (response.status === 200) {
//             this.$store.commit('login', response.data)

//           }
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
//     }
//   }
}
</script>
