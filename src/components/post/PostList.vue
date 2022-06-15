<template>
  <div class="postListArea">
    <div class="postButtonArea">
      <button id="btn_allList">전체글</button>
      <button id="btn_overTen">추천 10개 이상</button>
      <button id="btn_overThirty">추천 30개 이상</button>
    </div>
    <select id="searchCol">
        <option value="title">제목</option>
        <option value="member_name">작성자</option>
    </select>
    <input type="text" id="keyword">
    <table class="postTable">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>글쓴이</th>
          <th>작성일</th>
          <th>조회</th>
          <th>추천</th>
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
      axios.get('/api/post/list', {
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
