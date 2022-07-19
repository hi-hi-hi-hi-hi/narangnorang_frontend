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
        <router-link class="mt-5 text-black" to="/findPw">Forgot Password?</router-link><br>
        <a @click="kakaologin()">
          <img :src="require('@/assets/member/kakao_login_medium_wide.png')"/>
        </a>
        <p class="mt-5 text-muted">아직 계정이 없으신가요?</p>
        <p class="text-muted">지금 바로 <router-link to="/signUp" class="text-black">회원 가입</router-link> 해보세요.</p>
      </form>
      <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div> -->
      <!-- <div>
        <div id="google-signin-btn"></div>
      </div> -->
      <!-- <div id="g_id_onload"
        data-client_id="692746488529-gnq1ndn5r679jt57q15d8h7f4dqr9a6l.apps.googleusercontent.com"
        data-callback="handleCredentialResponse">
      </div> -->
      <!-- <div id="g_id_onload"
         data-client_id="692746488529-gnq1ndn5r679jt57q15d8h7f4dqr9a6l.apps.googleusercontent.com"
         data-callback=myCallbackFunction
         data-auto_prompt="false">
      </div>
      <div class="g_id_signin"
           data-type="standard"
           data-size="large"
           data-theme="outline"
           data-text="sign_in_with"
           data-shape="rectangular"
           data-logo_alignment="left">
      </div> -->
      <!-- <div class="g_id_signin" data-type="standard"></div> -->
      <div id="buttonDiv"></div>
      <div>
        <div id="naverIdLogin"></div>
        <button type="button" @click="logout">로그아웃</button>
      </div>
      <router-link class="mt-5 text-black" to="/findPw">Forgot Password?</router-link><br>
      <p class="mt-5 text-muted">아직 계정이 없으신가요?</p>
      <p class="text-muted">지금 바로 <router-link to="/signUp" class="text-black">회원 가입</router-link> 해보세요.</p>
    </main>
  </body>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      naverLogin: null
    }
  },
  mounted () {
  this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: 'q62CGUZilQWmYEkefBnR', // 개발자센터에 등록한 ClientID
      callbackUrl: 'http://localhost:8092/home', // 개발자센터에 등록한 callback Url
      isPopup: false, // 팝업을 통한 연동처리 여부
      loginButton: { color: 'green', type: 3, height: 60 } // 로그인 버튼의 타입을 지정
    })

    // 설정정보를 초기화하고 연동을 준비
    this.naverLogin.init()

    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log(status)
        console.log(this.naverLogin.user)

        // 필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크
        const email = this.naverLogin.user.getEmail()
        if (email === undefined || email === null) {
          alert('이메일은 필수정보입니다. 정보제공을 동의해주세요.')
          // 사용자 정보 재동의를 위하여 다시 네아로 동의페이지로 이동함
          this.naverLogin.reprompt()
        }
      } else {
        console.log('callback 처리에 실패하였습니다.')
      }
    })
  },
  // mounted () {
  //   window.google.accounts.id.initialize({
  //     client_id:
  //     '692746488529-gnq1ndn5r679jt57q15d8h7f4dqr9a6l.apps.googleusercontent.com',
  //     callback: this.handleCredentialResponse
  //   })
  //   window.google.accounts.id.prompt()
  // },
  // mounted () {
  //   window.gapi.signin2.render('google-signin-btn', {
  //     onsuccess: this.onSignIn,
  //     onfailure: console.log('fail')
  //     })
  // },
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
    logout () {
      const accessToken = this.naverLogin.accessToken.accessToken
      const url = `/oauth2.0/token?grant_type=delete&client_id=zFcLWPMTcDQTNTB6iIOy&client_secret=bUW7FZMpS9&access_token=${accessToken}&service_provider=NAVER`

      axios.get(url).then((res) => {
        console.log(res.data)
      })

      // https://nid.naver.com/oauth2.0/token?grant_type=delete&client_id=zFcLWPMTcDQTNTB6iIOy&client_secret=bUW7FZMpS9&access_token=AAAAOOCeX4fAa_NxKPAmJW8C1UeLxGT3nM0wRV33irhyHyRua1JJrfrp0jZwfbOD0r502Id9mbhb0YiA9_NvCXGAwws&service_provider=NAVER

    kakaologin () {
      window.location.replace(
        'https://kauth.kakao.com/oauth/authorize?client_id=94007325c197e3be03e0c5690a45abdb&redirect_uri=http://localhost:8091/generalSignUp&response_type=code'
      )
    }
    // myCallbackFunction (googleUser) {
    //   const profile = googleUser.getBasicProfile()
    //   console.log('ID: ' + profile.getId())
    //   console.log('Full Name: ' + profile.getName())
    //   console.log('Given Name: ' + profile.getGivenName())
    //   console.log('Family Name: ' + profile.getFamilyName())
    //   console.log('Image URL: ' + profile.getImageUrl())
    //   console.log('Email: ' + profile.getEmail())

    //   const idToken = googleUser.getAuthResponse().id_token
    //   console.log('ID Token: ' + idToken)
    // }
  }
}
function handleCredentialResponse (response) {
  console.log('Encoded JWT ID token: ' + response.credential)
  // const responsePayload = decodeJwtResponse(response.credential)
  // console.log('ID: ' + responsePayload.sub)
  // console.log('Full Name: ' + responsePayload.name)
  // console.log('Given Name: ' + responsePayload.given_name)
  // console.log('Family Name: ' + responsePayload.family_name)
  // console.log('Image URL: ' + responsePayload.picture)
  // console.log('Email: ' + responsePayload.email)
  }
window.onload = function () {
  this.google.accounts.id.initialize({
    client_id: '692746488529-gnq1ndn5r679jt57q15d8h7f4dqr9a6l.apps.googleusercontent.com',
    callback: handleCredentialResponse
  })
  this.google.accounts.id.renderButton(
    document.getElementById('buttonDiv'),
    { theme: 'outline', size: 'large' } // customization attributes
  )
  this.google.accounts.id.prompt() // also display the One Tap dialog
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
