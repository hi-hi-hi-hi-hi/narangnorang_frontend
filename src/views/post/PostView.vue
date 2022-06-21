<template>
  <div class="postSection">
    <PostSideBar :category="category" @categoryFromSideBar="fnUpdateCategory"/>
    <PostList :category="category" :member="member"/>
  </div>
</template>

<script>
import PostSideBar from '@/components/post/PostSideBar'
import PostList from '@/components/post/PostList'

export default {
  name: 'PostView',
  props: {
    member: Object
  },
  data () {
    return {
      category: '자유게시판',
      likes: 0
    }
  },
  components: {
    PostSideBar,
    PostList
  },
  methods: {
    fnUpdateCategory (category) {
      this.likes = 0
      this.category = category
    },
    fnUpdateLikes (likes) {
      this.likes = likes
    },
    fnGoWritePage () {
      this.currentPage = 'PostWritePage'
    }
  },
  created () {
    if (this.$route.params.category) {
      this.category = this.$route.params.category
    }
  }
}
</script>

<style scoped>
  .postSection{
    display: grid;
    grid-template-columns: 300px 500px;
    grid-gap: 30px;
    position: absolute;
  }
</style>
