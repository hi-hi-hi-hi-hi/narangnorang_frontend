<template>
  <ul>
    <li><button id="btn_freeBoard" @click="changeCategory('자유게시판')">자유게시판</button></li>
    <li><button id="btn_infoBoard" @click="changeCategory('정보게시판')">정보게시판</button></li>
    <li><button id="btn_goodWordBoard" @click="changeCategory('예쁜말게시판')">예쁜말게시판</button></li>
    <li><button id="btn_bambooBoard" @click="changeCategory('대나무숲')">대나무숲</button></li>
  </ul>
  <!-- <div class="postListArea">
  <div class="postButtonsArea">
    <button id="btn_allList" @click="fnChangeLikes(0)">전체글</button>
    <button id="btn_overTen" @click="fnChangeLikes(10)">추천 10개 이상</button>
    <button id="btn_overThirty" @click="fnChangeLikes(30)">추천 30개 이상</button>
  </div>
  <div class="searchArea">
    <select id="searchCol">
        <option value="title">제목</option>
        <option value="member_name">작성자</option>
    </select>
    <input type="text" id="keyword">
  </div> -->
  <postList v-bind:category='category' />
  <router-link :to="{ name: 'postWrite', params : { category : category}}">글쓰기</router-link>
</template>

<script>
import PostList from '@/components/post/PostList'

export default {
  name: 'PostView',
  data () {
    return {
      category: '자유게시판'
    }
  },
  components: {
    PostList
  },
  methods: {
    changeCategory (category) {
      this.category = category
    }
  }
}
</script>
