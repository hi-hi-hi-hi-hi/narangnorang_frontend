<template>
  <div class="postListArea">
    <div class="postButtonArea">
      <button id="btn_allList">전체글</button>
      <button id="btn_overTen" @click="fnChangeLikes(10)">추천 10개 이상</button>
      <button id="btn_overThirty" @click="fnChangeLikes(30)">추천 30개 이상</button>
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
          <td><a v-on:click="fnRetrieve('${row.idx}')">{{ row.title }}</a></td>
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
      requestBody: {},
      list: {},
      likes: 0
    }
  },
  mounted () {
    this.fnGetList()
  },
  methods: {
    fnGetList () {
      console.log(this.likes)
      this.requestBody = {
        category: this.category,
        likes: this.likes
      }

      axios.get('/api/post/list', {
        params: this.requestBody
      })
      .then((res) => {
        this.list = res.data.postDto
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnChangeLikes (likes) {
      this.likes = likes
    }
    // fnRetrieve (id) {
    //   this.requestBody.id = id
    //   this.$router.push({
    //     path: '/post/retrieve'
    //   })
    // }
  },
  watch: {
    category () {
      this.fnGetList()
    },
    likes () {
      this.fnGetList()
    }
  }
}
</script>
