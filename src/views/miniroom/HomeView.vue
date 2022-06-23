<template>
    <div v-if="privilege ===3" class="section">
      <div class="miniroomSideBar">
    <MiniroomSideBar v-on:group="groupp" />
    내 포인트: {{point}}포인트
    </div>
    <div class="section-1">
      <div class="home-img border border-3">
        <HomeImage :ImgRefres="ImgRefres"/>
        <MiniroomButton v-on:group="groupp"></MiniroomButton>
      </div>
      <div></div>
      <div v-if="group === 'B'">
        <HomeBuy v-on:point="getImage"></HomeBuy>
      </div>
      <div v-else-if="group === 'S'">
        <HomeStyle v-on:ImgRefresh="ImgRefresh"></HomeStyle>
      </div>
      <div v-else-if="group === 'W'">
        <HomeWish></HomeWish>
      </div>
   </div>
    </div>
</template>

<script>
import HomeImage from '@/components/miniroom/HomeImage.vue'
import MiniroomSideBar from '@/components/miniroom/MiniroomSideBar'
import HomeBuy from '@/components/miniroom/HomeBuy'
import HomeStyle from '@/components/miniroom/HomeStyle'
import HomeWish from '@/components/miniroom/HomeWish'
import MiniroomButton from '@/components/miniroom/MiniroomButton'

export default {
  name: 'HomeView',
  components: {
    HomeImage,
    MiniroomSideBar,
    HomeBuy,
    HomeStyle,
    HomeWish
  },
  created () {
    this.getImage()
  },
  data () {
    return {
      privilege: '',
      point: '',
      group: '',
      ImgRefres: ''
    }
  },
  methods: {
    getImage () {
      this.axios({
        url: '/api/home',
        method: 'get',
        responseType: 'json'
      }).then((response) => {
        this.privilege = response.data.privilege
        this.point = response.data.point
      })
    },
    groupp (group) {
      this.group = group
    },
    ImgRefresh () {
      this.ImgRefres = 1
    }
}
}
</script>

<style scoped>
.section{
    display: grid;
    grid-template-columns: 300px 900px;
    grid-gap: 30px;
    position: absolute;
  }
.align{
  margin-left: 200px;
}
</style>
