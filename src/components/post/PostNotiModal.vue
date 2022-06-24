<template>
  <div class="notiModal">
    <div class="black-bg" @click="modalClose">
      <div class="white-bg">
        <h5>새로운 댓글 목록</h5>
        <hr>
        <div v-if="notiList.length >= 1">
          <div class="notiListArea" v-for="(row, idx) in notiList" :key="idx">
              <a class="notiContentArea" @click="fnGoRetrievePage(row.postId, row.postCategory);fnDeleteNoti(row.id)"><strong>[{{ row.postTitle }}]</strong> 게시글에 댓글이 등록되었습니다.</a>
          </div>
        </div>
        <div v-else>
          새로운 알림이 존재하지 않습니다.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
   id: Number
  },
  data () {
    return {
        notiList: {}
    }
  },
  mounted () {
    this.fnGetNotiList()
  },
  updated () {
    this.fnGetNotiList()
  },
  methods: {
    modalClose () {
      this.$emit('modalClose')
    },
    fnGetNotiList () {
      this.axios.get('/api/noti', {
        params: {
          memberId: this.id
        }
      })
      .then((res) => {
        this.notiList = res.data
      })
      .catch((err) => {
        console.log(err)
      })
    },
    fnDeleteNoti (id) {
      this.axios.delete('/api/noti/' + id)
      .catch((err) => {
        console.log(err)
      })
    },
    fnGoRetrievePage (postId, postCategory) {
      this.$router.push({ path: '/post/' + postId, query: { category: postCategory } })
    }
  }
}
</script>

<style scoped>
.black-bg {
  width: 100%; height: 100%;
  top: 0; left: 0;
  background: rgba(0,0,0,0.05);
  position: fixed; padding: 20px;
  z-index: 9998;
}
.white-bg {
  position: fixed;
  right: 60px;
  top: 60px;
  width: 450px; height: auto; background: white;
  padding: 20px;
  box-shadow: 5px 5px 5px lightgray;
}
.notiListArea {
  margin: 10px;
}
.notiContentArea {
  cursor: pointer;
  text-decoration: none;
  color: rgb(59, 59, 59);
}
</style>
