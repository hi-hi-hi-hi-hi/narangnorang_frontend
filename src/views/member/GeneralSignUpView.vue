<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="generalSignUp">
        <h1 class="h3 mb-3 fw-normal"><b>일반회원가입</b></h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" required>
          <label for="email" class="">Email address</label>
          <span id="emailCheckResult" style="color: blue">{{ emailCheckResult }}</span>
        </div>
        <br>
        <button type="button" class="btn btn-dark btn-id" @click="checkEmail">중복 체크</button>
        <button type="button" class="btn btn-dark" @click="sendMail">인증메일보내기</button><br>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="com" v-model="com" placeholder="인증확인" required>
          <label for="com" class="">인증확인</label>
          <span id="compare-text" style="color: blue">{{ compareText }}</span>
        </div>
        <br>
        <button type="button" class="btn btn-dark" @click="compare">인증확인</button>
        <br>
        <div class="form-floating">
          <br>
          <input type="text" class="form-control" id="password" v-model="password" placeholder="Password" required>
          <label for="password" class="mt-4">Password</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="password2" @input="pwCheck" v-model="password2" placeholder="Password Check" required>
          <label for="password2" class="">Password Check</label>
          <span id="pwCheckResult" style="color: blue">{{ pwCheckResult }}</span>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="name" v-model="name" placeholder="NICKNAME" required>
          <label for="name">NICKNAME</label>
          <span id="nicknameCheckResult" style="color: blue">{{ nicknameCheckResult }}</span>
        </div>
        <br>
        <button type="button" class="btn btn-dark" @click="checkName">중복 체크</button>
        <br>
        <div class="form-floating">
          <br>
          <input type="text" class="form-control" id="phone" v-model="phone" placeholder="-제외 번호" required>
          <label for="phone" class="mt-4">휴대전화</label>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="region" v-model="region" placeholder="지역(시/군/구)" required>
          <label for="region">지역</label>
        </div>
        <br>
        <button type="submit" class="w-100 btn btn-outline-dark btn-lg">회원가입</button>
      </form>
    </main>
  </body>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      com: '',
      password: '',
      password2: '',
      name: '',
      phone: '',
      region: '',
      emailCheckResult: '',
      pwCheckResult: '',
      nicknameCheckResult: '',
      idDuplication: false,
      pwCompare: false,
      nicknameDuplication: false,
      compareText: '',
      key: '',
      isCertification: false
    }
  },
  methods: {
    // 이메일 정규식 체크
    email_check (email) {
      const reg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      return reg.test(email)
    },
    // 아이디 중복 체크
    checkEmail (event) {
      let mesg = '사용 가능한 이메일입니다.'
      if (!this.email_check(this.email)) {
        alert('이메일 형식에 맞게 입력해주세요')
        event.preventDefault()
      } else {
          this.axios({
          url: '/api/checkEmail',
          method: 'POST',
          data: { email: this.email },
          responseType: 'json'
        })
          .then((response) => {
            if (response.data !== 1) {
              document.getElementById('emailCheckResult').setAttribute('style', 'color: blue')
              this.idDuplication = true
            } else if (response.data === 'error') {
              mesg = '에러'
              document.getElementById('emailCheckResult').setAttribute('style', 'color: red')
              this.idDuplication = false
            } else {
              mesg = '등록된 이메일입니다.'
              document.getElementById('emailCheckResult').setAttribute('style', 'color: red')
              this.idDuplication = false
            }
            this.emailCheckResult = mesg
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
    // 인증번호 확인
    compare () {
      let mesg = '불일치'
      this.axios({
        url: '/api/compare',
        method: 'POST',
        data: { com: this.com }
      })
      .then((response) => {
        if (response.data === true) {
          mesg = '일치'
          document.getElementById('compare-text').setAttribute('style', 'color: blue')
          this.isCertification = true
        } else {
          document.getElementById('compare-text').setAttribute('style', 'color: red')
          this.isCertification = false
        }
        this.compareText = mesg
      })
    },
    // 비번 재확인
    pwCheck () {
      const pw = this.password
      const pw2 = this.password2
      let mesg = '비번일치'
      if (pw !== pw2) {
        mesg = '비번 불일치'
        document.getElementById('pwCheckResult').setAttribute('style', 'color: red')
        this.pwCompare = false
      } else {
        document.getElementById('pwCheckResult').setAttribute('style', 'color: blue')
        this.pwCompare = true
      }
      this.pwCheckResult = mesg
    },
    // 닉네임 중복 검사
    checkName () {
      let mesg = '사용 가능한 닉네임입니다.'
      this.axios({
        url: '/api/checkName',
        method: 'POST',
        data: { name: this.name }
      })
      .then((response) => {
        if (response.data !== 1) {
          document.getElementById('nicknameCheckResult').setAttribute('style', 'color: blue')
          this.nicknameDuplication = true
        } else {
          document.getElementById('nicknameCheckResult').setAttribute('style', 'color: red')
          mesg = '이미 사용중인 닉네임입니다.'
          this.nicknameDuplication = false
        }
        this.nicknameCheckResult = mesg
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // 회원 가입 처리
    generalSignUp (event) {
      if (!this.email_check(this.email)) {
        alert('이메일 형식에 맞게 입력해주세요')
        event.preventDefault()
      } else if (this.idDuplication === false) {
        alert('아이디 중복검사를 해주세요')
        event.preventDefault()
      } else if (this.isCertification === false) {
        alert('인증 확인이 필요합니다')
        event.preventDefault()
      } else if (this.pwCompare === false) {
        alert('비밀번호가 일치하지 않습니다')
        event.preventDefault()
      } else if (this.nicknameDuplication === false) {
        alert('닉네임 중복검사를 해주세요')
        event.preventDefault()
      } else {
        this.axios({
        url: '/api/generalSignUp',
        method: 'POST',
        params: {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
          region: this.region
        }
        })
        .then((response) => {
          alert('회원가입 완료')
          this.$router.push('/login')
        })
        .catch((error) => {
          console.log(error)
        })
      }
    },
    // 인증 메일 전송
    sendMail (event) {
      const url = '/api/sendMail'
      const data = {
        email: this.email
      }
      if (this.idDuplication === false) {
        alert('아이디 중복검사를 해주세요.')
        event.preventDefault()
      } else {
        this.axios
        .post(url, data)
        alert('인증메일이 전송되었습니다.')
      }
    }
  }
}
</script>

<style scoped>
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: white;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.btn-id {
  margin-right: 10px;
}
.btn-lg {
  font-weight: bold;
}
</style>
