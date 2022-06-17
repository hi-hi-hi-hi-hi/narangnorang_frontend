<template>
  <div class="findPw">
    <form @submit.prevent="myPage">
      <p>정보를 안전하게 보호하기 위하여 비밀번호를 다시 확인 합니다.</p>
      <div>
        <p>이메일</p>
        <p>{{ email }}</p>
      </div>
      <div>
        <label for="password">비밀번호</label>
        <input type="password" id="password" v-model="password" placeholder="PASSWORD" required="required" />
      </div>
      <br>
      <button type="submit">확인</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      password: '',
      comparePw: '',
      privilege: 0
    }
  },
  methods: {
    // submit
    myPage (event) {
      if (this.password !== this.comparePw) {
        alert('비밀번호가 틀립니다.')
        event.preventDefault()
      } else {
        if (this.privilege === 0) {
          this.$router.push('/admin')
        } else if (this.privilege === 3) {
          this.$router.push('/generalEdit')
        } else {
          this.$router.push('/counselorEdit')
        }
      }
    }
  },
  mounted () {
    this.axios({
        url: '/api/loginSession',
        method: 'get',
        responseType: 'json'
      }).then((response) => {
        this.email = response.data.email
        this.comparePw = response.data.password
        this.privilege = response.data.privilege
      })
  }
}

</script>
