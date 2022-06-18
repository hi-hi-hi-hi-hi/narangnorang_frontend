<template>
  <div class="postSideBar">
    <ul class="list-group">
      <a @click="fnUpdateCategory('자유게시판')"><li class="list-group-item">자유게시판</li></a>
      <a @click="fnUpdateCategory('정보게시판')"><li class="list-group-item">정보게시판</li></a>
      <a @click="fnUpdateCategory('예쁜말게시판')"><li class="list-group-item">예쁜말게시판</li></a>
      <a @click="fnUpdateCategory('대나무숲')"><li class="list-group-item">대나무숲</li></a>
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
    fnUpdateCategory (category) {
      this.category = category
      this.$emit('categoryFromSideBar', this.category)
    }
  }
}
</script>

<style scoped>
  .postSideBar{
    grid-column: 1;
    grid-row: 1;
    margin-left: 20%;
    margin-top: 10%
  }
</style>
