<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="counselorSignUp">
        <h1 class="h3 mb-3 fw-normal"><b>상담사 회원가입</b></h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" required>
          <label for="email" class="">Email address</label>
          <span id="emailCheckResult">{{ emailCheckResult }}</span>
        </div>
        <br>
        <button type="button" class="btn btn-dark btn-id" @click="checkEmail">중복 체크</button>
        <button type="button" class="btn btn-dark" @click="sendMail">인증메일보내기</button><br>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="com" v-model="com" placeholder="인증확인" required>
          <label for="com" class="">인증확인</label>
          <span id="compare-text">{{ compareText }}</span>
        </div>
        <br>
        <button type="button" class="btn btn-dark" @click="compare">인증확인</button>
        <br>
        <div class="form-floating">
          <br>
          <input type="text" class="form-control" id="password" v-model="password" placeholder="Password" required>
          <label for="password" class="mt-4">Password</label>
        </div>
        <div class="form-floating">
          <input type="text" class="form-control" id="password2" @input="pwCheck" v-model="password2" placeholder="Password Check" required>
          <label for="password2" class="">Password Check</label>
          <span id="pwCheckResult">{{ pwCheckResult }}</span>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="name" v-model="name" placeholder="NAME" required>
          <label for="name" class="">이름</label>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="phone" v-model="phone" placeholder="휴대전화" required>
          <label for="phone" class="">휴대전화</label>
        </div>
        <hr>
        <br>
        <button type="button" class="btn btn-dark find-post" @click="execDaumPostcode">우편번호 찾기</button>
         <div class="form-floating">
          <input type="text" class="form-control" id="zipcode" v-model="zipcode" placeholder="zipcode" required>
          <label for="zipcode" class="">우편번호</label>
        </div>
         <div class="form-floating">
          <input type="text" class="form-control" id="address1" v-model="address1" placeholder="address1" required>
          <label for="address1" class="">도로명주소</label>
        </div>
         <div class="form-floating">
          <input type="text" class="form-control" id="address2" v-model="address2" placeholder="address2" required>
          <label for="address2" class="">지번주소</label>
        </div>
         <div class="form-floating">
          <input type="text" class="form-control" id="address3" v-model="address3" placeholder="address3" required>
          <label for="address3" class="">상세주소</label>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="job" v-model="job" placeholder="job" required>
          <label for="job" class="">직업</label>
        </div>
        <br>
        <div class="form-floating">
          <textarea rows="20" cols="40" class="form-control" id="introduction" v-model="introduction" placeholder="introduction" required />
          <label for="introduction" class="">소개</label>
        </div>
        <br>
        <button type="submit" class="w-100 btn btn-outline-dark btn-lg">회원가입</button>
      </form>
    </main>
  </body>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      com: '',
      password: '',
      password2: '',
      name: '',
      phone: '',
      zipcode: '',
      address1: '',
      address2: '',
      address3: '',
      job: '',
      introduction: '',
      emailCheckResult: '',
      pwCheckResult: '',
      idDuplication: false,
      pwCompare: false,
      compareText: '',
      key: '',
      isCertification: false
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
    // 회원 가입 처리
    counselorSignUp (event) {
      if (!this.email_check(this.email)) {
        alert('이메일 형식에 맞게 입력해주세요')
        event.preventDefault()
      } else if (this.idDuplication === false) {
        alert('아이디 중복검사를 해주세요')
        event.preventDefault()
      } else if (this.isCertification === false) {
        alert('인증 확인이 필요합니다')
        event.preventDefault()
      } else if (this.pwCompare === false) {
        alert('비밀번호가 일치하지 않습니다')
        event.preventDefault()
      } else {
        this.axios({
        url: '/api/counselorSignUp',
        method: 'POST',
        params: {
          email: this.email,
          password: this.password,
          name: this.name,
          phone: this.phone,
          zipcode: this.zipcode,
          address1: this.address1,
          address2: this.address2,
          address3: this.address3,
          job: this.job,
          introduction: this.introduction
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
    // 다음 지도
    execDaumPostcode () {
      new window.daum.Postcode({
        oncomplete: (data) => {
          // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
          // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
          // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
          const roadAddr = data.roadAddress // 도로명 주소 변수
          let extraRoadAddr = '' // 참고 항목 변수

          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== '' && /[동|로|가]$/g.test(data.bname)) {
            extraRoadAddr += data.bname
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== '' && data.apartment === 'Y') {
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName)
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraRoadAddr !== '') {
            extraRoadAddr = ' (' + extraRoadAddr + ')'
          }

          // 우편번호와 주소 정보를 해당 필드에 넣는다.
          this.zipcode = data.zonecode
          this.address1 = roadAddr
          this.address2 = data.jibunAddress
        }
      }).open()
    },
    // 인증 메일 전송
    sendMail (event) {
      const url = '/api/sendMail'
      const data = {
        email: this.email
      }
      if (this.idDuplication === false) {
        alert('아이디 중복검사를 해주세요.')
        event.preventDefault()
      } else {
        this.axios
        .post(url, data)
        .then((response) => {
          alert('인증메일이 전송되었습니다.')
          this.key = response.data
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
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
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: white;
}

span {
  color: blue;
}
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.find-post {
  margin-bottom: 10px;
}

.btn-id {
  margin-right: 10px;
}

.btn-lg {
  font-weight: bold;
}
</style>
