<template>
  <div class="sideBar">
    <h5><b>미니룸</b></h5>
    <hr>
    <div>내 포인트: {{point}}포인트</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      group: ''
    }
  },
  methods: {
    transfer (event) {
      if (event.target.className === 'list-group-item B') {
        this.group = 'B'
        this.$emit('group', this.group)
      } else if (event.target.className === 'list-group-item W') {
        this.group = 'W'
        this.$emit('group', this.group)
      } else {
        this.group = 'S'
        this.$emit('group', this.group)
      }
    }
  }
}
</script>
<style scoped>
  .sideBar{
    grid-column: 1;
    grid-row: 1;
    margin-left: 20%;
    margin-top: 10%;
  }

  .list-group-item {
    cursor: pointer;
    border: none;
  }
  .text {
    text-decoration: none;
    color: black;
  }
</style>
