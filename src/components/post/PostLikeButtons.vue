<template>
  <div class="postLikeButtons">
    <button id="btn_allList" @click="fnChangeLikes(0)">전체글</button>
    <button id="btn_overTen" @click="fnChangeLikes(10)">추천 10개 이상</button>
    <button id="btn_overThirty" @click="fnChangeLikes(30)">추천 30개 이상</button>
  </div>
</template>

<script>
export default {

}
</script>
