<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="generalSignUp">
        <h1 class="h3 mb-3 fw-normal"><b>일반회원가입</b></h1>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="name" v-model="name" placeholder="NICKNAME" required>
          <label for="name">NICKNAME</label>
          <span id="nicknameCheckResult">{{ nicknameCheckResult }}</span>
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
  created () {
    this.create()
  },
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
      isCertification: false,
      codes: ''
    }
  },
  methods: {
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
    create () {
      this.codes = this.$route.query.code
      this.getToken()
    },
    getToken () {
      this.axios
        .get('http://localhost:8091/kakaologin?authorize_code=' + this.codes)
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

span {
  color: blue;
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
