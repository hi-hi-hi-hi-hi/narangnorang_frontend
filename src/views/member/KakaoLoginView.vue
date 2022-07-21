<template>
    <div>
        카카오 로그인 페이지
    </div>
</template>

<script>
export default {
    created () {
        this.create()
    },
    data () {
        return {
            codes: ''
        }
    },
    methods: {
        create () {
            this.codes = this.$route.query.code
            this.getKakaoToken()
        },
        getKakaoToken () {
            this.axios
            .get('http://localhost:8091/api/kakaologin?authorize_code=' + this.codes)
            .then((res) => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>
