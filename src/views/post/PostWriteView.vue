<template>
  <div class="postWriteSection">
    <PostSideBar :category="category" @categoryFromSideBar="fnUpdateCategory"/>
    <div v-if="category === '대나무숲'" class="postWrtieArea">
      <textarea class="writeContent form-control" v-model="content" placeholder="내용을 입력하세요."/><br>
      <button class="btn" style="float:right;" @click="fnWritePost()">등록</button>
    </div>
    <div v-else class="postWriteArea">
      <input class="writeTitle form-control" type="text" v-model="title" placeholder="제목을 입력하세요."/><br>
      <textarea class="writeContent form-control" v-model="content" placeholder="내용을 입력하세요."/><br>
      <button class="btn" style="float:right;" @click="fnWritePost()">등록</button>
    </div>
  </div>
</template>

<script>
import PostSideBar from '@/components/post/PostSideBar'

export default {
  name: 'PostWrite',
  data () {
    return {
      requestBody: {
        content: '',
        title: ''
      },
      category: this.$route.params.category
    }
  },
  components: {
    PostSideBar
  },
  methods: {
    fnWritePost () {
      this.requestBody = {
        category: this.category,
        title: this.title,
        content: this.content
      }
      this.axios.post('/api/post/write', this.requestBody)
      .then((res) => {
        alert('게시글이 등록되었습니다.')
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
  position: absolute;
  left: 10%;
}
.postWriteArea{
  grid-column: 2;
  grid-row: 1;
  position: relative;
  left: 25%;
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
