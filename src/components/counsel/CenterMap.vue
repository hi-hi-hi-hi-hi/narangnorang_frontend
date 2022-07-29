<template>
  <!-- 검색창 -->
  <div class="search-box">
    <div class="inner-box">
      <div class="input-group mb-3">
        <input type="text" class="form-control" ref="keyword" size="10" @keyup="searchCenter" placeholder="지역을 입력하세요." />
    </div>
    <!-- 카카오 지도 -->
    <div class="kakaomap" ref="kakaomap"></div>
    <!-- 마커 클릭시 세부정보 -->
    <div v-if="overlay == true">
      <h3> <b>{{ centerInfo.place_name }} </b><span> <a class="btn btn-outline-dark btn-sm" type="button" target="_blank" :href=centerInfo.place_url> <i class="fa-solid fa-arrow-up-right-from-square"></i></a> </span></h3>
      <div> 연락처: {{ centerInfo.phone }} </div>
      <div> 지번주소: {{ centerInfo.address_name }}</div>
      <div> 도로명주소: {{ centerInfo.road_address_name }} </div>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CenterMap',
  data () {
    return {
      mapInstance: null,
      userRegion: '',
      results: [],
      overlay: false,
      infowindow: [],
      centerInfo: null
    }
  },
  mounted () {
    const container = this.$refs.kakaomap
    const options = { // 지도를 생성할 때 필요한 기본 옵션
      center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표.
      level: 3 // 지도의 레벨(확대, 축소 정도)
    }
    this.mapInstance = new window.kakao.maps.Map(container, options) // 지도 생성 및 객체 리턴
    this.getRegion()
  },
  methods: {
    // 사용자 지역 가져오기
    getRegion () {
      this.axios.get('/api/counsel/userRegion', {})
      .then((res) => {
        this.userRegion = res.data.userRegion
        this.searchCenter()
      })
    },
    // 마커 표시
    displayMarker (idx, place) {
      const imageSrc = require('@/assets/common/norang.png') // 마커이미지의 주소입니다
      const imageSize = new window.kakao.maps.Size(50, 50) // 마커이미지의 크기입니다
      const imageOption = { offset: new window.kakao.maps.Point(27, 69) }

      // 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
      const markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imageOption)
      // 마커를 생성하고 지도에 표시합니다
      const marker = new window.kakao.maps.Marker({
        map: this.mapInstance,
        position: new window.kakao.maps.LatLng(place.y, place.x),
        image: markerImage
      })
      // 마커에 커서가 오버됐을 때 마커 위에 표시할 인포윈도우를 생성합니다
      const iwContent = '<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>' // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다

      // 인포윈도우를 생성합니s다
      const infowindow = new window.kakao.maps.InfoWindow({
          content: iwContent
      })

      this.infowindow[idx] = infowindow

      // 마커에 마우스오버 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'mouseover', () => {
          this.infowindow[idx].open(this.mapInstance, marker)
      })

      // 마커에 마우스아웃 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'mouseout', () => {
          this.infowindow[idx].close()
      })

      // 마커에 마우스아웃 이벤트를 등록합니다
      window.kakao.maps.event.addListener(marker, 'click', () => {
          this.centerInfo = place
          this.overlay = true
      })
    },
    // 센터 검색
    searchCenter () {
      let keyword = this.$refs.keyword.value.trim() + ' 정신'
      if (keyword.length <= 3) {
        keyword = this.userRegion + ' 정신'
      }

      const ps = new window.kakao.maps.services.Places()
      ps.keywordSearch(keyword, (rawData, status, pgn) => {
        const data = rawData.filter(function (value, index, arr) {
          return value.category_name.substring(0, 2) === '사회' || value.category_name.substring(0, 2) === '의료'
        }
        )

        const bounds = new window.kakao.maps.LatLngBounds()

        for (let i = 0; i < data.length; i++) {
          this.displayMarker(i, data[i])
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x))
        }
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        this.mapInstance.setBounds(bounds)
      })
    }
  }
}
</script>

<style scoped>

  h3 {
    margin-top: 10px;
  }

.inner-box {
  width: 500px;
  margin-left: 10%
}
  .kakaomap {
    width: 700px;
    height: 550px;
    margin-bottom: 10px;
  }

  .search-box {
    grid-column: 2;
    grid-row: 1;
  }

  .btn {
    border: none;
  }
</style>
