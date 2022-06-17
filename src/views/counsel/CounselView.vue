<template>
  <CounselSideBar></CounselSideBar>
  <CounselorList></CounselorList>
</template>

<script>
import CounselSideBar from '@/components/counsel/CounselSideBar.vue'
import CounselorList from '@/components/counsel/CounselorList.vue'

export default {
  name: 'CounselorView',
  data () {
    return {

    }
  },
  components: {
    CounselorList,
    CounselSideBar
  },
  methods: {
  }
}
</script>
