<template>
  <div class="login">
    <h1>로그인</h1>
    <div>
      <div>이메일</div>
      <input type="email" name="email" required="required" placeholder="이메일을 입력해주세요">
		  <div>비밀번호</div>
      <input type="password" name="password" required="required" placeholder="비밀번호를 입력해주세요"><br>
      <input type="button" value="로그인" @click="this.tryLogin">
    </div>
    <router-link to="/findPw">Forgot Password?</router-link><br>
    <router-link to="/signUp">회원 가입</router-link>
  </div>
</template>

<script>
// export default {
//   name: 'login',
//   data() {
//     return {
//       child: null
//     }
//   },
//   methods: {
//     tryLogin() {
//       var email = document.getElementById('email').value;
//       var password = document.getElementById('password').value;
//       var url = 'http://localhost:8091/login';
//       var data = JSON.stringify({
//         "email": email,
//         "password": password,
//       });
//     }
//   }
// }
</script>
