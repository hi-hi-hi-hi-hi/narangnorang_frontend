<template>
  <div class="home">
    <input type="button" @click="getImage">
    <p :v-bind="myRoomDTO.floor"></p>
    <input type="text" :v-bind="myRoomDTO.floor" :value="myRoomDTO.floor">
    <h1>{{myRoomDTO.floor}}</h1>
    <h1>{{myRoomDTO.bed}}</h1>
    <div class="Miniroom">
      <div v-if="myRoomDTO.bed !== 0">
        <img :srcset="require(`@/assets/items/${myRoomDTO.floor}.png`)">
      </div>
      <div v-if="myRoomDTO.bed !== 0">
        <img class="zIndex2" :srcset="require(`@/assets/items/${myRoomDTO.bed}.png`)">
      </div>
      <div v-if="myRoomDTO.wallpaper !== 0">
        <img class="zIndex0" :srcset="require(`@/assets/items/${myRoomDTO.wallpaper}.png`)">
      </div>
      <div v-if="myRoomDTO.closet !== 0">
        <img :srcset="require(`@/assets/items/${myRoomDTO.closet}.png`)">
      </div>
      <div v-if="myRoomDTO.desk !== 0">
        <img :srcset="require(`@/assets/items/${myRoomDTO.desk}.png`)">
      </div>
      <div v-if="myRoomDTO.walldecoLeft !== 0">
        <img :srcset="require(`@/assets/items/${myRoomDTO.walldecoLeft}.png`)">
      </div>
      <div v-if="myRoomDTO.walldecoRight !== 0">
        <img :srcset="require(`@/assets/items/${myRoomDTO.walldecoRight}.png`)">
      </div>
      <div v-if="myRoomDTO.chair !== 0">
          <img :srcset="require(`@/assets/items/${myRoomDTO.chair}.png`)">
      </div>
    </div>
  <div>
    <router-link to="/home/buy">아이템구매</router-link><br>
    <router-link to="/home/style">아이템적용</router-link><br>
    <router-link to="/home/wish">위시리스트</router-link><br>
  </div>
  <div>
  <router-view/>
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
        console.log(this.myRoomDTO)
        console.log(response.data)
        this.myRoomDTO = response.data
        console.log(this.myRoomDTO)
      })
    }
  },
  mounted () {
    this.axios({
      url: '/api/loginSession',
       method: 'get',
       responseType: 'json'
      })
    .then((response) => {
      this.email = response.data.email
      this.name = response.data.name
      this.password = response.data.password
      this.privilege = response.data.privilege
      this.phone = response.data.phone
      this.region = response.data.region
      this.zipcode = response.data.zipcode
      this.address1 = response.data.address1
      this.address2 = response.data.address2
      this.address3 = response.data.address3
      this.job = response.data.job
      this.introduction = response.data.introduction
    })
  }
}
</script>

<style scoped>

img {
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
