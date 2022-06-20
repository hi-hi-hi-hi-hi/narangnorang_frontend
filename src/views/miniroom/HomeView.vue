<template>
  <div class="home">
    <div class="align">
      <HomeImage />
    </div>
    <div>
    <span>
        <button class="btn btn-warning"><router-link to="/home/buy">아이템구매</router-link></button><br>
        <button class="btn btn-warning"><router-link to="/home/style">아이템적용</router-link></button><br>
        <button class="btn btn-warning"><router-link to="/home/wish">위시리스트</router-link></button><br>
      </span>
      </div>
   </div>
</template>

<script>
import HomeImage from '@/components/miniroom/HomeImage.vue'
export default {
  name: 'HomeView',
  components: {
    HomeImage
  }
}
</script>

<style scoped>
.align{
  margin: 50px 50px 50px 250px;
}
</style>
