<template>
  <div class="postListSection">
    <div class="postLikeButtons">
      <button class="btn btn-default btn" @click="fnUpdateLikes(0)">전체글</button>
      <button class="btn btn-default btn" @click="fnUpdateLikes(10)">추천 10개 이상</button>
      <button class="btn btn-default btn" @click="fnUpdateLikes(30)">추천 30개 이상</button>
    </div>
    <div class="postSearchArea">
      <div class="input-group mb-3">
        <div class="input-group-text p-0">
            <select class="form-select form-select shadow-none bg-light border-0" v-model="searchCol">
                <option value="title">제목</option>
                <option value="member_name">작성자</option>
            </select>
        </div>
        <input type="text" class="form-control" v-model="keyword" />
    </div>
      <!-- <select @change="fnChangeSearchCol()">
        <option value="title">제목</option>
        <option value="member_name">작성자</option>
      </select>
      <input type="text" @keyup="fnChangeKeyword()"> -->
    </div>
    <div class="postTableArea">
      <table v-if="category === '대나무숲'" class="table table-bordered">
        <tr v-for="(row, idx) in list" :key="idx">
          <td>
            익명 {{ row.datetime }} <button class="btn btn-default"> 추천 {{ row.likes }}</button>
            <br>
            {{ row.content }}
          </td>
        </tr>
      </table>
      <table v-else class="table table-hover">
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
    <div class="postPageArea">
      <nav>
        <ul class="pagination d-flex justify-content-center flex-wrap pagination-flat pagination-success">
          <li class="page-item"><a class="page-link" href="#" data-abc="true">이전</a></li>
          <li class="page-item"><a class="page-link" href="#" data-abc="true">1</a></li>
          <li class="page-item"><a class="page-link" href="#" data-abc="true">2</a></li>
          <li class="page-item"><a class="page-link" href="#" data-abc="true">3</a></li>
          <li class="page-item"><a class="page-link" href="#" data-abc="true">4</a></li>
          <li class="page-item"><a class="page-link" href="#" data-abc="true">다음</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostList',
  props: {
    category: {
      default: '자유게시판'
    }
  },
  data () {
    return {
      requestBody: {},
      list: {},
      likes: 0,
      searchCol: 'title',
      keyword: ''
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
    fnPostSearch () {
      this.requestBody = {
        category: this.category,
        searchCol: this.searchCol,
        keyword: this.keyword
      }

      this.axios.get('/api/post/search', {
        params: this.requestBody
      })
      .then((res) => {
        this.list = res.data.PostDTO
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  watch: {
    category: function () {
      this.list = {}
      this.likes = 0
      this.searchCol = 'title'
      this.keyword = ''
      this.fnGetList()
    },
    keyword: function () {
      this.fnPostSearch()
    },
    searchCol: function () {
      this.fnPostSearch()
    },
    likes: function () {
      this.fnGetList()
    }
  }
}
</script>

<style scoped>
  .postListSection{
    grid-column: 2;
    grid-row: 1;
    margin-right:30%;
    display: grid;
    grid-template-columns: 400px 400px;
    grid-template-rows: 10px 600x 10px;
    grid-gap: 5px;
  }
  .postLikeButtons{
    grid-column: 1;
    grid-row: 1;
  }
  .postSearchArea{
    grid-column: 2;
    grid-row: 1;
  }
  .postTableArea{
    grid-column: 1/3;
    grid-row: 2;
  }
  .postPageArea{
    grid-column: 1/3;
    grid-row: 3;
    text-align: center;
  }
  .page-link {
     color: black
  }
 .pagination.pagination-flat .page-item{
    margin: 0 .25rem;
  }
  .pagination-success .page-item.active .page-link {
    background: #fff765;
    border-color: #fff765;
  }
</style>
