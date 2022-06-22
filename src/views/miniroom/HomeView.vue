<template>

    <div v-if="privilege ===3" class="section">
      <div class="miniroomSideBar">
    <MiniroomSideBar v-on:group="groupp" />
    </div>
      <div class="align">
        <HomeImage />
      </div>
      <div></div>
      <div v-if="group === 'B'">
        <HomeBuy ></HomeBuy>
      </div>
      <div v-else-if="group === 'S'">
        <HomeStyle></HomeStyle>
      </div>
      <div v-else-if="group === 'W'">
        <HomeWish></HomeWish>
      </div>
   </div>
</template>

<script>
import HomeImage from '@/components/miniroom/HomeImage.vue'
import MiniroomSideBar from '@/components/miniroom/MiniroomSideBar'
import HomeBuy from '@/views/miniroom/HomeBuyView'
import HomeStyle from '@/views/miniroom/HomeStyleView'
import HomeWish from '@/views/miniroom/HomeWishView'
import axios from 'axios'
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
      group: ''
    }
  },
  methods: {
    getImage () {
      axios({
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
