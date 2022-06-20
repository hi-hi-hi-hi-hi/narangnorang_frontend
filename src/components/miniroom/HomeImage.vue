<template>
<div>
<div class="Miniroom">
      <div v-if="myRoomDTO.floor !== 0">
        <img class="zIndex0" :srcset="require(`@/assets/items/${myRoomDTO.floor}.png`)">
      </div>
      <div v-if="myRoomDTO.bed !== 0">
        <img class="zIndex2" :srcset="require(`@/assets/items/${myRoomDTO.bed}.png`)">
      </div>
      <div v-if="myRoomDTO.wallpaper !== 0">
        <img class="zIndex0" :srcset="require(`@/assets/items/${myRoomDTO.wallpaper}.png`)">
      </div>
      <div v-if="myRoomDTO.closet !== 0">
        <img class="zIndex2" :srcset="require(`@/assets/items/${myRoomDTO.closet}.png`)">
      </div>
      <div v-if="myRoomDTO.desk !== 0"><img :srcset="require(`@/assets/items/${myRoomDTO.desk}.png`)">
      </div>
      <div v-if="myRoomDTO.walldecoLeft !== 0">
        <img class="zIndex0" :srcset="require(`@/assets/items/${myRoomDTO.walldecoLeft}.png`)">
      </div>
      <div v-if="myRoomDTO.walldecoRight !== 0">
        <img :srcset="require(`@/assets/items/${myRoomDTO.walldecoRight}.png`)">
      </div>
      <div v-if="myRoomDTO.chair !== 0">
        <img :srcset="require(`@/assets/items/${myRoomDTO.chair}.png`)">
      </div>
    </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  created () {
    this.getImage()
  },
  name: 'HomeView',
  data () {
    return {
      myRoomDTO: {
        floor: 0,
        bed: 0,
        chair: 0,
        closet: 0,
        wallpaper: 0,
        walldecoRight: 0,
        walldecoLeft: 0,
        desk: 0
      }
    }
  },
  methods: {
    getImage () {
      axios({
        url: '/api/home',
        method: 'get',
        responseType: 'json'
      }).then((response) => {
        this.myRoomDTO = response.data
      })
    }
}
}
</script>
<style scoped>

    img {
      width: 500px;
      height: 500px;
      position: absolute;
      display: block;
      margin: 0 auto;
    }
    .zIndex0{
      z-index: 0;
    }
    .zIndex2{
      z-index: 2;
    }
    .Miniroom{
      position: relative;
    }
</style>
