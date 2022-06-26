<template>
<div class="miniroom">
      <div v-if="myRoomDTO.floor !== 0">
        <img  class="zIndex0 HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.floor}.png`)">
      </div>
      <div v-if="myRoomDTO.bed !== 0">
        <img class="zIndex2 HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.bed}.png`)">
      </div>
      <div v-if="myRoomDTO.wallpaper !== 0">
        <img class="zIndex0 HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.wallpaper}.png`)">
      </div>
      <div v-if="myRoomDTO.closet !== 0">
        <img class="zIndex2 HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.closet}.png`)">
      </div>
      <div v-if="myRoomDTO.desk !== 0"><img class="HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.desk}.png`)">
      </div>
      <div v-if="myRoomDTO.walldecoLeft !== 0">
        <img class="zIndex0 HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.walldecoLeft}.png`)">
      </div>
      <div v-if="myRoomDTO.walldecoRight !== 0">
        <img class="HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.walldecoRight}.png`)">
      </div>
      <div v-if="myRoomDTO.chair !== 0">
        <img class="HomeImg" :srcset="require(`@/assets/items/${myRoomDTO.chair}.png`)">
      </div>
  </div>
</template>
<script>

export default {
  props: {
    ImgRefres: Object
  },
  created () {
    this.getImage()
  },
  updated () {
    if (this.ImgRefres === 1) {
      this.getImage()
    }
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
      this.axios({
        url: '/api/home',
        method: 'get',
        responseType: 'json'
      }).then((response) => {
        this.myRoomDTO = response.data.myRoomDTO
      })
    }
}
}
</script>
<style scoped>
.miniroom {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -350px 0 0 -250px;
}
.btn {
  		position: fixed;
		right: 5%;
		bottom: 5%;
}
    .HomeImg {
      width: 500px;
      height: 500px;
      position: absolute;
    }
    .zIndex0{
      z-index: 0;
    }
    .zIndex2{
      z-index: 2;
    }
</style>
