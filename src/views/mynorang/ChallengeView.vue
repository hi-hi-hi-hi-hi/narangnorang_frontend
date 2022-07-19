<template>
    <div class="view">
        <SideBar />
        <div class="container">
            <div class="row">
                <div v-for="(challenge, i) in challengeList" :key="i" class="col-auto m-2" >
                    <div class="card">
                        <img :src="getImgSrc(challenge.memberId, challenge.datetime)" class="card-img-top">
                        <div class="card-body">
                            <h5 class="card-title">{{challenge.title}}</h5>
                            <p class="card-text">{{challenge.datetime}}</p>
                        </div>
                    </div>
                </div>
                <div v-if="challengeList.length == 0" class="col-auto m-2">챌린지를 먼저 진행해주세요</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .view {
        display: grid;
        grid-template-columns: 300px 1200px;
        grid-gap: 30px;
        position: absolute;
        left: 10%;
    }
    .card {
        width: 15rem;
    }
    .card-img-top {
        height: 10rem;
    }
</style>

<script>
import SideBar from '@/components/mynorang/SideBar'
export default {
    components: {
        SideBar
    },
    data () {
        return {
            challengeList: []
        }
    },
    computed: {
        getImgSrc () {
            return (memberId, datetime) => {
                return '/webapp/resources/images/challenge/' + memberId + '_' + datetime + '.png'
            }
        }
    },
    methods: {
        getChallengeList () {
            this.axios({
                url: '/api/mynorang/challenge',
                method: 'get',
                responseType: 'json'
            }).then((response) => {
                this.challengeList = response.data
                this.$store.commit('upToDate', true)
            })
        }
    },
    created () {
        this.getChallengeList()
    },
    watch: {
        '$store.state.upToDate': function () {
            if (!this.$store.getters.upToDate) {
			    this.getChallengeList()
            }
		}
    }
}
</script>
