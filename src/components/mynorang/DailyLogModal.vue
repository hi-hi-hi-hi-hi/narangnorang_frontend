<template>
    <div class="black-bg" @click="close">
        <div class="white-bg text-center">
            <div><b class="fs-5">{{datetime}}</b></div>
            <hr>
            <div class="my-3">
                잠 : <input type="number" v-model="sleep" min="0" max="24" required="required">
            </div>
            <div class="my-3">
                약 :
                <input type="radio" v-model="medicine" value="0">X
                <input type="radio" v-model="medicine" value="1">
                <img src="@/assets/mynorang/medicine.png" width="20">
            </div>
            <hr>
            <div v-if="dailyLog" class="m">
                <button type="button" @click="putDailyLog" class="btn btn-outline-dark mx-3">수정</button>
                <button type="button" @click="deleteDailyLog" class="btn btn-outline-dark mx-3">삭제</button>
            </div>
            <div v-else>
                <button type="button" @click="postDailyLog" class="btn btn-outline-dark">저장</button>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .black-bg {
        position: fixed;
        top: 0; left: 0;
        width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.05);
        z-index: 3;
    }
    .white-bg {
        position: fixed;
        top: 50%; left: 50%;
        -webkit-transform: translate(-50%, -50%);
        -moz-transform: translate(-50%, -50%);
        -ms-transform: translate(-50%, -50%);
        -o-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
        width: 20%; height: 33%;
        padding: 20px;
        border-radius: 10px;
        background: white;
    }
</style>

<script>
export default {
    props: {
        datetime: String,
        dailyLog: Object
    },
    data () {
        return {
            sleep: 0,
            medicine: null
        }
    },
    methods: {
        close (event) {
            if (event.target.className === 'black-bg') {
                this.$emit('close')
			}
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
                this.$emit('close')
            })
        },
        deleteDailyLog () {
            this.axios({
                url: '/api/mynorang/dailylog/' + this.datetime,
                method: 'delete',
                data: {},
                responseType: 'json'
            }).then((response) => {
                this.$emit('close')
            })
        },
        postDailyLog () {
            if (this.sleep < 0 || this.sleep > 24 || !Number.isInteger(this.sleep)) {
                alert('0 이상 24 이하의 자연수로 입력해주세요')
                return
            }
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
                this.$emit('close')
            })
        }
    },
    created () {
        if (this.dailyLog) {
            this.sleep = this.dailyLog.sleep
            this.medicine = this.dailyLog.medicine
        }
    }
}
</script>
