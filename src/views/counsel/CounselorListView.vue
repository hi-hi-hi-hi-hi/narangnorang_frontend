<template>
  <div class="section">
      <CounselSideBar></CounselSideBar>
      <CounselorList></CounselorList>
  </div>
</template>

<script>
import CounselSideBar from '@/components/counsel/CounselSideBar'
import CounselorList from '@/components/counsel/CounselorList'

export default {
  components: {
    CounselorList,
    CounselSideBar
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
