<template>
  <div class="findPw">
    <form @submit.prevent="myPage">
      <p>정보를 안전하게 보호하기 위하여 비밀번호를 다시 확인 합니다.</p>
      <div>
        이메일
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
  name: 'myPage',
  data () {
    return {
      password: ''
    }
  },
  methods: {
    findPw () {

    }
  }
}

</script>
