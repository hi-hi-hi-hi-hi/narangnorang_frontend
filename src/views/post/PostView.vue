<template>
  <PostSideBar :category="category" @categoryFromSideBar="updateCategory"/>
  <PostLikeButtons />
  <PostSearch />
  <postList v-bind:category='category' />
  <router-link :to="{ name: 'postWrite', params : { category : category}}">글쓰기</router-link>
</template>

<script>
import PostSideBar from '@/components/post/PostSideBar'
import PostLikeButtons from '@/components/post/PostLikeButtons.vue'
import PostSearch from '@/components/post/PostSearch.vue'
import PostList from '@/components/post/PostList'

export default {
  name: 'PostView',
  data () {
    return {
      category: '자유게시판'
    }
  },
  components: {
    PostSideBar,
    PostLikeButtons,
    PostSearch,
    PostList
  },
  methods: {
    updateCategory (category) {
      this.category = category
    }
  }
}
</script>
