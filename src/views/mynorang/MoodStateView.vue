<template>
    <div class="view">
        <SideBar />
        <div>
            <h3>지난 일주일 간 기분 상태</h3>
            <svg></svg>
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
    svg {
        width: 800px;
        height: 400px;
    }
</style>

<script>
import SideBar from '@/components/mynorang/SideBar'
export default {
    components: {
        SideBar
    },
    methods: {
        draw (moodStateList) {
            const d3 = window.d3

            const data = moodStateList

            const now = new Date()
            const xEnd = new Date(now.getTime())
            now.setDate(now.getDate() - 7)
            const xStart = now
            const xScale = d3.scaleTime().domain([xStart, xEnd]).range([30, 730])
            const yScale = d3.scaleLinear().domain([0, 100]).range([330, 30])
            const xAxisSVG = d3.select('svg').append('g').attr('transform', 'translate(0, 330)')
            const yAxisSVG = d3.select('svg').append('g')
            const xAxis = d3.axisBottom(xScale).tickSize(3).ticks(7)
            const yAxis = d3.axisRight(yScale).tickSize(3).ticks(10)
            xAxis(xAxisSVG)
            yAxis(yAxisSVG)

            d3.select('svg')
            .selectAll('circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('r', 3)
            .attr('cx', d => xScale(new Date(d.datetime)))
            .attr('cy', d => yScale(d.state))
            .style('fill', 'black')

            const linearGenerator = d3.line().x(d => xScale(new Date(d.datetime))).y(d => yScale(d.state))

            d3.select('svg')
            .append('path')
            .attr('d', linearGenerator(data))
            .attr('fill', 'none')
            .attr('stroke-width', 1)
            .attr('stroke', 'black')
        },
        getMoodStateList () {
            this.axios({
                url: '/api' + this.$route.fullPath,
                method: 'get',
                responseType: 'json'
            }).then((response) => {
                this.draw(response.data)
                this.$store.commit('upToDate', true)
            })
        }
    },
    mounted () {
        this.getMoodStateList()
    },
    watch: {
        '$store.state.upToDate': function () {
            if (!this.$store.getters.upToDate) {
			    this.getMoodStateList()
            }
		}
    }
}
</script>
