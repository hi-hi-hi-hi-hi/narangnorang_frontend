<template>
   <div class="container">
  <div class="row justify-content-md-center">
    <router-link to="/generalSignUp">
    <div class="col col-lg-2">
      <img src="@/assets/common/logo_small.png" width="100">
      <br>
      <p class="text">일반 회원</p>
    </div>
    </router-link>
    <router-link to="/counselorSignUp">
    <div class="col col-lg-2">
      <img src="@/assets/common/norang.png" width="100">
      <br>
      <p class="text">상담사 회원</p>
    </div>
    </router-link>
  </div>
</div>
</template>

<style scoped>
a {
  width: 200px;
  margin: 20px;
  text-decoration: none;
  font-size: 30;
  font-weight: bolder;
  color:black;
}
.col {
  border: 2px solid rgb(255, 221, 99);
  width: 200px;
  height: 200px;
  text-align: center;
  font-weight: bold;
  margin:auto;
  border-radius: 5px;
}

.col:hover {
  background-color: #fffce8;
}

.container {
  padding-top: 15%;
}

img {
  margin-top: 15px;
}

.btn-lg {
  font-weight: bold;
}

</style>
