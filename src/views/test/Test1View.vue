<template>
    <div>
        <div>
            <div style="height: 30px;">
                <div class="progress-bar"></div>
            </div>
            <img src="../../assets/test/1.jpg" style="width: 18rem;" />
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
import qnaList from '../../components/test/qnaList1'
import axios from 'axios'
export default {
    data () {
        return {
            idx: 0,
            qnaList: qnaList,
            selectList: []
        }
    },
    methods: {
        select (idx, option) {
            this.selectList[idx] = option
            if (idx + 1 < qnaList.length) {
                this.idx = idx + 1
            } else {
                this.goResult()
            }
        },
        goResult () {
            let result = 0
            for (let i = 0; i < qnaList.length; i++) {
                result += this.selectList[i]
            }
            axios({
                url: '/api/test/1/' + result,
                method: 'post',
                params: { type: 1, result: result },
                responseType: 'json'
            }).then((response) => {
                console.log(response)
                if (response.data.flag === true) {
                    this.$router.push('/test/1/' + result)
                }
            })
        }
    }
}
</script>
