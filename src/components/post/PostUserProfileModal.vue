<template>
  <div class="userProfileModal">
    <div class="black-bg" @click="modalClose">
      <div class="white-bg">
        <h4>{{ myRoomDTO.memberName }}의 미니룸</h4>
        <hr>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['memberId'],
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
  created () {
    this.fnGetUserHome()
  },
  updated () {
    this.fnGetUserHome()
  },
  methods: {
    modalClose () {
      this.$emit('modalClose')
    },
    fnGetUserHome () {
      this.axios.get('/api/post/userhome', {
        params: {
          id: this.memberId
        }
      })
      .then((res) => {
        this.myRoomDTO = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    }
  }
}
</script>

<style scoped>
.black-bg {
  width: 100%; height: 100%;
  top: 0; left: 0;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
  z-index: 9998;
}
.white-bg {
  left: 500px;
  position: fixed;
  width: 700px; background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 100px;
  box-shadow: 5px 5px 5px gray;
}
</style>
