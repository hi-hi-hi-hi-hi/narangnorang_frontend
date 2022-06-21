<template>

    <div v-if="privilege ===3" class="home">
      <div class="postSection">
    <MiniroomSideBar />
    </div>
      <div class="align">
        <HomeImage />
      </div>

   </div>
</template>

<script>
import HomeImage from '@/components/miniroom/HomeImage.vue'
import MiniroomSideBar from '@/components/miniroom/MiniroomSideBar'
import axios from 'axios'
export default {
  name: 'HomeView',
  components: {
    HomeImage,
    MiniroomSideBar
  },
  created () {
    this.getImage()
  },
  data () {
    return {
      privilege: '',
      point: ''
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
    }
}
}
</script>

<style scoped>
.align{
  margin: 30px 50px 30px 400px;
}
.postSection{
    display: grid;
    grid-template-columns: 300px 500px;
    grid-gap: 30px;
    position: absolute;
  }
</style>
