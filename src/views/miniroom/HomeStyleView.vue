<template>
<div>
    <div class="align">
      <HomeImage />
    </div>
    <h1>미니룸에 내 아이템 적용</h1>
    <div>
    <span>
        <button class="btn btn-warning"><router-link to="/home/buy">아이템구매</router-link></button><br>
        <button class="btn btn-warning"><router-link to="/home/style">아이템적용</router-link></button><br>
        <button class="btn btn-warning"><router-link to="/home/wish">위시리스트</router-link></button><br>
      </span>
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
        <td><img :srcset="require(`../../assets/items/items/${dto.id}.png`)"></td>
        <td>가격:<span class="red">{{dto.price}}pt</span></td>
        <td><button class="btn btn-warning" @click="style(dto.id,dto.category)">적용하기</button></td>
      </tr>
    </tbody>
  </table>
</div>
</div>
</template>

<script>
import HomeImage from '@/components/miniroom/HomeImage.vue'
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
      axios.get('/api/home/style', {
        params: {
          category: this.category
        }
      })
      .then((res) => {
        this.itemList = res.data.myItemList
        console.log(res.data.itemList)
        console.log(this.itemList)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    changeCategory (nCategory) {
      this.category = nCategory
      this.getList()
    },
    style (itemId, category) {
        axios.put('/api/home/style', {
        data: {
          itemId: itemId,
          category: category
        },
        responseType: 'json'
      })
      .then((res) => {
        if (res.data === 0) {
          this.mesg = '적용실패'
        } else {
          this.mesg = '적용완료'
        }
        alert(this.mesg)
        console.log(res.data)
        // window.location.reload(true)
        this.$router.go()
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  components: {
    HomeImage
  }

}
</script>

<style scoped>
img {
  width: 100px;
  height: auto;
}
.table{
    margin-top: 500px;
}
.red{
  color: red;
}
.align{
  margin: 50px 50px 50px 250px;
}
</style>
