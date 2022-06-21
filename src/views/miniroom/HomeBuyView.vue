<template>
<div>
    <div class="align">
      <HomeImage />
    </div>
    <br><br><br>
    <h1>아이템 구매</h1>
    <div class="postSection">
    <MiniroomSideBar />
    </div>
<div class="table-responsive">

  <table class="table">
    <thead>
      <tr>
            <th><button class="btn btn-info" @click="changeCategory('bed')">침대</button></th>
            <th><button class="btn btn-info" @click="changeCategory('closet')">옷장</button></th>
            <th><button class="btn btn-info" @click="changeCategory('floor')" >바닥</button></th>
            <th><button class="btn btn-info" @click="changeCategory('wallpaper')" >벽지</button></th>
            <th><button class="btn btn-info" @click="changeCategory('desk')" >책상</button></th>
            <th><button class="btn btn-info" @click="changeCategory('chair')" >의자</button></th>
            <th><button class="btn btn-info" @click="changeCategory('walldecoRight')" >오른쪽벽장식</button></th>
            <th><button class="btn btn-info" @click="changeCategory('walldecoLeft')" >왼쪽벽장식</button></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(dto, idx) in itemList" :key="idx">
        <td>아이템 번호: {{dto.id}}</td>
        <td>아이템 이름: {{dto.name}}</td>
        <td><img class="img-fluid" :srcset="require(`../../assets/items/items/${dto.id}.png`)"></td>
        <td>가격:<span class="red">{{dto.price}}pt</span></td>
        <td><button class="btn btn-warning" @click="buy(dto.id,dto.price,dto.name,dto.category)">구매</button></td>
        <td><button class="btn btn-warning" @click="wish(dto.id,dto.category)">위시리스트</button></td>
      </tr>
    </tbody>
  </table>
</div>
</div>
</template>

<script>
import HomeImage from '@/components/miniroom/HomeImage.vue'
import MiniroomSideBar from '@/components/miniroom/MiniroomSideBar'
import axios from 'axios'
export default {
  name: 'HomeBuy',
  data () {
    return {
      itemList: {
      },
      mesg: ''
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      axios.get('/api/home/buy', {
        params: {
          category: this.category
        }
      })
      .then((res) => {
        this.itemList = res.data.itemList
      })
      .catch((err) => {
        console.log(err)
      })
    },
    changeCategory (nCategory) {
      this.category = nCategory
      this.getList()
    },
    buy (NitemId, Nprice, name, category) {
        axios.post('/api/home/buy', {
        data: {
          id: NitemId,
          category: category,
          name: name,
          price: Nprice
        },
        responseType: 'json'
      })
      .then((res) => {
        this.mesg = res.data
        alert(this.mesg)
        this.$router.go()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    wish (itemId) {
      this.axios({
        method: 'post',
        url: '/api/home/buy/' + itemId,
        data: itemId,
        responseType: 'json'
      })
      .then((res) => {
        this.mesg = res.data
        alert(this.mesg)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    HomeImage,
    MiniroomSideBar
  }

}
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
}
table{
    margin-top: 400px;
    border: 5px;
}
.red{
  color: red;
}
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
