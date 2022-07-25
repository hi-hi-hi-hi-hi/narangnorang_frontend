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
        if (res.data === '') {
          this.$router.push('/login')
        } else {
          if (confirm('가입된 계정이 없습니다. 카카오 회원가입을 진행하시겠습니까?')) {
            this.$router.push({ name: 'kakaoSignUp', params: { name: res.data.name, kakaoId: res.data.id } })
          } else {
            this.name = res.data.name
            this.kakaoId = res.data.id
            this.email = res.data.email
          }
        }
      })
    }
  }
}
</script>
