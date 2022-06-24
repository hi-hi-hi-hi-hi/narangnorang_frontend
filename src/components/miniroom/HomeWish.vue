<template>
<div>
<div class="table-res">
  <table class="table">
    <thead>
      <tr>
        <th colspan="6"><h3><b>위시리스트 아이템을 구매해보세요!</b></h3></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(dto, idx) in itemList" :key="idx">
        <td>아이템 번호: {{dto.id}}</td>
        <td>아이템 이름: {{dto.name}}</td>
        <td><img class="imgMini" :srcset="require(`../../assets/items/items/${dto.id}.png`)"></td>
        <td>가격:<span class="red">{{dto.price}}pt</span></td>
        <td><button class="btn btn-outline-dark" @click="buy(dto.id,dto.price,dto.name,dto.category)">구매</button></td>
        <td><button class="btn btn-outline-dark" @click="wish(dto.id,dto.category)">위시리스트 추가/제거</button></td>
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
  updated () {
    this.getList()
  },
  methods: {
    getList () {
      this.axios.get('/api/home/wish', {
        params: {
          category: this.category
        }
      })
      .then((res) => {
        this.itemList = res.data.wishItemList
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
