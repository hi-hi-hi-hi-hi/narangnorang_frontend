<template>
  <div class="miniroomSideBar">
    <ul class="list-group">
      <a @click="transferLinkBuy" ><li class="list-group-item">아이템 구매</li></a><br>
      <a @click="transferLinkStyle" ><li class="list-group-item">아이템 적용</li></a><br>
      <a @click="transferLinkWish" ><li class="list-group-item">위시리스트</li></a><br>
    </ul>
    <div>내 포인트: {{point}}포인트</div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
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
    transferLinkBuy () {
      this.$router.push('/home/buy')
    },
    transferLinkStyle () {
      this.$router.push('/home/style')
    },
    transferLinkWish () {
      this.$router.push('/home/wish')
    },
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
  .miniroomSideBar{
    grid-column: 1;
    grid-row: 1;
    margin-left: 2%;
    margin-top: 5%
  }
  .list-group-item{
    cursor: pointer;
  }
</style>
