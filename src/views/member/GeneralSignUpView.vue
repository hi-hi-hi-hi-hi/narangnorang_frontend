<template>
  <div class="signUp">
    <form @submit.prevent="generalSignUp">
      <div>
        <label for="email">아이디(이메일)</label>
        <input
          type="email"
          id="email"
          v-model="email"
          placeholder="Email"
          required="required"
        />
        <button type="button" @click="checkEmail">중복 체크</button>
        <!-- <button type="button" @click="sendMail">인증메일보내기</button><br /> -->
        <span id="emailCheckResult" style="color: blue">{{ emailCheckResult }}</span>
        <br />
      </div>
      <!-- <div>
        <label for="com">인증확인</label>
        <input
          type="text"
          id="com"
          v-model="com"
          placeholder="인증확인"
          required="required"
        />
        <input type="button" id="compare" value="인증확인" /><br />
        <span id="compare-text"></span><br />
      </div> -->
      <div>
        <label for="password">비밀번호</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="PASSWORD"
          required="required"
        /><br />
        <label for="password2">비밀번호 확인</label>
        <input
          type="password"
          id="password2"
          v-model="password2"
          @input="pwCheck"
          placeholder="CONFIRM PASSWORD"
          required="required"
        /><br />
        <span id="pwCheckResult" style="color: blue">{{ pwCheckResult }}</span><br />
      </div>
      <div>
        <label for="name">닉네임</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="NICKNAME"
          required="required"
        />
        <button type="button" @click="checkName">중복 체크</button>
        <span id="nicknameCheckResult" style="color: blue">{{ nicknameCheckResult }}</span><br />
      </div>
      <div>
        <label for="phone">휴대전화</label>
        <input
          type="text"
          id="phone"
          v-model="phone"
          placeholder="-제외 번호"
          required="required"
        /><br />
      </div>
      <div>
        <label for="region">지역</label>
        <input
          type="text"
          id="region"
          v-model="region"
          placeholder="지역(시/군/구)"
          required="required"
        /><br />
      </div>
      <br />
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      // com: '',
      password: '',
      password2: '',
      name: '',
      phone: '',
      region: '',
      emailCheckResult: '',
      pwCheckResult: '',
      nicknameCheckResult: '',
      idDuplication: false,
      pwCompare: false,
      nicknameDuplication: false
    }
  },
  methods: {
    // 이메일 정규식 체크
    email_check (email) {
      const reg =
        /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i
      return reg.test(email)
    },
    // 아이디 중복 체크
    checkEmail (event) {
      let mesg = '사용 가능한 이메일입니다.'
      if (!this.email_check(this.email)) {
        alert('이메일 형식에 맞게 입력해주세요')
        event.preventDefault()
      } else {
          this.axios({
          url: '/api/checkEmail',
          method: 'POST',
          data: { email: this.email },
          responseType: 'json'
        })
          .then((response) => {
            if (response.data !== 1) {
              document.getElementById('emailCheckResult').setAttribute('style', 'color: blue')
              this.idDuplication = true
            } else if (response.data === 'error') {
              mesg = '에러'
              document.getElementById('emailCheckResult').setAttribute('style', 'color: red')
              this.idDuplication = false
            } else {
              mesg = '등록된 이메일입니다.'
              document.getElementById('emailCheckResult').setAttribute('style', 'color: red')
              this.idDuplication = false
            }
            this.emailCheckResult = mesg
          })
          .catch((error) => {
            console.log(error)
          })
      }
    },
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
    // 회원 가입 처리
    generalSignUp (event) {
      if (!this.email_check(this.email)) {
        alert('이메일 형식에 맞게 입력해주세요')
        event.preventDefault()
      } else if (this.idDuplication === false) {
        alert('아이디 중복검사를 해주세요')
        event.preventDefault()
      } else if (this.pwCompare === false) {
        alert('비밀번호가 일치하지 않습니다')
        event.preventDefault()
      } else if (this.nicknameDuplication === false) {
        alert('닉네임 중복검사를 해주세요')
        event.preventDefault()
      } else {
        this.axios({
        url: '/api/generalSignUp',
        method: 'POST',
        params: {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
          region: this.region
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
    // 인증 메일 전송
    // sendMail () {
    //   const url = '/api/sendMail'
    //   const data = {
    //     email: this.email
    //   }
    //   axios
    //     .post(url, data)
    //     .then((response) => {
    //       alert('인증메일이 전송되었습니다.')
    //       console.log(response.data)
    //     })
    //     .catch((error) => {
    //       console.log(error)
    //     })
    // }
  }
}
</script>
