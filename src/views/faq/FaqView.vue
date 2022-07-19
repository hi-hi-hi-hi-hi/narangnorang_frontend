<template>
<div class="faq_area section_padding_130" id="faq">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-sm-8 col-lg-6">
                <div class="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style="visibility: visible; animation-delay: 0.2s; animation-name: fadeInUp;">
                    <h3><span>나랑노랑 FAQ</span></h3>
                    <p>나랑노랑 서비스에 대해 궁금했던 점을 확인해 보세요.</p>
                    <div class="line"></div>
                </div>
            </div>
        </div>
        <div class="row justify-content-center">
            <div class="col-12 col-sm-10 col-lg-8">
                <div class="accordion" id="accordionExample">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                      나랑노랑은 어떤 서비스인가요?
                    </button>
                  </h2>
                  <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <strong>나랑노랑은 챗봇을 활용한 멘탈 케어 서비스입니다. </strong>
                      매일 챗봇을 통해 수면 시간과 약 복용 여부, 기분 변화를 기록하여 자신의 상태를 확인할 수 있습니다.
                      커뮤니티를 통해 속마음을 털어 놓고, 간단한 테스트를 통해 자신의 상태를 확인해 볼 수도 있습니다.
                      가까운 상담센터를 찾고, 전문 상담사에게 쪽지로 상담 요청도 해 보세요.
                      포인트를 통해 아이템을 사고, 나만의 미니룸을 꾸며 보는 것도 잊지 마세요!
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTwo">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                      포인트는 어떻게 얻을 수 있나요?
                    </button>
                  </h2>
                  <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      <strong>포인트는 매일 챗봇 '노랑이'가 제공하는 챌린지를 완수하면 제공됩니다. </strong>
                      챌린지 내용을 확인하고 해당하는 사진을 찍어 노랑이에게 보내 주세요. 지급된 포인트로 미니룸을 꾸밀 수 있습니다!
                      챌린지를 통해 제출한 사진들은 마이노랑에서 앨범 형식으로 확인이 가능합니다.
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingThree">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                      노랑이와 나눈 대화 / 상담사와 나눈 쪽지 내용은 비밀이 보장되나요?
                    </button>
                  </h2>
                  <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                      나랑노랑에서 나눈 대화 내역은 나랑노랑이 안전하게 보관하겠습니다!
                    </div>
                  </div>
                </div>
              </div>
                <!-- Support Button-->
                <div class="support-button text-center d-flex align-items-center justify-content-center mt-4" style="visibility: visible;">
                    <p class="mb-0 px-2">충분한 답이 되지 못했다면, 추가 문의 사항을 메일로 보내 주세요. narangnorang5@gmail.com</p>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style scoped>
body{margin-top:20px;}
.section_padding_130 {
    padding-top: 130px;
    padding-bottom: 130px;
}
.faq_area {
    position: relative;
    z-index: 1;
    background-color: white;
    margin: auto;
}

.faq-accordian {
    position: relative;
    z-index: 1;
}
.faq-accordian .card {
    position: relative;
    z-index: 1;
    margin-bottom: 1.5rem;
}
.faq-accordian .card:last-child {
    margin-bottom: 0;
}
.faq-accordian .card .card-header {
    background-color: #ffffff;
    padding: 0;
    border-bottom-color: #ebebeb;
}
.faq-accordian .card .card-header h6 {
    cursor: pointer;
    padding: 1.75rem 2rem;
    color: #3f43fd;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -ms-grid-row-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
    justify-content: space-between;
}
.faq-accordian .card .card-header h6 span {
    font-size: 1.5rem;
}
.faq-accordian .card .card-header h6.collapsed {
    color: #070a57;
}
.faq-accordian .card .card-header h6.collapsed span {
    -webkit-transform: rotate(-180deg);
    transform: rotate(-180deg);
}
.faq-accordian .card .card-body {
    padding: 1.75rem 2rem;
}
.faq-accordian .card .card-body p:last-child {
    margin-bottom: 0;
}

@media only screen and (max-width: 575px) {
    .support-button p {
        font-size: 14px;
    }
}

.support-button i {
    color: #3f43fd;
    font-size: 1.25rem;
}
@media only screen and (max-width: 575px) {
    .support-button i {
        font-size: 1rem;
    }
}

.support-button a {
    text-transform: capitalize;
    color: #2ecc71;
}
@media only screen and (max-width: 575px) {
    .support-button a {
        font-size: 13px;
    }
}
</style>
