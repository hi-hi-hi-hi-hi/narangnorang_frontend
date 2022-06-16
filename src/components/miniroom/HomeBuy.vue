<template>
<div class="buyTable">
    <table class="buyTable">
      <thead>
        <tr>
          <th><button @click="changeCategory('bed')>침대</button></th>
          <th><button>옷장</button></th>
          <th><button>바닥</button></th>
          <th><button>벽지</button></th>
          <th><button>책상</button></th>
          <th><button>의자</button></th>
          <th><button>오른쪽벽장식</button></th>
          <th><button>왼쪽벽장식</button></th>
        </tr>
      </thead>

<script>
import axios from 'axios'

export default {
  name: 'HomeBuy',
  props: ['category'],
  data () {
    return {
      list: {}
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
    }
  }
}
</script>