<template>
        <!-- Masthead-->
        <header class="masthead">
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                  <div class="text-center">
                    <img class="img-fluid" src="@/assets/common/logo.png" alt="..." width="600" > <br>
                      <router-link class="btn btn-outline-dark btn-lg" to="/login">시작하기</router-link>
                    </div>
                </div>
            </div>
        </header>
        <!-- About-->
        <section class="about-section text-center" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="mb-4"><b class="secondary-title">노랑이의 마음 케어 서비스 !</b></h2>
                        <p class="text-black-50">
                            나랑노랑은 챗봇을 활용한 멘탈 케어 서비스입니다.<br>
                            매일 관심을 가져주는 새로운 친구 챗봇 노랑이를 통해 수면 시간과 약 복용 여부, 기분 변화를 기록하여 자신의 상태를 확인할 수 있습니다.
                            또, 커뮤니티를 통해 속마음을 털어 놓고, 간단한 테스트를 통해 자신의 상태를 확인해 볼 수도 있습니다.
                        </p>
                    </div>
                </div>
                <img class="img-fluid img-title" src="@/assets/common/norang.png">
            </div>
        </section>
        <!-- Projects-->
        <section class="projects-section bg-light" id="projects">
            <div class="container px-4 px-lg-5">
                <!-- Featured Project Row-->
                <div class="row gx-0 mb-4 mb-lg-5 align-items-center">
                    <div class="col-xl-8 col-lg-7 img-box">
                    <img class="img-fluid mb-3 mb-lg-0 img-up" src="@/assets/main/miniroom2.png" width="600px">
                    <div>
                    <img class="img-fluid mb-3 mb-lg-0 img-dn" src="@/assets/main/miniroom1.png" width="600px">
                    </div>
                    </div>
                    <div class="col-xl-4 col-lg-5">
                        <div class="featured-text text-center text-lg-left">
                            <h4><b class="secondary-title">미니룸</b></h4>
                            <p class="text-black-50 mb-0">매일 랜덤으로 주어지는 깜짝 챌린지를 통해 포인트를 얻고 나만의 미니룸을 꾸며보세요! 하나하나 채워지는 가구들을 보며 뿌듯함을 느껴보세요.</p>
                        </div>
                    </div>
                </div>
                <!-- Project 1 Row-->
                <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                    <div class="col-lg-6"><img class="img-fluid" src="@/assets/main/counselorCard.png"></div>
                    <div class="col-lg-6">
                        <div class="text-center h-100 project">
                            <div class="d-flex h-100 shadow">
                                <div class="project-text w-100 my-auto text-center text-lg-left ">
                                    <h4 class="text-white"><b>검증된 전문가</b></h4>
                                    <p class="mb-0 text-white-50">나랑노랑의 심사를 통해 검증된 전문가들에게 쪽지 상담을 받아보세요. 직접 찾아가고 전화하기 부담스러우신 분들도 쉽게 상담받을 수 있습니다.</p>
                                    <hr class="d-none d-lg-block mb-0 ms-0" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Project 2 Row-->
                <div class="row gx-0 justify-content-center">
                    <div class="col-lg-6"><img class="img-fluid" src="@/assets/main/dayData.png" alt="..." ></div>
                    <div class="col-lg-6 order-lg-first">
                        <div class="text-center h-100 project">
                            <div class="d-flex h-100 shadow">
                                <div class="project-text w-100 my-auto text-center text-lg-right">
                                    <h4 class="text-white"><b>매일 체크하는 일기</b></h4>
                                    <p class="mb-0 text-white-50">하루하루 채워지는 달력과 감정 그래프를 통해 나의 상태를 보다 잘 기록합니다. 챌린지를 채워지는 나만의 앨범도 꼭 확인해보세요!</p>
                                    <hr class="d-none d-lg-block mb-0 me-0" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Project 3 Row-->
                <div class="row gx-0 mb-5 mb-lg-0 justify-content-center">
                    <div class="col-lg-6"><img class="img-fluid" src="@/assets/main/community.png"></div>
                    <div class="col-lg-6">
                        <div class="text-center h-100 project">
                            <div class="d-flex h-100 shadow">
                                <div class="project-text w-100 my-auto text-center text-lg-left ">
                                    <h4 class="text-white"><b>소통하는 커뮤니티</b></h4>
                                    <p class="mb-0 text-white-50">나의 속마음을 터놓고 다양한 사람들과 소통할 수 있는 커뮤니티 기능을 제공합니다. 자유롭게 나의 생각을 표현하세요.</p>
                                    <hr class="d-none d-lg-block mb-0 ms-0" >
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Contact-->
        <section class="contact-section">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5">
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100 social">
                            <div class="card-body text-center">
                                <i class="fab fa-github"></i>
                                <h4 class="text-uppercase m-0">github</h4>
                                <hr class="my-4 mx-auto" >
                                <div class="small text-black-50"><a href="https://github.com/hi-hi-hi-hi-hi">hi-hi-hi-hi-hi</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100 social">
                            <div class="card-body text-center">
                                <i class="fas fa-envelope"></i>
                                <h4 class="text-uppercase m-0">Email</h4>
                                <hr class="my-4 mx-auto" >
                                <div class="small text-black-50"><a href="#!">narangnorang5@gmail.com</a></div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 mb-3 mb-md-0">
                        <div class="card py-4 h-100 social">
                            <div class="card-body text-center">
                                <i class="fa-solid fa-people-group"></i>
                                <h4 class="text-uppercase m-0">Team</h4>
                                <hr class="my-4 mx-auto" >
                                <div class="small text-black-50"><a href="#!">Hi5</a></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <div class="btn-down"><a href="#">
        <i class="fa-solid fa-angle-up fa-2xl"></i></a></div>
        <!-- Footer-->
        <footer class="footer small text-center text-white-50"><div class="container px-4 px-lg-5">Copyright &copy; Your Website 2022</div></footer>
        <!-- Bootstrap core JS-->
