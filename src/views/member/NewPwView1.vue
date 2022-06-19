<template>
  <form @submit.prevent="newPw">
    <div>
      <p>새 비밀번호</p>
      <input type="password" v-model="password" placeholder="새 비밀번호" required>
    </div>
    <div>
      <p>새 비밀번호 확인</p>
      <input type="password" v-model="password2" @input="pwCheck" placeholder="새 비밀번호 확인" required>
    </div>
    <span id="pwCheckResult" style="color: blue">{{ pwCheckResult }}</span><br>
    <button type="submit">변경하기</button>
  </form>
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
