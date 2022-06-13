<template>
  <ul>
    <li><button id="btn_freeBoard">자유게시판</button></li>
    <li><button id="btn_infoBoard">정보게시판</button></li>
    <li><button id="btn_goodWordBoard">예쁜말게시판</button></li>
    <li><button id="btn_bambooBoard">대나무숲</button></li>
  </ul>
  <div class="postListArea">
    <PostList></PostList>
  </div>
</template>
<script>
import PostList from '@/components/post/PostList'

export default {
  name: 'PostView',
  components: {
    PostList
  }
}
</script>
