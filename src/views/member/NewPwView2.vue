<template>
  <div class="section">
    <MyPageSideBar :member="member"></MyPageSideBar>
    <NewPw2></NewPw2>
  </div>
</template>

<script>
import MyPageSideBar from '@/components/member/MyPageSideBar'
import NewPw2 from '@/components/member/NewPw2'

export default {
  data () {
    return {
    }
  },
  props: {
    member: Object
  },
  components: {
    MyPageSideBar,
    NewPw2
  },
  methods: {
  }
}

</script>

<style scoped>
  .section{
    display: grid;
    grid-template-columns: 300px 900px;
    grid-gap: 30px;
    position: absolute;
    left: 10%;
  }
</style>
