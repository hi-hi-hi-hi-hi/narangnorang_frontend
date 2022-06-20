<template>
  <router-link to="/photoUpdate">프로필사진 변경</router-link>
  <form @submit.prevent="generalEdit">
    <div>
      <p>이메일</p>
      <p>{{ email }}</p>
    </div>
    <div>
      <p>닉네임</p>
      <input type="text" v-model="name" required>
      <button type="button" @click="checkName">중복 체크</button><br>
      <span id="nicknameCheckResult" style="color:blue">{{ nicknameCheckResult }}</span><br>
    </div>
    <div>
      <p>휴대전화</p>
      <input type="text" v-model="phone" required>
    </div>
    <div>
      <p>지역</p>
      <input type="text" v-model="region" required>
    </div>
    <br>
    <router-link to="/myPage/newPw">비밀번호 변경</router-link>
    <br>
    <button type="submit">확인</button>
  </form>
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
