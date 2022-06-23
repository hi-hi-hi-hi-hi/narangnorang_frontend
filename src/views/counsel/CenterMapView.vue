<template>
  <div class="section">
  <CounselSideBar></CounselSideBar>
  <div class="map-area">
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
    left: 10%;
  }
</style>
