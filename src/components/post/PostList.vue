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
            <select class="form-select form-select shadow-none bg-light border-0" v-model="searchCol" @change="fnPostSearch">
                <option value="title">제목</option>
                <option value="member_name">작성자</option>
            </select>
        </div>
        <input type="text" class="form-control" v-model="keyword" @keyup="fnPostSearch" />
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
      <table v-else class="table table-hover" style="text-align:center;table-layout:fixed">
        <thead>
          <tr>
            <th style="width:100px;">번호</th>
            <th style="width:300px;">제목</th>
            <th style="width:100px;">글쓴이</th>
            <th style="width:200px;">작성일</th>
            <th style="width:100px;">조회</th>
            <th style="width:100px;">추천</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, idx) in list" :key="idx">
            <td>{{ row.id }}</td>
            <td><a @click="fnGoRetrievePage(row.id)">
            <strong v-if="category === '정보게시판' && row.memberPrivilege === 1">{{ row.title }}</strong>
            <span v-else>{{ row.title }}</span>
            </a><span style="color:red;margin:5px">[{{ row.replies }}]</span></td>
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
          <li class="page-item" v-if="this.prev > 0" @click="fnChangePage(prev)"><a class="page-link">이전</a></li>
          <span v-for="(n, idx) in pageNumbers" :key="idx">
            <li class="page-item active" v-if="this.p === n"><a class="page-link">{{ n }}</a></li>
            <li class="page-item" v-else @click="fnChangePage(n)"><a class="page-link">{{ n }}</a></li>
          </span>
          <li class="page-item" v-if="this.last < this.totalPage" @click="fnChangePage(next)"><a class="page-link">다음</a></li>
        </ul>
      </nav>
    </div>
    <div class="buttonArea">
      <button class="btn btn-outline" @click="fnGoWritePage()">글쓰기</button>
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
      keyword: '',
      paging: {},
      p: 1,
      totalPage: 0,
      first: 0,
      last: 0,
      prev: 0,
      next: 0,
      pageNumbers: []
    }
  },
  mounted () {
    this.fnGetList()
  },
  methods: {
    fnGetList () {
      this.requestBody = {
        category: this.category,
        likes: this.likes,
        p: this.p
      }

      this.axios.get('/api/post/list', {
        params: this.requestBody
      })
      .then((res) => {
        this.list = res.data.postDto
        this.fnPagingOp(res.data.pageDto.totalRows, res.data.pageDto.limit, res.data.pageDto.currentPage)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnPostSearch () {
      this.requestBody = {
        category: this.category,
        searchCol: this.searchCol,
        keyword: this.keyword,
        p: this.p
      }

      this.axios.get('/api/post/search', {
        params: this.requestBody
      })
      .then((res) => {
        this.list = res.data.PostDTO
        this.fnPagingOp(res.data.PageDTO.totalRows, res.data.PageDTO.limit, res.data.PageDTO.currentPage)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnUpdateLikes (likes) {
      this.keyword = ''
      this.p = 1
      this.likes = likes
      this.fnGetList()
    },
    fnPagingOp (totalRows, limit, currentPage) {
      const totalPage = Math.ceil(totalRows / limit) // 총 페이지 수
      let pageCount = 5 // 한 그룹에 포함되는 페이지 수
      if (totalPage < pageCount) {
        pageCount = totalPage
      }
      const pageGroup = Math.ceil(currentPage / pageCount)
      let last = pageGroup * pageCount
      const first = last - (pageCount - 1)
      if (last > totalPage) {
        last = totalPage
      }
      const next = last + 1
      const prev = first - 1
      this.totalPage = totalPage
      this.first = first
      this.last = last
      this.prev = prev
      this.next = next

      const pageNumbers = []
      for (let i = this.first; i <= this.last; i++) {
        pageNumbers.push(i)
      }
      this.pageNumbers = pageNumbers
    },
    fnChangePage (p) {
      this.p = p
      if (this.keyword === '') {
        this.fnGetList()
      } else {
        this.fnPostSearch()
      }
    },
    fnGoWritePage () {
      this.$router.push('/post/write?category=' + this.category)
    },
    fnGoRetrievePage (id) {
      this.$router.push('/post/' + id + '?category=' + this.category)
    }
  },
  watch: {
    category: function () {
      this.list = {}
      this.likes = 0
      this.searchCol = 'title'
      this.keyword = ''
      this.p = 1
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
    grid-template-columns: 400px 500px;
    grid-template-rows: 40px 1fr 40px 40px;
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
    border-color: lightgray;
  }
  .buttonArea{
    grid-column: 1/3;
    grid-row:4;
    text-align: center;
  }
</style>
