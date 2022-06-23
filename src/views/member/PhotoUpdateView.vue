<template>
  <div class="section">
    <MyPageSideBar :member="member"></MyPageSideBar>
    <PhotoUpdate></PhotoUpdate>
  </div>
</template>

<script>
import MyPageSideBar from '@/components/member/MyPageSideBar'
import PhotoUpdate from '@/components/member/PhotoUpdate'

export default {
  data () {
    return {
    }
  },
  props: {
    member: Object
  },
  components: {
    MyPageSideBar,
    PhotoUpdate
  },
  methods: {
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
