<template>
    <div class="sideBar">
        <h5><b>내정보</b></h5>
        <hr>
        <ul class="list-group">
            <li class="list-group-item" v-if="member.privilege === 3">
              <router-link class="text" to="/generalEdit"> - 정보 수정</router-link>
            </li>
            <li class="list-group-item" v-else-if="member.privilege === 1 || member.privilege === 2">
              <router-link class="text" to="/counselorEdit"> - 정보 수정</router-link>
            </li>
            <li class="list-group-item" v-if="member.kakaoId === null">
              <router-link class="text" to="/myPage/newPw"> - 새 비밀번호</router-link>
            </li>
            <li class="list-group-item"><router-link class="text" to="/photoUpdate"> - 프로필사진 수정</router-link></li>
         </ul>
    </div>
  <router-view></router-view>
</template>

<script>
export default ({
  name: 'MyPageSideBar',
  computed: {
		member () {
            return this.$store.getters.member
        }
	}
})
</script>

<style scoped>
.sideBar{
    grid-column: 1;
    grid-row: 1;
    margin-left: 20%;
    margin-top: 10%;
  }

  .list-group-item {
    cursor: pointer;
    border: none;
  }
  .text {
    text-decoration: none;
    color: black;
  }

</style>
