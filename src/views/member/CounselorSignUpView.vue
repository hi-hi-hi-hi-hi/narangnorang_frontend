<template>
  <div class="signUp">
    <form @submit.prevent="counselorSignUp">
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
        <span id="emailCheckResult" style="color: blue"></span
        ><br />
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
        <span id="pwCheckResult" style="color: blue"></span><br />
      </div>
      <div>
        <label for="name">이름</label>
        <input
          type="text"
          id="name"
          v-model="name"
          placeholder="NAME"
          required="required"
        />
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
        <label for="address">근무지 주소</label>
        <div id="address">
          <input type="text" id="postcode" v-model="postcode" placeholder="우편번호" required="required">
		      <button type="button" @click="execDaumPostcode">우편번호 찾기</button><br>
		      <input type="text" id="address1" v-model="address1" placeholder="도로명주소" required="required">
		      <input type="text" id="address2" v-model="address2" placeholder="지번주소" required="required"><br>
		      <input type="text" id="address3" v-model="address3" placeholder="상세주소" required="required"><br>
		      <input type="hidden" id="guide" style="color:#999"><br>
        </div>
      </div>
      <div>
        <label for="job">직업</label>
        <input
          type="text"
          id="job"
          v-model="job"
          placeholder="job"
          required="required"
        /><br />
      </div>
      <div>
        <label for="introduction">소개</label><br>
        <textarea
          rows="20"
          cols="40"
          id="introduction"
          v-model="introduction"
          placeholder="introduction"
          required="required"
        /><br />
      </div>
      <button type="submit">회원가입</button>
    </form>
  </div>
</template>

<script>

let idDuplication = false
let pwCompare = false

export default {
  name: 'counselorSignUp',
  data () {
    return {
      email: '',
      // com: '',
      password: '',
      password2: '',
      name: '',
      phone: '',
      postcode: '',
      address1: '',
      address2: '',
      address3: '',
      job: '',
      introduction: ''
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
          params: { email: this.email }
        })
          .then(function (response) {
            if (response.data !== 1) {
              document.getElementById('emailCheckResult').setAttribute('style', 'color: blue')
              document.getElementById('emailCheckResult').innerText = mesg
              idDuplication = true
            } else if (response.data === 'error') {
              mesg = '에러'
              document.getElementById('emailCheckResult').setAttribute('style', 'color: red')
              document.getElementById('emailCheckResult').innerText = mesg
              idDuplication = false
            } else {
              mesg = '등록된 이메일입니다.'
              document.getElementById('emailCheckResult').setAttribute('style', 'color: red')
              document.getElementById('emailCheckResult').innerText = mesg
              idDuplication = false
            }
          })
          .catch(function (error) {
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
        pwCompare = false
      } else {
        document.getElementById('pwCheckResult').setAttribute('style', 'color: blue')
        pwCompare = true
      }
      document.getElementById('pwCheckResult').innerText = mesg
    },
    // 회원 가입 처리
    counselorSignUp (event) {
      if (!this.email_check(this.email)) {
        alert('이메일 형식에 맞게 입력해주세요')
        event.preventDefault()
      } else if (idDuplication === false) {
        alert('아이디 중복검사를 해주세요')
        event.preventDefault()
      } else if (pwCompare === false) {
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
          postcode: this.postcode,
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
          // document.getElementById('postcode').value = data.zonecode
          // document.getElementById('address1').value = roadAddr
          // document.getElementById('address2').value = data.jibunAddress
          this.postcode = data.zonecode
          this.address1 = roadAddr
          this.address2 = data.jibunAddress
        }
      }).open()
    }
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
  }
}

</script>
