<template>
    <div v-if="privilege ===3" class="section">
      <div class="sideBar">
      <h5><b>{{member.name}}님의 미니룸</b></h5>
      <hr>
      <div>내 포인트: {{point}}포인트</div>
  </div>
    <div class="section-1">
      <div class="home-img border border-3">
        <HomeImage :ImgRefres="ImgRefres"/>
        <MiniroomButton v-on:group="groupp"></MiniroomButton>
      </div>
      <div v-if="group === 'B'">
        <HomeBuy v-on:point="getImage"></HomeBuy>
      </div>
      <div v-else-if="group === 'S'">
        <HomeStyle v-on:ImgRefresh="ImgRefresh"></HomeStyle>
      </div>
      <div v-else-if="group === 'W'">
        <HomeWish v-on:point="getImage"></HomeWish>
      </div>
   </div>
    </div>
</template>

<script>
import HomeImage from '@/components/miniroom/HomeImage.vue'
import HomeBuy from '@/components/miniroom/HomeBuy'
import HomeStyle from '@/components/miniroom/HomeStyle'
import HomeWish from '@/components/miniroom/HomeWish'
import MiniroomButton from '@/components/miniroom/MiniroomButton'

export default {
  name: 'HomeView',
  props: ['member'],
  components: {
    HomeImage,
    HomeBuy,
    HomeStyle,
    HomeWish,
    MiniroomButton
  },
  created () {
    this.getImage()
    this.getLoginSession()
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
    getLoginSession () {
      this.axios({
        url: '/api/loginSession',
        method: 'get',
        responseType: 'json'
      })
      .then((response) => {
        this.$store.commit('member', response.data)
      })
    },
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
    left: 10%;

  }
.section-1::-webkit-scrollbar {
    display: none;
}

  .section-1 {
    position: relative;
    grid-column: 2;
    grid-row: 1;
    margin: auto;
    width: 700px;
    height: 700px;
    overflow-x: hidden;
    overflow-y: auto;
    scrollbar-width: thin;
  }

.home-img {
  border-radius: 8px;
  width: 700px;
  height: 500px;
}

  .sideBar{
    grid-column: 1;
    grid-row: 1;
    margin-left: 20%;
    margin-top: 10%;
  }

</style>
