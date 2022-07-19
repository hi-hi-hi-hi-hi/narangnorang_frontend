<template>
  <div class="postRetrieveSection">
    <PostSideBar :category="category" @categoryFromSideBar="fnUpdateCategory"/>
    <div class="postRetrieveArea">
      <div v-if="member.id === memberId">
        <div style="margin-bottom:20px;"><button class="btn" @click="fnGoEditPage()">수정</button>
        <button class="btn" @click="fnPostDelete()">삭제</button></div>
      </div>
      <hr>
      {{ category }} <br>
      <strong style="font-size:30px;">{{ title }}</strong>
      <div class="postInfoArea">
        {{ memberName }}
        조회 {{ views }}
        {{ datetime }}
        <button class="btn btn-sm" @click="fnLikePost()">추천 {{ likes }}</button>
      </div>
      <div class="postContentArea">
        {{ content }}
      </div>
      <button class="btn" @click="fnReplyVisibleToggle()">댓글 {{ replies }}</button>
      <hr>
      <PostReply :id="id" :replies="replies" :replyVisible="replyVisible" :member="member" @fnGetPostRetrieve="fnGetPostRetrieve"/>
    </div>
  </div>
</template>
<script>
import PostSideBar from '@/components/post/PostSideBar'
import PostReply from '@/components/post/PostReply'

export default {
  props: ['member'],
  data () {
    return {
      id: 0,
      title: '',
      content: '',
      datetime: '',
      memberName: '',
      memberId: '',
      views: 0,
      likes: 0,
      replies: 0,
      category: this.$route.query.category,
      replyVisible: true
    }
  },
  components: {
    PostSideBar,
    PostReply
  },
  created () {
    this.id = this.$route.params.id
    this.fnGetPostRetrieve()
  },
  methods: {
    fnGetPostRetrieve () {
      this.axios.get('/api/post/' + this.id)
      .then((res) => {
        this.title = res.data.title
        this.content = res.data.content
        this.datetime = res.data.datetime
        this.memberName = res.data.memberName
        this.memberId = res.data.memberId
        this.views = res.data.views
        this.likes = res.data.likes
        this.replies = res.data.replies
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnLikePost () {
      this.axios.post('/api/post/like/' + this.id)
      .then((res) => {
        if (res.data === 1) {
          alert('게시글을 추천했습니다.')
        } else if (res.data === -1) {
          alert('추천을 취소하였습니다.')
        }
        this.fnGetPostRetrieve()
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnPostDelete () {
      if (confirm('게시글을 삭제하시겠습니까?')) {
        this.axios.delete('/api/post/' + this.id)
        .then((res) => {
          alert('게시물을 삭제하였습니다.')
          this.$router.push({ name: 'post', params: { category: this.category } })
        })
        .catch((err) => {
          console.log(err)
        })
      }
    },
    fnReplyVisibleToggle () {
      if (this.replyVisible === true) {
        this.replyVisible = false
      } else {
        this.replyVisible = true
      }
    },
    fnUpdateCategory (category) {
      this.category = category
      this.$router.push({ name: 'post', params: { category: this.category } })
    },
    fnGoEditPage () {
      this.$router.push({ name: 'postEdit', params: { title: this.title, content: this.content, postId: this.id } })
    }
  },
  watch: {
    '$route' (to, from) {
      this.id = this.$route.params.id
      this.category = this.$route.query.category
      this.fnGetPostRetrieve()
    }
  }
}
</script>

<style scoped>
.postRetrieveSection{
  display: grid;
  grid-template-columns: 300px 600px;
  grid-gap: 30px;
  position: absolute;
  left: 10%;
}
.postRetrieveArea{
  width: 600px;
  grid-column: 2;
  grid-row: 1;
  margin: auto;
  position: relative;
  left: 30%;
}
.postContentArea{
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
