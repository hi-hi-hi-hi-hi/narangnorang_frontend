<template>
  <div class="postRetrieveSection">
    <PostSideBar :category="category" @categoryFromSideBar="fnUpdateCategory"/>
    <div class="postRetrieveArea">
      자유게시판 <br>
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
    </div>
  </div>
</template>
<script>
import PostSideBar from '@/components/post/PostSideBar'

export default {
  data () {
    return {
      id: 0,
      title: '',
      content: '',
      datetime: '',
      memberName: '',
      views: 0,
      likes: 0,
      replies: 0
    }
  },
  components: {
    PostSideBar
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
        this.views = res.data.views
        this.likes = res.data.likes
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
    }
  }
}
</script>

<style scoped>
.postRetrieveSection{
  display: grid;
  grid-template-columns: 300px 1fr;
  grid-gap: 30px;
}
.postRetrieveArea{
  grid-column: 2;
  grid-row: 1;
}
.postContentArea{
  margin-top: 30px;
  margin-bottom: 30px;
}
</style>
