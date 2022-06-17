<template>
  <div class="postWriteArea">
    제목: <input type="text" v-model="title"><br>
    내용: <textarea v-model="content"></textarea><br>
    <button @click="fnWritePost()">등록</button>
  </div>
</template>

<script>
export default {
  name: 'PostWrite',
  data () {
    return {
      requestBody: {
        content: '',
        title: ''
      }
    }
  },
  methods: {
    fnWritePost () {
      this.requestBody = {
        category: this.$route.params.category,
        title: this.title,
        content: this.content
      }

      this.axios({
        method: 'post',
        url: '/api/post/write',
        params: this.requestBody
      }).then((res) => {
        alert('게시글이 등록되었습니다.')
      })
    }
  }
}
</script>
