<template>
  <div class="postWriteSection">
    <PostSideBar :category="category" @categoryFromSideBar="fnUpdateCategory"/>
    <div class="postWriteArea">
      <input v-if="category !== '대나무숲'" class="writeTitle form-control" type="text" v-model="title" placeholder="제목을 입력하세요."/><br>
      <textarea class="writeContent form-control" v-model="content" placeholder="내용을 입력하세요."/><br>
      <button class="btn" style="text-align:right;" @click="fnEditPost()">수정</button>
    </div>
  </div>
</template>

<script>
import PostSideBar from '@/components/post/PostSideBar'

export default {
  name: 'PostEdit',
  data () {
    return {
      requestBody: {},
      content: this.$route.params.content,
      title: this.$route.params.title,
      category: this.$route.params.category,
      postId: this.$route.params.postId
    }
  },
  components: {
    PostSideBar
  },
  methods: {
    fnEditPost () {
      this.requestBody = {
        title: this.title,
        content: this.content,
        id: this.postId
      }

      this.axios({
        method: 'put',
        url: '/api/post/' + this.postId,
        data: this.requestBody
      })
      .then((res) => {
        alert('게시글이 수정되었습니다.')
        this.$router.push({ name: 'post', params: { category: this.category } })
      })
    },
    fnUpdateCategory (category) {
      this.category = category
      this.$router.push({ name: 'post', params: { category: this.category } })
    }
  }
}
</script>

<style scoped>
.postWriteSection{
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 30px;
}
.postWriteArea{
  grid-column: 2;
  grid-row: 1;
  position: relative;
  left: 20%;
}
.writeTitle{
  width: 600px;
}
.writeContent{
  width: 600px;
  height: 400px;
  resize: none;
}
</style>
