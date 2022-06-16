<template>
  <div>
     <ul>
        <li><router-link to="/counsel">나랑노랑</router-link></li>
        <li><button id="btn_counselorList" @click="moveToList()">상담사 찾기</button></li>
        <li><button id="btn_counselCenter" @click="moveToMap()">주변 상담센터</button></li>
     </ul>
  </div>
  <CounselorList/>
  <router-view></router-view>
</template>

<script>
import CounselorList from '@/components/counsel/CounselorList'
import router from '@/router'

export default {
  name: 'CounselorView',
  data () {
    return {
      router
    }
  },
  components: {
    CounselorList
  },
  methods: {
  }
}
</script>
