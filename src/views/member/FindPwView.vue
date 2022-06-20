<template>
  <div class="signUp">
    <form @submit.prevent="findPw">
      <div>
        <label for="email">아이디(이메일)</label>
        <input type="email" id="email" v-model="email" placeholder="Email" required>
        <!-- <button type="button" @click="sendMail">인증메일보내기</button><br> -->
        <br>
      </div>
      <!-- <div>
        <label for="com">인증확인</label>
        <input type="text" id="com" v-model="com" placeholder="인증확인" required>
        <input type="button" id="compare" value="인증하기"><br />
        <span id="compare-text"></span><br>
      </div> -->
      <br>
      <button type="submit">새 비번 설정하기</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: ''
      // com: '',
    }
  },
  methods: {
    // 인증 메일 전송
    // sendMail () {
    //   const url = '/api/sendMail'
    //   const data = {
    //     email: this.email
    //   }
    //   axios
    //     .post(url, data)
    //     .then(function (response) {
    //       alert('인증메일이 전송되었습니다.')
    //       console.log(response.data)
    //     })
    //     .catch(function (error) {
    //       console.log(error)
    //     })
    // }
    findPw () {
      this.axios({
        url: '/api/findPw',
        method: 'POST',
        data: {
          email: this.email
        }
      })
      .then((response) => {
        if (response.data !== '') {
          this.$router.push('/newPw')
        } else {
          alert('존재하지 않는 계정입니다.')
        }
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
}

</script>
