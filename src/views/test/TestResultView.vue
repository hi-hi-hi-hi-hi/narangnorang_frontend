<template>
    <div v-if="getType === '1'">
        <div v-if="getResult < 16">
            <div>정상</div>
        </div>
        <div v-else-if="getResult < 21">
            <div>약간의 우울감</div>
        </div>
        <div v-else-if="getResult < 25">
            <div>심한 우울감</div>
        </div>
        <div v-else>
            <div>매우 심한 우울감</div>
        </div>
    </div>
    <div v-else-if="getType === '2'">
        <div v-if="getResult < 12">
            <div>정상적인 음주형태</div>
        </div>
        <div v-else-if="getResult < 15">
            <div>상습적 과음주자로 주의가 필요</div>
        </div>
        <div v-else-if="getResult < 20">
            <div>문제음주자로 적절한 조취가 필요</div>
        </div>
        <div v-else-if="getResult < 25">
            <div>전문가와 상담이 요구됨</div>
        </div>
        <div v-else>
            <div>알코올 중독자로 전문적 입원치료 및 상담필요</div>
        </div>
    </div>
    <div v-else-if="getType === '3'">
        <div v-if="getResult < 14">
            <div>정상범위로 유의한 수준의 스트레스가 시사되지 않습니다.</div>
        </div>
        <div v-else-if="getResult < 17">
            <div>약간의 스트레스를 받고 있으나 심각한 수준은 아닌 것으로 보입니다. 자신만의 스트레스 해소법을 찾아보는 것이 좋습니다.</div>
        </div>
        <div v-else-if="getResult < 19">
            <div>중간정도의 스트레스로, 스트레스 해소에 적극적인 노력이 필요합니다.</div>
        </div>
        <div v-else>
            <div>심한 스트레스로 일상생활에서 어려움을 겪고 있을 것으로 판단되며 전문가의 도움이 필요합니다.</div>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        getType () {
            return this.$route.params.type
        },
        getResult () {
            return Number(this.$route.params.result)
        }
    }
}
</script>
