<template>
<div>
<div class="table-res">
  <h3><b>아이템 구매</b></h3>
  <table class="table container">
    <thead>
      <tr>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('bed')">침대</button></th>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('closet')">옷장</button></th>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('floor')" >바닥</button></th>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('wallpaper')" >벽지</button></th>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('desk')" >책상</button></th>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('chair')" >의자</button></th>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('walldecoRight')" >우장</button></th>
            <th><button class="w-100 btn btn-outline-dark col-sm-6" @click="changeCategory('walldecoLeft')" >좌장</button></th>
      </tr>
    </thead>
  </table>
  <table class="container">
    <tbody>
      <tr>
        <td v-for="(dto, idx) in itemList" :key="idx">
        <table class="col-sm-6">
            <tr><td>번호: {{dto.id}}</td></tr>
            <tr><td><img class="imgMini" :srcset="require(`../../assets/items/items/${dto.id}.png`)"></td></tr>
            <tr><td>가격:<span class="red">{{dto.price}}pt</span></td></tr>
            <tr><td><button class="w-100 btn btn-outline-dark" @click="buy(dto.id,dto.price,dto.name,dto.category)">구매</button></td></tr>
            <tr><td><button class="w-100 btn btn-outline-dark" @click="wish(dto.id,dto.category)">Wish</button></td></tr>
       </table>
       </td>
      </tr>
    </tbody>
  </table>
</div>
</div>
</template>

<script>
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
      this.axios.get('/api/home/buy', {
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
        this.axios.post('/api/home/buy', {
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
        this.$emit('point')
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
  }

}
</script>

<style scoped>
.imgMini {
  width: 100px;
  height: auto;
}
.red{
  color: red;
}
.table-res{
  margin-top: 50px;
  border: 5px;
}
</style>
