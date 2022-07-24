<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="kakaoSignUp">
        <h1 class="h3 mb-3 fw-normal"><b>카카오 회원가입</b></h1>
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
      nicknameCheckResult: '',
      nicknameDuplication: false,
      phone: '',
      region: '',
      email: '',
      kakaoId: '',
      name: '',
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
    kakaoSignUp (event) {
      this.axios({
        url: '/api/kakaoSignUp',
        method: 'POST',
        params: {
          email: this.email,
          name: this.name,
          phone: this.phone,
          region: this.region,
          kakaoId: this.kakaoId
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
