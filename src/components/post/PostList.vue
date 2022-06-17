<template>
  <div class="postSection">
    <table v-if="category === '대나무숲'">
      <tr v-for="(row, idx) in list" :key="idx">
        <td>
          익명 {{ row.datetime }} <button>추천 {{ row.likes }}</button>
          <br>
          {{ row.content }}
        </td>
      </tr>
    </table>
    <table v-else>
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
          <td><a v-on:click="fnRetrieve('${row.id}')">{{ row.title }}</a></td>
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
export default {
  name: 'PostList',
  props: {
    category: {
      type: String,
      default: '자유게시판'
    }
  },
  data () {
    return {
      requestBody: {
        likes: 0
      },
      list: {}
    }
  },
  mounted () {
    this.fnGetList()
  },
  methods: {
    fnGetList () {
      this.requestBody = {
        category: this.category,
        likes: this.likes
      }

      this.axios.get('/api/post/list', {
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
      this.fnGetList()
    }
  },
  watch: {
    category () {
      this.likes = 0
      this.fnGetList()
    }
  }
}
</script>
