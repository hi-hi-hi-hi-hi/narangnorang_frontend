<template>
<div>

<div class="table-res">
<h3><b>미니룸에 내 아이템 적용</b></h3>
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
            <tr><td><button class="btn btn-outline-dark" @click="style(dto.id,dto.category)">적용하기</button></td></tr>
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
      this.axios.get('/api/home/style', {
        params: {
          category: this.category
        }
      })
      .then((res) => {
        this.itemList = res.data.myItemList
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
        this.axios.put('/api/home/style', {
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
        this.$emit('ImgRefresh')
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
