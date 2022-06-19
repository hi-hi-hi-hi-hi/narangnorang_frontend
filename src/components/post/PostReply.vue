<template>
  <div class="postReplyArea">
    <button class="btn" @click="fnReplyVisibleToggle()">댓글 {{ replies }}</button>
    <ul v-if="replyVisible" class="list_comment list-group list-group-flush">
      <li v-for="(row, idx) in list" :key="idx" class="list-group-item">
        <div class="commentSection">
            {{ row.memberName }}
            <span style="font-size:12px">{{ row.datetime }}</span>
            <!-- <button class="btn btn-sm">추천 {{ row.likes }}</button> -->
            <div class="replyContentArea">{{ row.content }}</div>
        </div>
      </li>
      <PostWriteReply :postId="id"/>
    </ul>
  </div>
</template>

<script>
import PostWriteReply from '@/components/post/PostWriteReply'

export default {
  name: 'postReply',
  props: {
    id: {
      default: 0
    },
    replies: {
      default: 0
    }
  },
  components: {
    PostWriteReply
  },
  data () {
    return {
      list: {},
      replyVisible: true
    }
  },
  methods: {
    fnGetReplyList () {
      this.axios.get('/api/post/reply/' + this.id)
      .then((res) => {
        this.list = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnReplyVisibleToggle () {
      if (this.replyVisible === true) {
        this.replyVisible = false
      } else {
        this.replyVisible = true
      }
    }
  },
  mounted () {
    this.fnGetReplyList()
  }
}
</script>
<style>
.postReplyArea{
  margin-top: 10px;
  width: 600px;
}
.replyContentArea{
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
