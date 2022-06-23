<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="generalEdit">
        <h1 class="h3 mb-3 fw-normal"><b>내 정보 수정</b></h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" readonly>
          <label for="email" class="">Email address</label>
        </div>
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
      name: '',
      originName: '',
      nicknameCheckResult: '',
      phone: '',
      region: '',
      nicknameDuplication: false
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
    // submit
    generalEdit (event) {
      if (this.name === this.originName) {
        this.putAxios(event)
      } else {
        if (this.nicknameDuplication === false) {
          alert('닉네임 중복검사를 해주세요')
          event.preventDefault()
        } else {
          this.putAxios(event)
        }
      }
    },
    // axios
    putAxios (event) {
      if (confirm('정보를 수정하시겠습니까?')) {
        this.axios({
          url: '/api/generalEdit',
          method: 'PUT',
          data: {
            email: this.email,
            name: this.name,
            phone: this.phone,
            region: this.region
          }
        })
        .then((response) => {
          alert('정보가 수정되었습니다.')
          this.$router.push('/home')
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        event.preventDefault()
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
      this.name = response.data.name
      this.originName = response.data.name
      this.phone = response.data.phone
      this.region = response.data.region
    })
  }
}

</script>

<style scoped>
span {
  color: blue;
}

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
