<template>
    <div class="sideBar">
        <h5><b>상담하기</b></h5>
        <hr>
        <ul class="list-group">
            <li class="list-group-item"><router-link class="text" to="/counsel"> - 상담사 찾기</router-link></li>
            <li class="list-group-item"><router-link class="text" to="/counsel/map"> - 주변 상담센터</router-link></li>
         </ul>
    </div>
  <router-view></router-view>
</template>

<script>
export default ({
    name: 'CounselSideBar'
})
</script>

<style scoped>
.sideBar{
    grid-column: 1;
    grid-row: 1;
    margin-left: 20%;
    margin-top: 10%;
  }

  .list-group-item {
    cursor: pointer;
    border: none;
  }
  .text {
    text-decoration: none;
    color: black;
  }

</style>
