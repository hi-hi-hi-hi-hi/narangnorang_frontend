<template>
  <div>
    <div class="map-wrapper" ref="kakaomap" style="width:500px;height:400px;"></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mapInstance: null
    }
  },
  mounted () {
    const container = this.$refs.kakaomap
    const options = { // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3 // 지도의 레벨(확대, 축소 정도)
    }
    this.mapInstance = new window.kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
  }
}
</script>
