<template>
    <div class="view">
        <SideBar />
        <div class="container">
            <div class="row">
                <div v-for="(testResult, i) in testResultList" :key="i" class="col-auto m-2">
                    <div class="card">
                        <img :src="getImgSrc(testResult.type)" class="card-img-top">
                        <div class="card-body">
                            <h5 v-if="type === 1" class="card-title">우울증</h5>
                            <h5 v-else-if="type === 2" class="card-title">스트레스</h5>
                            <h5 v-else-if="type === 3" class="card-title">중독</h5>
                            <p class="card-text">{{testResult.datetime}}</p>
                            <router-link :to="getUrl(testResult.type, testResult.result)" class="btn btn-outline-dark">결과 보기</router-link>
                        </div>
                    </div>
                </div>
                <div v-if="testResultList.length == 0" class="col-auto m-2">테스트를 먼저 진행해주세요</div>
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
            testResultList: []
        }
    },
    computed: {
        getImgSrc () {
            return (type) => {
                return require('@/assets/test/type' + type + '.jpg')
            }
        },
        getUrl () {
            return (type, result) => {
                return '/test/' + type + '/' + result
            }
        }
    },
    methods: {
        getTestResultList () {
            this.axios({
                url: '/api/mynorang/testresult',
                method: 'get',
                responseType: 'json'
            }).then((response) => {
                this.testResultList = response.data
            })
        }
    },
    mounted () {
        this.getTestResultList()
    }
}
</script>
