<template>
    <div>
        네이버 로그인 페이지
    </div>
</template>

<script>
export default {
    mounted () {
        this.create()
    },
    data () {
        return {
            codes: ''
        }
    },
    methods: {
        create () {
            console.log(this.$route.hash.slice(14))
            this.codes = this.$route.hash.slice(14)
            this.getNaverToken()
        },
        getNaverToken () {
            this.axios
            .get('http://localhost:8091/api/naverLogin?access_token=' + this.codes)
            .then((res) => {
                console.log(res)
            })
        }
    }
}
</script>

<style>

</style>
