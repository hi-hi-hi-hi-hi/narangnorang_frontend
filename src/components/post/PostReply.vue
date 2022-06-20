<template>
  <div class="postReplyArea">
    <ul class="list_comment list-group">
      <a v-for="(row, idx) in list" :key="idx">
        <li v-if="replyVisible && row.postId === id" class="list-group-item border-0">
          <div class="commentSection">
              {{ row.memberName }}
              <span style="font-size:12px">{{ row.datetime }}</span>
              <!-- <button class="btn btn-sm">추천 {{ row.likes }}</button> -->
              <div class="replyContentArea" style="padding:10px">{{ row.content }}</div>
          </div>
        </li>
      </a>
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
    },
    replyVisible: {
      dafault: true
    }
  },
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
      })
      .catch((err) => {
        console.log(err)
      })
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
