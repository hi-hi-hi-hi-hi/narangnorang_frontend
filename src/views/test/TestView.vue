<template>
    <div class="w-50 mx-auto">
        <div class="progress my-5">
            <div class="progress-bar" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        <img :src="getImgSrc" class="w-50 rounded-circle mx-auto my-5 d-block">
        <div v-for="(qna, i) in qnaList" :key="i" v-show="i === idx">
            <div class="question text-center">
                <h5>{{qna.question}}</h5>
            </div>
            <div v-for="(answer, j) in qna.answer" :key="j" class="answer btn btn-outline-dark d-grid gap-2 col-6 mx-auto my-3">
                <div @click="select(i, answer.value)">{{answer.text}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .progress.my-5 {
        height: 30px;
    }
</style>

<script>
import qnaList1 from '@/components/test/qnaList1'
import qnaList2 from '@/components/test/qnaList2'
import qnaList3 from '@/components/test/qnaList3'
export default {
    data () {
        return {
            qnaList: [],
            selectList: [],
            idx: 0,
            type: Number(this.$route.params.type)
        }
    },
    computed: {
        getImgSrc () {
            return require('@/assets/test/type' + this.type + '.jpg')
        }
    },
    methods: {
        setQnaList () {
            switch (this.type) {
            case 1:
                this.qnaList = qnaList1
                break
            case 2:
                this.qnaList = qnaList2
                break
            case 3:
                this.qnaList = qnaList3
                break
            }
        },
        select (idx, option) {
            /* ----------코드 개선 필요함---------- */
            const progressBar = document.querySelector('.progress-bar')
	        progressBar.style.width = (idx + 1) / this.qnaList.length * 100 + '%'
            /* ----------------------------------- */
            this.selectList[idx] = option
            if (idx + 1 < this.qnaList.length) {
                this.idx = idx + 1
            } else {
                this.goResult()
            }
        },
        goResult () {
            let result = 0
            for (let i = 0; i < this.qnaList.length; i++) {
                result += this.selectList[i]
            }
            this.axios({
                url: '/api/test/' + this.type + '/' + result,
                method: 'post',
                responseType: 'json'
            }).then((response) => {
                if (response.data.flag === true) {
                    this.$router.push('/test/' + this.type + '/' + result)
                }
            })
        }
    },
    mounted () {
        this.setQnaList()
    }
}
</script>
