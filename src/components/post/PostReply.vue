<template>
  <div class="postReplyArea">
    <ul class="list_comment list-group">
      <a v-for="(row, idx) in list" :key="idx">
        <li v-if="replyVisible" class="list-group-item border-0">
          <div class="commentSection">
              <b>{{ row.memberName }}</b>
              <span class="datetimeArea"> {{ row.datetime }}</span>
              <span class="commentBtnArea" v-if="member.id === row.memberId">
                <button class="btn btn-sm" @click="fnCommentEdit()">수정</button>
                <button class="btn btn-sm" @click="fnCommentDelete(row.id, row.postId)">삭제</button>
              </span>
              <!-- <button class="btn btn-sm">추천 {{ row.likes }}</button> -->
              <div class="replyContentArea" style="padding:10px">{{ row.content }}</div>
          </div>
        </li>
      </a>
      <PostWriteReply :postId="id" @fnGetReplyList="fnGetReplyList"/>
    </ul>
  </div>
</template>

<script>
import PostWriteReply from '@/components/post/PostWriteReply'

export default {
  name: 'postReply',
  props: ['id', 'member', 'replies', 'replyVisible', 'replyVisibleId'],
  components: {
    PostWriteReply
  },
  data () {
    return {
      list: {}
    }
  },
  methods: {
    fnGetReplyList () {
      this.axios.get('/api/post/reply/' + this.id)
      .then((res) => {
        this.list = res.data
        this.$emit('fnGetPostRetrieve')
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnCommentDelete (replyId, postId) {
      if (confirm('댓글을 삭제하시겠습니까?')) {
        this.axios.delete('/api/post/reply', {
          params: {
            postId: postId,
            replyId: replyId
          }
        })
        .then((res) => {
          alert('댓글을 삭제하였습니다.')
          this.fnGetReplyList()
        })
        .catch((err) => {
          console.log(err)
        })
      }
    }
  },
  mounted () {
    this.fnGetReplyList()
  },
  watch: {
    id () {
      this.fnGetReplyList()
    }
  }
}
</script>
<style scoped>
.postReplyArea{
  margin-top: 10px;
  width: 600px;
}
.replyContentArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
.datetimeArea{
  font-size:12px;
  margin-left: 10px;
}
.commentBtnArea{
  position: absolute;
  right: 20px;
}
</style>
