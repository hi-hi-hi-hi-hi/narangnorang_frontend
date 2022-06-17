<template>
  <div class="postSideBar">
    <ul>
      <li><button id="btn_freeBoard" @click="updateCategory('자유게시판')">자유게시판</button></li>
      <li><button id="btn_infoBoard" @click="updateCategory('정보게시판')">정보게시판</button></li>
      <li><button id="btn_goodWordBoard" @click="updateCategory('예쁜말게시판')">예쁜말게시판</button></li>
      <li><button id="btn_bambooBoard" @click="updateCategory('대나무숲')">대나무숲</button></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'postSideBar',
  data () {
    return {
      category: '자유게시판'
    }
  },
  methods: {
    updateCategory (category) {
      this.category = category
      this.$emit('categoryFromSideBar', this.category)
    }
  }
}
</script>
