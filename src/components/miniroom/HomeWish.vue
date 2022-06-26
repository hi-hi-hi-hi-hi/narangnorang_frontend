<template>
<div class="table-res">
  <table class="table">
    <thead>
      <tr>
        <th colspan="6"><h3><b>위시리스트 아이템을 구매해보세요!</b></h3></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(dto, idx) in wishItemList" :key="idx">
        <td>아이템 번호: {{dto.id}}</td>
        <td><img class="imgMini" :srcset="require(`../../assets/items/items/${dto.id}.png`)"></td>
        <td>가격:<span class="red">{{dto.price}}pt</span></td>
        <td><button class="w-100 btn btn-outline-dark" @click="buy(dto.id,dto.price,dto.name,dto.category)">구매</button></td>
        <td><button class=" w-100 btn btn-outline-dark" @click="wish(dto.id,dto.category)">위시리스트 제거</button></td>
      </tr>
    </tbody>
  </table>

</div>
</template>

<script>
export default {
  name: 'HomeBuy',
  data () {
    return {
      wishItemList: {
      },
      mesg: ''
    }
  },
  created () {
    this.getWishList()
  },
  methods: {
    getWishList () {
      this.axios.get('/api/home/buy', {
        params: {
          category: this.category
        },
        responseType: 'json'
      }).then((res) => {
        this.wishItemList = res.data.wishItemList
        console.log(res.data.wishItemList)
      }).catch((err) => {
        console.log(err)
      })
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
        this.getWishList()
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
        this.getWishList()
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
