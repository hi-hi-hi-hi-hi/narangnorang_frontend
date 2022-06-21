<template>
  <PostUserProfilePopup v-if="popupVal" @close-popup="popupClose"/>
  <div class="postListSection">
    <!-- 추천 필터링 버튼 -->
    <div class="postLikeButtons">
      <button class="btn btn-default btn" @click="fnUpdateLikes(0)">전체글</button>
      <button class="btn btn-default btn" @click="fnUpdateLikes(10)">추천 10개 이상</button>
      <button class="btn btn-default btn" @click="fnUpdateLikes(30)">추천 30개 이상</button>
    </div>
    <!-- category가 대나무숲일 때 -->
    <div v-if="category !== '대나무숲'" class="postSearchArea">
      <div class="input-group mb-3">
        <div class="input-group-text p-0">
            <select class="form-select form-select shadow-none bg-light border-0" v-model="searchCol" @change="fnPostSearch">
                <option value="title">제목</option>
                <option value="member_name">작성자</option>
            </select>
        </div>
        <input type="text" class="form-control" v-model="keyword" @keyup="fnPostSearch" />
    </div>
    </div>
    <div class="postTableArea">
      <table v-if="category === '대나무숲'" class="table table-bordered">
        <tr v-for="(row, idx) in list" :key="idx">
          <td style="padding:20px;">
            <img :src="require('@/assets/post/profile.png')" style="max-width:50px;heigth:auto;">
            익명
            <!-- 시간 표시 설정 -->
            <span v-if="row.datetime.substring(0, 10) === todayDate" class="col-4 time text-muted small">
              {{ row.datetime.substring(10, 19) }}
            </span>
            <span v-else class="col-4 time text-muted small">
              {{ row.datetime.substring(2, 10) }}
            </span>
            <button class="btn btn-default" @click="fnLikePost(row.id)"> 추천 {{ row.likes }}</button>
            <br>
            <div style="margin:20px;">
              {{ row.content }}
            </div>
            <button class="btn" @click="fnReplyVisibleToggle()">댓글 {{ row.replies }}</button>
            <PostReply :id="row.id" :replyVisible="replyVisible"/>
          </td>
        </tr>
      </table>
      <!-- 대나무숲 외 category -->
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
        <tbody v-if="list.length >= 1">
          <tr v-for="(row, idx) in list" :key="idx">
            <td>{{ row.id }}</td>
            <td><a @click="fnGoRetrievePage(row.id)">
            <strong v-if="category === '정보게시판' && row.memberPrivilege === 1" style="cursor:pointer;">{{ row.title }}</strong>
            <span v-else style="cursor:pointer;">{{ row.title }}</span>
            </a><span style="color:red;margin:5px">[{{ row.replies }}]</span></td>
            <td><a @click="popupOpen()" style="cursor:pointer;">{{ row.memberName }}</a></td>
            <td>
              <!-- 시간 표시 설정 -->
              <span v-if="row.datetime.substring(0, 10) === todayDate" class="col-4 time text-muted small">
                {{ row.datetime.substring(10, 16) }}
              </span>
              <span v-else class="col-4 time text-muted small">
                {{ row.datetime.substring(2, 10) }}
            </span>
            </td>
            <td>{{ row.views }}</td>
            <td>{{ row.likes }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6">게시글이 없습니다.</td>
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
import PostReply from '@/components/post/PostReply'
import PostUserProfilePopup from '@/components/post/PostUserProfilePopup'

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
      pageNumbers: [],
      replyVisible: false,
      todayDate: '',
      popupVal: false
    }
  },
  components: {
    PostReply,
    PostUserProfilePopup
  },
  mounted () {
    this.fnGetList()
    console.log(this.login)
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
        this.todayDate = res.data.todayDate
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
      this.$router.push({ name: 'postWrite', params: { category: this.category } })
    },
    fnGoRetrievePage (id) {
      this.$router.push('/post/' + id + '?category=' + this.category)
    },
    fnReplyVisibleToggle () {
      if (this.replyVisible === true) {
        this.replyVisible = false
      } else {
        this.replyVisible = true
      }
    },
    fnLikePost (id) {
      this.axios.post('/api/post/like/' + id)
      .then((res) => {
        if (res.data === 1) {
          alert('게시글을 추천했습니다.')
        } else if (res.data === -1) {
          alert('추천을 취소하였습니다.')
        }
        this.fnGetList()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    popupOpen () {
      this.popupVal = true
    },
    popupClose () {
      this.popupVal = false
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
