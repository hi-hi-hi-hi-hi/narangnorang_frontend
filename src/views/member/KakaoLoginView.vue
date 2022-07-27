<script>
export default {
    created () {
    this.create()
  },
  data () {
    return {
        code: '',
        name: '',
        email: '',
        kakaoId: ''
    }
  },
  methods: {
    create () {
      this.codes = this.$route.query.code
      this.getKakaoToken()
    },
    getKakaoToken () {
      this.axios.get('http://localhost:8091/api/kakaologin?code=' + this.codes)
      .then((res) => {
        if (res.data.result === 0) {
          // 회원가입 되어있지 않은 경우
          console.log('회원 없음')
        } else {
          // 회원가입 되어있는 경우
          this.axios({
            url: '/api/login',
            method: 'post',
            params: { email: res.data.memberDTO.email, password: res.data.memberDTO.password },
            responseType: 'json'
          }).then((response) => {
            if (response.data !== '') {
              this.$store.commit('member', response.data)
              this.$router.push('/home')
            }
          })
        }
        // if (res.data === '') {

        //   this.axios({
        //     url: '/api/login',
        //     method: 'post',
        //     params: { email: this.email, password: this.password },
        //     responseType: 'json'
        //   }).then((response) => {
        //     if (response.data !== '') {
        //       this.$store.commit('member', response.data)
        //       if (response.data.privilege === 0) {
        //         this.$router.push('/admin')
        //       } else {
        //         this.$router.push('/home')
        //       }
        //     } else {
        //       alert('이메일 및 비밀번호를 확인해주세요')
        //     }
        //   })
        //   this.$router.push('/home')
        // } else {
        //   if (confirm('가입된 계정이 없습니다. 카카오 회원가입을 진행하시겠습니까?')) {
        //     this.$router.push({ name: 'kakaoSignUp', params: { name: res.data.name, kakaoId: res.data.id } })
        //   } else {
        //     this.$router.push('/login')
        //   }
        // }
      })
    }
  }
}
</script>
