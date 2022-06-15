<template>
  <div class="signUp">
    <form action="/narangnorang/generalSignUp" method="post">
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
        <button type="button" @click="sendMail">인증메일보내기</button><br />
        <span id="emailCheckResult"></span
        ><br />
      </div>
      <div>
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
      </div>
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
          placeholder="CONFIRM PASSWORD"
          required="required"
        /><br />
        <span id="pwCheckResult" style="color: blue"></span><br />
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
        <span id="nicknameCheckResult" style="color: blue"></span><br />
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
import axios from 'axios'

export default {
  name: 'generalSignUp',
  data () {
    return {
      email: '',
      com: '',
      password: '',
      password2: '',
      name: '',
      phone: '',
      region: ''
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
      const url = '/checkEmail'
      const data = {
        email: this.email
      }
      if (!this.email_check(this.email)) {
        alert('이메일 형식에 맞게 입력해주세요')
        event.preventDefault()
      } else {
        axios
          .post(url, data)
          .then(function (response) {
            if (response.data !== 1) {
              document.getElementById('emailCheckResult').innerText = mesg
            } else if (response.data === 'error') {
              mesg = '에러'

              document.getElementById('emailCheckResult').innerText = mesg
            } else {
              mesg = '등록된 이메일입니다.'

              document.getElementById('emailCheckResult').innerText = mesg
            }
          })
          .catch(function (error) {
            console.log(error)
          })
      }
    },
    sendMail () {
      const url = '/sendMail'
      const data = {
        email: this.email
      }
      axios
        .post(url, data)
        .then(function (response) {
          alert('인증메일이 전송되었습니다.')
          console.log(response.data)
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    checkName () {}
  }
}

</script>
