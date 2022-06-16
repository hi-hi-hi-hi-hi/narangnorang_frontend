<template>
    <button id="btn_allList">전체글</button>
    <button id="btn_overTen">추천 10개 이상</button>
    <button id="btn_overThirty">추천 30개 이상</button>
    <br>
    <select id="searchCol">
        <option value="title">제목</option>
        <option value="member_name">작성자</option>
    </select>
    <input type="text" id="keyword">
</template>
<script>
import axios from 'axios'

export default {
  name: 'PostList',
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
        this.list = res.data.postDto
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    category (newCategory) {
      this.getList(newCategory)
    }
  }
}
</script>
