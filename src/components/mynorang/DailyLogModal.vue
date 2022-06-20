<template>
    <div class="black-bg">
        <div class="white-bg">
            <button type="button" @click="close">닫기</button>
            <div>{{datetime}}</div>
            <div>
                잠 : <input type="number" v-model="sleep" min="0" max="24" required="required">
            </div>
            <div>
                약 :
                <input type="radio" v-model="medicine" value="0">X
                <input type="radio" v-model="medicine" value="1">
                <img src="@/assets/mynorang/medicine.png" width="20">
            </div>
            <div v-if="dailyLog">
                <button type="button" @click="putDailyLog">수정</button>
                <button type="button" @click="deleteDailyLog">삭제</button>
            </div>
            <div v-else>
                <button type="button" @click="postDailyLog">저장</button>
            </div>
        </div>
    </div>
</template>

<style scope>
    body {
        margin : 0;
    }
    div {
        box-sizing: border-box;
    }
    .black-bg {
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.5);
        padding: 20px;
        position: fixed;
    }
    .white-bg {
        width: 100%;
        background: white;
        padding: 20px;
        border-radius: 8px;
    }
</style>

<script>
export default {
    data () {
        return {
            sleep: 0,
            medicine: null
        }
    },
    props: {
        datetime: String,
        dailyLog: Object
    },
    methods: {
        close () {
            this.$emit('close')
        },
        putDailyLog () {
            this.axios({
                url: '/api/mynorang/dailylog/' + this.datetime,
                method: 'put',
                data: {
                    sleep: this.sleep,
                    medicine: this.medicine
                },
                responseType: 'json'
            }).then((response) => {
                this.close()
            })
        },
        deleteDailyLog () {
            this.axios({
                url: '/api/mynorang/dailylog/' + this.datetime,
                method: 'delete',
                data: {},
                responseType: 'json'
            }).then((response) => {
                this.close()
            })
        },
        postDailyLog () {
            this.axios({
                url: '/api/mynorang/dailylog',
                method: 'post',
                data: {
                    datetime: this.datetime,
                    sleep: this.sleep,
                    medicine: this.medicine
                },
                responseType: 'json'
            }).then((response) => {
                this.close()
            })
        }
    },
    mounted () {
        if (this.dailyLog) {
            this.sleep = this.dailyLog.sleep
            this.medicine = this.dailyLog.medicine
        }
    }
}
</script>
