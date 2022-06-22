<template>
  <div class="section">
    <MyPageSideBar :member="member"></MyPageSideBar>
    <GeneralEdit></GeneralEdit>
  </div>
</template>

<script>
import MyPageSideBar from '@/components/member/MyPageSideBar'
import GeneralEdit from '@/components/member/GeneralEdit'

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
    GeneralEdit
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
  }
</style>
