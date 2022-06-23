<template>
    <div class="container w-50">
        <div class="row">
            <div class="col">
                <div class="card">
                    <img src="@/assets/test/type1.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">우울증</h5>
                        <p class="card-text">한국, 우울증 발생률 36.8%로 OECD 1위...&nbsp;알고 계셨나요?</p>
                        <router-link to="/test/1" class="btn btn-outline-dark">검사 시작</router-link>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="@/assets/test/type2.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">알코올 중독</h5>
                        <p class="card-text">술잔을 기울이는 대신<br>마음에 귀를 기울여보세요!</p>
                        <router-link to="/test/2" class="btn btn-outline-dark">검사 시작</router-link>
                    </div>
                </div>
            </div>
            <div class="col">
                <div class="card">
                    <img src="@/assets/test/type3.jpg" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title">스트레스</h5>
                        <p class="card-text">현대인의 '적' 스트레스,<br>쌓이면 병이 됩니다.</p>
                        <router-link to="/test/3" class="btn btn-outline-dark">검사 시작</router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .card {
        width: 18rem;
    }
</style>
