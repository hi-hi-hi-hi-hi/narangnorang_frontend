<template>
    <div>
        <div>
            <div style="height: 30px;">
                <div class="progress-bar"></div>
            </div>
            <img :src="getImgSrc" style="width: 18rem;" />
            <div v-for="(qna, i) in qnaList" :key="i" v-show="i === idx">
                <div class="question">
                    <h5>{{qna.question}}</h5>
                </div>
                <div class="answer">
                    <div v-for="(answer, j) in qna.answer" :key="j">
                        <div @click="select(i, answer.value)">{{answer.text}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import qnaList1 from '@/components/test/qnaList1'
import qnaList2 from '@/components/test/qnaList2'
import qnaList3 from '@/components/test/qnaList3'
export default {
    data () {
        return {
            qnaList: [],
            selectList: [],
            idx: 0
        }
    },
    methods: {
        setQnaList () {
            switch (this.$route.params.type) {
            case '1':
                this.qnaList = qnaList1
                break
            case '2':
                this.qnaList = qnaList2
                break
            case '3':
                this.qnaList = qnaList3
                break
            }
        },
        select (idx, option) {
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
                url: '/api/test/' + this.$route.params.type + '/' + result,
                method: 'post',
                params: { type: this.$route.params.type, result: result },
                responseType: 'json'
            }).then((response) => {
                if (response.data.flag === true) {
                    this.$router.push('/test/' + this.$route.params.type + '/' + result)
                }
            })
        }
    },
    mounted () {
        this.setQnaList()
    },
    computed: {
        getImgSrc () {
            return require('@/assets/test/type' + this.$route.params.type + '.jpg')
        }
    }
}
</script>
