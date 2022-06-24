<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="myPage">
        <p>정보를 안전하게 보호하기 위하여<br>
          비밀번호를 다시 확인 합니다.</p>
        <div class="form-floating">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" readonly>
          <label for="email" class="">Email address</label>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="password" v-model="password" placeholder="Password" required>
          <label for="password">Password</label>
        </div>
        <br>
        <button type="submit" class="w-100 btn btn-outline-dark btn-lg">확인</button>
      </form>
    </main>
  </body>
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
        if (this.privilege === 3) {
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
    })
    .then((response) => {
      this.email = response.data.email
      this.comparePw = response.data.password
      this.privilege = response.data.privilege
    })
  }
}

</script>

<style scoped>

body {
  display: flex;
  align-items: center;
  padding-bottom: 80px;
  background-color: white;
  margin: auto;
}

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}
</style>
