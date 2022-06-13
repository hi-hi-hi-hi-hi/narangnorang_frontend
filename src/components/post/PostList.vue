<template>
    <button id="btn_allList">전체글</button>
    <button id="btn_overTen">추천 10개 이상</button>
    <button id="btn_overThirty">추천 30개 이상</button>
    <br>
    <select id="searchCol">
        <option value="title">제목</option>
        <option value="member_name">작성자</option>
    </select>
    <input type="text" id="keyword">
</template>
<script>
export default ({
  name: 'PostList'
})
</script>
