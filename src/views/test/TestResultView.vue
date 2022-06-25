<template>
    <div class="w-50 mx-auto text-center">
        <h4><strong>{{result}}점</strong></h4>
        <div v-if="type === 1">
            <div v-if="result < 16">
                <img :src="getImgSrc(1)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>정상</h5>
                <p>
                    편안한 상태입니다.
                    일상적인 생활을 적절히 경험하고 있고, 큰 어려움이 없다고 볼 수 있겠습니다.
                    지속적으로 정신건강에 관심을 갖고, 예방을 위해 년1회 정기검사도 잊지 마세요.
                </p>
            </div>
            <div v-else-if="result < 25">
                <img :src="getImgSrc(2)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>약간의 우울감</h5>
                <p>
                    약간의 우울감을 겪고 있는 상태입니다.
                    우선 우울한 감정에 너무 신경쓰지 말고, 매사에 가볍게 생각하고 당연하게 받아들이는 자세가 필요합니다.
                    친구를 만나서 대화를 나누거나 운동을 하거나 좋아하는 취미활동은 우울한 감정 완화에 도움이 될 수 있습니다.
                    우울증 예방을 위해 운동, 여가활동, 대인관계 맺기 등 즐거움을 주는 활동에 적극적으로 참여해보세요.
                </p>
            </div>
            <div v-else>
                <img :src="getImgSrc(4)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>심한 우울감</h5>
                <p>
                    다양한 우울증상으로 일상생활에 영향을 주고 있는 상태입니다.
                    현재 에너지 수준이 매우 저하되어 있고 무기력하며,
                    쉽게 잠을 이루지 못하거나, 반대로 과도하게 많은 잠을 자는 상태일 것으로 보입니다.
                    신체활동과 외부활동을 더 많이 늘리고 집에 혼자있는 시간을 피하며,
                    가족과 친구들의 대화와 스킨십을 많이 갖는 것이 필요합니다.
                    우울감은 감기처럼 누구에게나 올 수 있고, 시간이 지나면 사라질 수 있습니다.
                    그러나 이러한 상태가 2주 이상 지속된다면 전문가와의 상담을 반드시 받아보세요.
                </p>
            </div>
        </div>
        <div v-else-if="type === 2">
            <div v-if="result < 10">
                <img :src="getImgSrc(1)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>적정음주군</h5>
                <p>
                    당신의 음주는 정상 수준으로 바람직한 음주를 하고 있습니다.
                    지금과 같은 음주습관을 유지하시되, 건강 음주 지침을 지켜주세요.
                </p>
            </div>
            <div v-else-if="result < 20">
                <img :src="getImgSrc(3)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>위험음주군</h5>
                <p>
                    당신의 음주는 위험한 수준입니다.
                    지금 당장은 많은 문제가 없을지라도 습관적인 과음으로 인해 심각한 문제가 발생할 수 있습니다.
                    적정음주군에서 권고하는 음주 기준을 지키고, 주기적으로 음주 행동을 점검하세요.
                    잠재적 알코올 사용장애 환자로 스스로 절제하는 방법을 마련하거나,
                    정신건강복지센터 또는 전문의의 조언을 받으러 가는 것을 추천합니다.
                </p>
            </div>
            <div v-else>
                <img :src="getImgSrc(4)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>알코올 사용장애 추정군(고위험군)</h5>
                <p>
                    알코올 중독자로 전문적 입원치료 및 상담이 필요합니다.
                    음주량과 음주 횟수 조절이 어려운 상태이며 술을 줄이는 단계가 아니라 끊어야 합니다.
                    전문 병ㆍ의원이나 알코올상담센터 혹은 전문상담기관을 통해 도움을 받아보세요.
                </p>
            </div>
        </div>
        <div v-else-if="type === 3">
            <div v-if="result < 14">
                <img :src="getImgSrc(1)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>정상</h5>
                <p>
                    당신이 느끼고 있는 스트레스 정도는 정상적인 수준으로,
                    심리적으로 안정되어 있습니다.
                </p>
            </div>
            <div v-else-if="result < 17">
                <img :src="getImgSrc(2)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>경도의 스트레스</h5>
                <p>
                    약간의 스트레스를 받고 계신 것으로 보입니다.
                    스트레스를 해소하기 위해 운동이나 가벼운 산책, 명상 등
                    자신만의 스트레스 해소법을 찾아보는 것이 좋겠습니다.
                </p>
            </div>
            <div v-else-if="result < 19">
                <img :src="getImgSrc(3)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>중등도의 스트레스</h5>
                <p>
                    중간 정도의 스트레스를 받고 있는 것으로 보입니다.
                    스트레스를 해소하기 위해 적극적인 노력을 하실 필요가 있으며,
                    원하신다면 전문가에게 도움을 요청해 보십시오.
                </p>
            </div>
            <div v-else>
                <img :src="getImgSrc(4)" class="w-50 rounded-circle mx-auto my-3 d-block">
                <h5>심한 스트레스</h5>
                <p>
                    심한 스트레스를 받고 있는 것으로 나타나고 있어,
                    일상생활에서 어려움을 겪고 있을 가능성이 높아 보입니다.
                    상담센터에 방문하시어 추가적인 검사를 받아보시거나,
                    전문가와 자신의 상태에 대해 이야기해 볼 것을 권합니다.
                </p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            type: Number(this.$route.params.type),
            result: Number(this.$route.params.result)
        }
    },
    computed: {
        getImgSrc () {
            return (result) => {
                return require('@/assets/test/result' + result + '.jpg')
            }
        }
    }
}
</script>
