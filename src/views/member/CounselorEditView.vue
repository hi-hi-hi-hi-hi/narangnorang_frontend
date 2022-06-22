<template>
  <div class="section">
    <MyPageSideBar :member="member"></MyPageSideBar>
    <CounselorEdit></CounselorEdit>
  </div>
</template>

<script>
import MyPageSideBar from '@/components/member/MyPageSideBar'
import CounselorEdit from '@/components/member/CounselorEdit'

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
    CounselorEdit
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
  }
</style>
