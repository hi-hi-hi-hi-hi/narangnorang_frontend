<template>
<div class="buyTable">
    <table class="buyTable">
      <thead>
        <tr>
          <th><button click="changeCategory('bed')>침대</button></th>
          <th><button click="changeCategory('closet') >옷장</button></th>
          <th><button click="changeCategory('floor') >바닥</button></th>
          <th><button click="changeCategory('wallpaper') >벽지</button></th>
          <th><button click="changeCategory('desk') >책상</button></th>
          <th><button click="changeCategory('chair') >의자</button></th>
          <th><button click="changeCategory('walldecoRight') >오른쪽벽장식</button></th>
          <th><button click="changeCategory('walldecoLeft') >왼쪽벽장식</button></th>
        </tr>
      </thead>
</template>
<script>
import axios from 'axios'

export default {
  name: 'HomeBuy',
  props: ['category'],
  data () {
    return {
      list: {},
      category: ''
    }
  },
  mounted () {
    this.getList(this.category)
  },
  methods: {
    getList () {
      axios.get('/api/home/buy', {
        params: {
          category: this.category
        }
      })
      .then((res) => {
        this.list = res.data.itemList
      })
      .catch((err) => {
        console.log(err)
      })
    },
    changeCategory (nCategory) {
      this.category = nCategory
    }
  }
}
</script>