</template>

<style scoped>
a {
  text-decoration: none;
  color: black;
}
.img-box{
  background-color: #fff;
  border-radius:20px;
  position: relative;
}
.img-box:hover img:last-child { opacity:0 }

.img-box div {
  position: absolute;
  top: 10px;
  left: 10px;
}

.img-title {
   width: 300px;
   margin-bottom: 10%;
}

.secondary-title {
  color: #3B3B3B;
}

.btn-down {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

.btn-down a {
  color:black;
}

.container {
  width: 100%;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container-sm, .container {
    max-width: 540px;
  }
}
@media (min-width: 768px) {
  .container-md, .container-sm, .container {
    max-width: 720px;
  }
}
@media (min-width: 992px) {
  .container-lg, .container-md, .container-sm, .container {
    max-width: 960px;
  }
}
@media (min-width: 1200px) {
  .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1140px;
  }
}
@media (min-width: 1400px) {
  .container-xxl, .container-xl, .container-lg, .container-md, .container-sm, .container {
    max-width: 1320px;
  }
}
.row {
  --bs-gutter-x: 1.5rem;
  --bs-gutter-y: 0;
  display: flex;
  flex-wrap: wrap;
  margin-top: calc(-1 * var(--bs-gutter-y));
  margin-right: calc(-0.5 * var(--bs-gutter-x));
  margin-left: calc(-0.5 * var(--bs-gutter-x));
}
.row > * {
  flex-shrink: 0;
  width: 100%;
  max-width: 100%;
  padding-right: calc(var(--bs-gutter-x) * 0.5);
  padding-left: calc(var(--bs-gutter-x) * 0.5);
  margin-top: var(--bs-gutter-y);
}

.gx-4 {
  --bs-gutter-x: 1.5rem;
}

