<template>
  <CounselSideBar></CounselSideBar>
  <div class="map-area">
    <CenterMap>
    </CenterMap>
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
