<template>
  <div class="section">
  <CounselSideBar></CounselSideBar>
  <div class="listSection map-area">
    <CenterMap>
    </CenterMap>
  </div>
  </div>
</template>

<script>
import CounselSideBar from '@/components/counsel/CounselSideBar'
import CenterMap from '@/components/counsel/CenterMap'

export default {
  components: {
    CenterMap,
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

  .listSection{
    grid-column: 2;
    grid-row: 1;
    margin-right:30%;
    display: grid;
    grid-template-columns: 400px 500px;
    grid-template-rows: 40px 1fr 40px 40px;
    grid-gap: 5px;
}
</style>
