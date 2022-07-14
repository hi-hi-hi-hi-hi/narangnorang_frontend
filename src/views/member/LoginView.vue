<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form>
        <img class="logo" :src="require('@/assets/common/logo.png')">
        <div class="form-floating">
          <input type="email" class="form-control" id="floatingInput" v-model="email" required="required" placeholder="abc@example.com">
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="floatingPassword" v-model="password" required="required" placeholder="Password">
          <label for="floatingPassword">Password</label>
        </div>
        <button class="w-100 btn btn-outline-dark btn-lg" type="button" @click="login">로그인</button>
        <div>
          <div id="google-signin-btn"></div>
        </div>
        <router-link class="mt-5 text-black" to="/findPw">Forgot Password?</router-link><br>
        <p class="mt-5 text-muted">아직 계정이 없으신가요?</p>
        <p class="text-muted">지금 바로 <router-link to="/signUp" class="text-black">회원 가입</router-link> 해보세요.</p>
      </form>
    </main>
  </body>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  mounted () {
    window.gapi.signin2.render('google-signin-btn', {
      onsuccess: this.onSignIn,
      onfailure: console.log('fail')
      })
  },
  methods: {
    login () {
      this.axios({
        url: '/api/login',
        method: 'post',
        params: { email: this.email, password: this.password },
        responseType: 'json'
      }).then((response) => {
        if (response.data !== '') {
          this.$store.commit('member', response.data)
          if (response.data.privilege === 0) {
            this.$router.push('/admin')
          } else {
            this.$router.push('/home')
          }
        } else {
          alert('이메일 및 비밀번호를 확인해주세요')
        }
      })
    },
    onSignIn (googleUser) {
      const profile = googleUser.getBasicProfile()
      console.log('ID: ' + profile.getId())
      console.log('Full Name: ' + profile.getName())
      console.log('Given Name: ' + profile.getGivenName())
      console.log('Family Name: ' + profile.getFamilyName())
      console.log('Image URL: ' + profile.getImageUrl())
      console.log('Email: ' + profile.getEmail())

      const idToken = googleUser.getAuthResponse().id_token
      console.log('ID Token: ' + idToken)
    }
  }
}
</script>

<style scoped>

body {
  align-items: center;
  padding-top: 200px;
  padding-bottom: 0px;
  background-color: white;
  margin: auto;
}

.logo {
  max-width: 200px;
  height: auto;
}
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.btn {
  margin-bottom: 20px;
}

.btn-lg {
  font-weight: bold;
}

.text-black {
  text-decoration: none;
  color: black;
  font-weight: bold;
}
</style>
