<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="findPw">
        <h1 class="h3 mb-3 fw-normal">비밀번호 찾기</h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" required>
          <label for="email" class="">Email address</label>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="com" v-model="com" placeholder="인증확인" required>
          <label for="com" class="">인증확인</label>
          <span id="compare-text" style="color: blue">{{ compareText }}</span><br>
        </div>
        <button type="button" class="btn btn-secondary" @click="sendMail">인증메일보내기</button>
        <button type="button" class="btn btn-secondary" @click="compare">인증확인</button>
        <button type="submit" class="w-100 mt-3 btn btn-lg btn-primary">새 비번 설정하기</button>
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
      compareText: '',
      key: '',
      isCertification: false,
      isExist: false
    }
  },
  methods: {
    // 인증 메일 전송
    sendMail (event) {
      this.axios({
        url: '/api/findPw',
        method: 'POST',
        data: {
          email: this.email
        }
      })
      .then((response) => {
        if (response.data !== 1) {
          alert('존재하지 않는 계정입니다.')
          event.preventDefault()
          this.isExist = false
        } else {
          this.isExist = true
          this.axios({
            url: '/api/sendMail',
            method: 'POST',
            data: {
              email: this.email
            }
          })
          .then((response) => {
            alert('인증메일이 전송되었습니다.')
            this.key = response.data
            console.log(response.data)
          })
          .catch((error) => {
            console.log(error)
          })
        }
      })
    },
    // 인증번호 확인
    compare () {
      let mesg = '불일치'
      if (this.com === this.key) {
        mesg = '일치'
        document.getElementById('compare-text').setAttribute('style', 'color: blue')
        this.isCertification = true
      } else {
        document.getElementById('compare-text').setAttribute('style', 'color: red')
        this.isCertification = false
      }
      this.compareText = mesg
    },
    // submit
    findPw (event) {
      if (this.isCertification === false) {
        alert('인증번호가 일치하지 않습니다.')
        event.preventDefault()
      } else {
        this.$router.push('/newPw')
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
</style>
