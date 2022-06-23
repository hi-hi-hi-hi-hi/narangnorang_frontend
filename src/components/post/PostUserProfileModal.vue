<template>
  <div class="userProfileModal">
    <div class="black-bg" @click="modalClose">
      <div class="white-bg">
        <h4>{{ memberName }}의 미니룸</h4>
        <hr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['memberName'],
  methods: {
    modalClose () {
      this.$emit('modalClose')
    }
  }
}
</script>

<style scoped>
.black-bg {
  width: 100%; height: 100%;
  top: 0; left: 0;
  background: rgba(0,0,0,0.5);
  position: fixed; padding: 20px;
  z-index: 9998;
}
.white-bg {
  left: 200px;
  position: fixed;
  width: 700px; background: white;
  border-radius: 8px;
  padding: 20px;
  margin: 100px;
  box-shadow: 5px 5px 5px gray;
}
</style>
