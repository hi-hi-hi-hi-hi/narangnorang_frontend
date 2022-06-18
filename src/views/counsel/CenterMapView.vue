<template>
  <CounselSideBar></CounselSideBar>
  <div class="map-area">
    <CenterMap>
    </CenterMap>
  </div>
</template>

<script>
import CounselSideBar from '@/components/counsel/CounselSideBar.vue'
import CenterMap from '@/components/counsel/CenterMap.vue'

export default {
  name: 'CenterMapView',
  components: {
    CenterMap,
    CounselSideBar
  }
}
</script>