@media (min-width: 768px) {
  .col-md-4 {
    flex: 0 0 auto;
    width: 33.33333333%;
  }
}
@media (min-width: 992px) {
  .col-lg-5 {
    flex: 0 0 auto;
    width: 41.66666667%;
  }

  .col-lg-6 {
    flex: 0 0 auto;
    width: 50%;
  }

  .col-lg-7 {
    flex: 0 0 auto;
    width: 58.33333333%;
  }

  .col-lg-8 {
    flex: 0 0 auto;
    width: 66.66666667%;
  }

.gx-lg-5 {
    --bs-gutter-x: 3rem;
  }
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid rgba(0, 0, 0, 0.125);
  border-radius: 0.25rem;
}
.card > hr {
  margin-right: 0;
  margin-left: 0;
}

.card-body {
  flex: 1 1 auto;
  padding: 1rem 1rem;
  color: black;
}

.d-flex {
  display: flex !important;
}

.h-100 {
  height: 100% !important;
  border-radius: 5px;
}

.justify-content-center {
  justify-content: center !important;
}

.my-4 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.my-auto {
  margin-top: auto !important;
  margin-bottom: auto !important;
}

.me-0 {
  margin-right: 0 !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 3rem !important;
}

.ms-0 {
  margin-left: 0 !important;
}

.px-4 {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}

.py-4 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.text-center {
  text-align: center !important;
}

.btn {
  padding: 1.25rem 2rem;
  font-size: 90%;
  font-weight: bold;
  margin-top: 50px;
  width: 300px;
}

.masthead {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 35rem;
  padding: 15rem 0;
  background: #F8F9FA;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: scroll;
  background-size: 900px;
}
.masthead h1, .masthead .h1 {
  font-size: 2.5rem;
  line-height: 2.5rem;
  letter-spacing: 0.8rem;
  background: linear-gradient(#F8F9FA, rgba(255, 255, 255, 0));
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
          background-clip: text;
}
.masthead h2, .masthead .h2 {
  max-width: 20rem;
  font-size: 1rem;
}
@media (min-width: 768px) {
  .masthead h1, .masthead .h1 {
    font-size: 4rem;
    line-height: 4rem;
  }
}
@media (min-width: 992px) {
  .masthead {
    height: 90vh;
    padding: 0;
  }
  .masthead h1, .masthead .h1 {
    font-size: 6.5rem;
    line-height: 6.5rem;
    letter-spacing: 0.8rem;
  }
  .masthead h2, .masthead .h2 {
    max-width: 30rem;
    font-size: 1.25rem;
  }
}

.about-section {
  padding-top: 10rem;
  background: linear-gradient(to bottom, #F8F9FA 0%, rgba(252, 255, 206, 0.653) 10%, rgb(249, 252, 194) 50%, #F8F9FA);
}
.about-section p {
  margin-bottom: 5rem;
}

.projects-section {
  padding: 10rem 0;
}
.projects-section .featured-text {
  padding: 2rem;
}
@media (min-width: 992px) {
  .projects-section .featured-text {
    padding: 0 0 0 2rem;
    border-left: 0.5rem solid #ede65ee7;
  }
}
.projects-section .project-text {
  padding: 3rem;
  font-size: 90%;
}
@media (min-width: 992px) {
  .projects-section .project-text {
    padding: 5rem;
  }
  .projects-section .project-text hr {
    border-color: #9c9b65;
    border-width: 0.25rem;
    width: 30%;
  }
}

.project {
  background-color: #303030;
}

.shadow:hover {
  background-color: #fff982e7;
}

.contact-section {
  padding-top: 5rem;
  padding-bottom: 5rem;
  background-color: #303030;
}
.contact-section .card {
  border: 0;
  border-bottom: 0.25rem solid #ede65ee7;
}
.contact-section .card h4, .contact-section .card .h4 {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.15rem;
}
.contact-section .card hr {
  border-color: #ede65ee7;
  border-width: 0.25rem;
  width: 3rem;
}

.contact-section .social:hover {
  box-shadow: 2px 2px 20px rgb(215, 215, 215);
}

.footer {
  padding: 5rem 0;
}

</style>
