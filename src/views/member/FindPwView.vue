<template>
  <div class="signUp">
    <form @submit.prevent="findPw">
      <div>
        <label for="email">아이디(이메일)</label>
        <input type="email" id="email" v-model="email" placeholder="Email" required>
        <button type="button" @click="sendMail">인증메일보내기</button><br>
        <br>
      </div>
      <div>
        <label for="com">인증확인</label>
        <input type="text" id="com" v-model="com" placeholder="인증확인" required>
        <button type="button" @click="compare">인증확인</button><br>
        <span id="compare-text" style="color: blue">{{ compareText }}</span><br>
      </div>
      <br>
      <button type="submit">새 비번 설정하기</button>
    </form>
  </div>
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
    // findPw (event) {
    //   if (this.isCertification === false) {
    //     alert('인증번호가 일치하지 않습니다.')
    //     event.preventDefault()
    //   } else {
    //     this.axios({
    //     url: '/api/findPw',
    //     method: 'POST',
    //     data: {
    //       email: this.email
    //     }
    //   })
    //   .then((response) => {
    //     if (response.data !== '') {
    //       this.isExist = true
    //       this.$router.push('/newPw')
    //     } else {
    //       alert('존재하지 않는 계정입니다.')
    //       this.isExist = false
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error)
    //   })
    //   }
    // }
  }
}

</script>
