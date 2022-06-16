<template>
<div class="buyTable">
    <table class="buyTable">
      <thead>
        <tr>
          <th><button>침대</button></th>
          <th><button>옷장</button></th>
          <th><button>바닥</button></th>
          <th><button>벽지</button></th>
          <th><button>책상</button></th>
          <th><button>의자</button></th>
          <th><button>오른쪽벽장식</button></th>
          <th><button>왼쪽벽장식</button></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, idx) in list" :key="idx">
          <td>{{ row.id }}</td>
          <td>{{ row.title }}</td>
          <td>{{ row.memberName }}</td>
          <td>{{ row.datetime }}</td>
          <td>{{ row.views }}</td>
          <td>{{ row.likes }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

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
