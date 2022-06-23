<template>
  <body class="text-center">
    <main class="form-signin w-100 m-auto">
      <form @submit.prevent="counselorEdit">
        <h1 class="h3 mb-3 fw-normal"><b>내 정보 수정</b></h1>
        <div class="form-floating">
          <input type="email" class="form-control" id="email" v-model="email" placeholder="Email" readonly>
          <label for="email" class="">Email address</label>
        </div>
        <br>
        <div class="form-floating">
          <input type="text" class="form-control" id="name" v-model="name" placeholder="NAME" readonly>
          <label for="name">NAME</label>
        </div>
        <br>
        <div class="form-floating">
          <br>
          <input type="text" class="form-control" id="phone" v-model="phone" placeholder="-제외 번호" required>
          <label for="phone" class="mt-4">휴대전화</label>
        </div>
        <br>
        <button type="button" class="btn btn-dark post-btn" @click="execDaumPostcode">우편번호 찾기</button>
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
      phone: '',
      zipcode: '',
      address1: '',
      address2: '',
      address3: '',
      job: '',
      introduction: ''
    }
  },
  methods: {
    // submit
    counselorEdit (event) {
      if (confirm('정보를 수정하시겠습니까?')) {
        this.axios({
          url: '/api/counselorEdit',
          method: 'PUT',
          data: {
            email: this.email,
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
          alert('정보가 수정되었습니다.')
          this.$router.push('/home')
        })
        .catch((error) => {
          console.log(error)
        })
      } else {
        event.preventDefault()
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
          this.zipcode = data.zonecode
          this.address1 = roadAddr
          this.address2 = data.jibunAddress
        }
      }).open()
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
      this.phone = response.data.phone
      this.zipcode = response.data.zipcode
      this.address1 = response.data.address1
      this.address2 = response.data.address2
      this.address3 = response.data.address3
      this.job = response.data.job
      this.introduction = response.data.introduction
    })
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

.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.post-btn {
  margin-bottom: 10px;
}
</style>
