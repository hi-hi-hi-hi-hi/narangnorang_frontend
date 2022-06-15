<template>
  <ul>
    <li><button id="btn_freeBoard" @click="changeCategory('자유게시판')">자유게시판</button></li>
    <li><button id="btn_infoBoard" @click="changeCategory('정보게시판')">정보게시판</button></li>
    <li><button id="btn_goodWordBoard" @click="changeCategory('예쁜말게시판')">예쁜말게시판</button></li>
    <li><button id="btn_bambooBoard" @click="changeCategory('대나무숲')">대나무숲</button></li>
  </ul>
  <postList v-bind:category='category' />
  <router-link to="/post/write">글쓰기</router-link>
</template>

<script>
import PostList from '@/components/post/PostList'

export default {
  name: 'PostView',
  data () {
    return {
      category: this.category
    }
  },
  components: {
    PostList
  },
  methods: {
    changeCategory (nCategory) {
      this.category = nCategory
    }
  }
}
</script>
