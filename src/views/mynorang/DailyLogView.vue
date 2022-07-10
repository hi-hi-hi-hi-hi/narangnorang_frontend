<template>
    <div class="view">
        <SideBar />
        <div class="text-center">
            <DailyLogModal v-if="modal" @close="close" :datetime="datetime" :dailyLog="dailyLog" />
            <div>
                <router-link :to="{query: {year: year - 1, month: month}}" class="btn">▽</router-link>
                <b class="fs-4">{{year}}년</b>
                <router-link :to="{query: {year: year + 1, month: month}}" class="btn">△</router-link>
            </div>
            <div>
                <router-link v-if="month === 1" :to="{query: {year: year - 1, month: 12}}" class="btn">▽</router-link>
                <router-link v-else :to="{query: {year: year, month: month - 1}}" class="btn">▽</router-link>
                <b class="fs-4">{{month}}월</b>
                <router-link v-if="month === 12" :to="{query: {year: year + 1, month: 1}}" class="btn">△</router-link>
                <router-link v-else :to="{query: {year: year, month: month + 1}}" class="btn">△</router-link>
            </div>
            <table class="table table-bordered border mt-3">
                <tr>
                    <th width="100">일</th>
                    <th width="100">월</th>
                    <th width="100">화</th>
                    <th width="100">수</th>
                    <th width="100">목</th>
                    <th width="100">금</th>
                    <th width="100">토</th>
                </tr>
                <tr v-for="i in Math.ceil((start + end - 1) / 7)" :key="i">
                    <td v-for="j in 7" :key="j" @click="open(getDate(i, j))" height="80" class="align-top">
                        <div v-if="getDate(i, j) >= 1 && getDate(i, j) <= end">
                            <div>{{getDate(i, j)}}</div>
                            <div v-if="dailyLogCalendar[getIdx(i, j)] != null">
                                <div>
                                    <img src="@/assets/mynorang/sleep.png" width="20">
                                    <span>{{dailyLogCalendar[getIdx(i, j)].sleep}}</span>
                                </div>
                                <div v-if="dailyLogCalendar[getIdx(i, j)].medicine != null">
                                    <img v-if="dailyLogCalendar[getIdx(i, j)].medicine === 1" src="@/assets/mynorang/medicine.png" width="20">
                                    <span v-else-if="dailyLogCalendar[getIdx(i, j)].medicine === 0">X</span>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<style scoped>
    .text-center {
        width: 80%;
    }
    .view {
        display: grid;
        grid-template-columns: 300px 1200px;
        grid-gap: 30px;
        position: absolute;
        left: 10%;
    }
    a {
        text-decoration: none;
    }
</style>

<script>
import SideBar from '@/components/mynorang/SideBar'
import DailyLogModal from '@/components/mynorang/DailyLogModal'
export default {
    components: {
        SideBar,
        DailyLogModal
    },
    data () {
        return {
            year: 0,
            month: 0,
            start: 0,
            end: 0,
            dailyLogCalendar: [],
            modal: false,
            datetime: '',
            dailyLog: {}
        }
    },
    computed: {
        getDate () {
            return (i, j) => {
                return (i - 1) * 7 + j - (this.start - 1)
            }
        },
        getIdx () {
            return (i, j) => {
                return (i - 1) * 7 + j - (this.start - 1) - 1
            }
        }
    },
    methods: {
        getDailyLogCalendar () {
            this.axios({
                url: '/api' + this.$route.fullPath,
                method: 'get',
                responseType: 'json'
            }).then((response) => {
                this.year = response.data.year
                this.month = response.data.month
                this.start = response.data.start
                this.end = response.data.end
                this.dailyLogCalendar = response.data.dailyLogCalendar
                this.$store.commit('upToDate', true)
            })
        },
        open (date) {
            if (date < 1) {
                return
            }
            let month = String(this.month)
            if (month.length === 1) {
                month = '0' + month
            }
            date = String(date)
            if (date.length === 1) {
                date = '0' + date
            }
            const datetime = String(this.year) + '-' + month + '-' + date
            if (new Date() > new Date(datetime + 'T00:00:00')) {
                this.datetime = datetime
                this.dailyLog = this.dailyLogCalendar[date - 1]
                this.modal = true
            }
        },
        close () {
            this.modal = false
            this.getDailyLogCalendar()
        }
    },
    mounted () {
        this.getDailyLogCalendar()
    },
    watch: {
        '$route' (to, from) {
            this.getDailyLogCalendar()
        },
        '$store.state.upToDate': function () {
            if (!this.$store.getters.upToDate) {
			    this.getDailyLogCalendar()
            }
		}
    }
}
</script>
