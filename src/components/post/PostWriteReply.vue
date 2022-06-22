<template>
  <div class="writeReplyArea">
    <textarea class="writeReplyContent form-control" v-model="content"></textarea>
    <button class="btn_postComment btn" @click="fnWriteReply()">등록</button>
  </div>
</template>

<script>
export default {
  name: 'postWriteReply',
  props: {
    postId: {
      default: 0
    }
  },
  data () {
    return {
      requestBody: {},
      content: ''
    }
  },
  methods: {
    fnWriteReply () {
      this.requestBody = {
        postId: this.postId,
        content: this.content
      }

      this.axios.post('/api/post/reply', this.requestBody)
      .then((res) => {
        alert('댓글이 등록되었습니다.')
        if (this.category === '대나무숲') {
          this.$router.push({ name: 'post', params: { category: this.category } })
        } else {
          this.$router.go()
        }
      })
    }
  }
}
</script>

<style>
.writeReplyArea{
  width: 600px;
}
.writeReplyContent{
  width: 600px;
  height: 200x;
  resize: none;
  margin: 10px;
}
.btn_postComment{
  float: right;
}
</style>
