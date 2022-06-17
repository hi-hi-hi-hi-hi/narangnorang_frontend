<template>
  <CounselSideBar></CounselSideBar>
  <div class="map-area">
    <div class="searchBox">
      <div>
        <input type="text" :value="userRegion + ' 정신'" @keyup.enter="searchCenter">
      </div>
      <div class="results">
        <div class="place" v-for="rs in search.results" :key="rs.id">
          <h4>{{ rs.place_name }}</h4>
        </div>
      </div>
    </div>

    <CenterMap/>
  </div>
</template>

<script>
import axios from 'axios'
import CounselSideBar from '@/components/counsel/CounselSideBar.vue'
import CenterMap from '@/components/counsel/CenterMap.vue'

export default {
  name: 'CenterMapView',
  data () {
    return {
      userRegion: '',
      search: {
        keyword: null,
        pgn: null,
        results: []
      }
    }
  },
  components: {
    CenterMap,
    CounselSideBar
  },
  mounted () {
    this.getRegion()
  },
  methods: {
    getRegion () {
      axios.get('/api/counsel/userRegion', {

      })
      .then((res) => {
        this.userRegion = res.data.userRegion
      })
      .catch((err) => {
        console.log(err)
      })
    },
    searchCenter (e) {
      const keyword = e.target.value.trim()
      if (keyword.length === 0) {
        alert('검색어 입력')
      }

      const ps = new window.kakao.maps.services.Places()
      ps.keywordSearch(keyword, (data, status, pgn) => {
        this.search.keyword = keyword
        this.search.pgn = pgn
        this.search.results = data
      })
    }
  }
}
</script>
