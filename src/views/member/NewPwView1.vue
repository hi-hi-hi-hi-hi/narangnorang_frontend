<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="newPw">
        <h1 class="h3 mb-3 fw-normal"><b>새 비밀번호 설정</b></h1>
        <div class="form-floating">
          <input type="password" class="form-control" id="password" v-model="password" required="required" placeholder="New Password">
          <label for="password">New Password</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" id="password2" v-model="password2" @input="pwCheck" required="required" placeholder="New Password Check">
          <label for="password2">New Password Check</label>
        </div>
        <span id="pwCheckResult" style="color: blue">{{ pwCheckResult }}</span><br>
        <button class="w-100 btn btn-outline-dark btn-lg" type="submit">완료</button>
      </form>
    </main>
  </body>
</template>

<script>

export default {
  data () {
    return {
      password: '',
      password2: '',
      pwCheckResult: '',
      pwCompare: false
    }
  },
  methods: {
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
    // submit
    newPw (event) {
      if (this.pwCompare === false) {
        alert('비밀번호가 일치하지 않습니다. 비밀번호를 확인해주세요.')
        event.preventDefault()
      } else {
        this.axios({
        url: '/api/newPw',
        method: 'PUT',
        data: {
          password: this.password
        },
        responseType: 'json'
        })
        .then((response) => {
          if (response.data === 1) {
            alert('비밀번호가 변경되었습니다.')
            this.$router.push('/login')
          }
        })
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
  padding-top: 200px;
  padding-bottom: 200px;
  background-color: white;
}

.form-signin {
  max-width: 400px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}
</style>
