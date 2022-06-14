<template>
  <div class="home">
    <input type="button" value="세션 유지 테스트" @click="test" />
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'HomeView',
  methods: {
    test () {
      axios({
        url: '/api/home',
        method: 'post',
        responseType: 'json'
      }).then((response) => {
        console.log(response)
      })
    }
  }
}
</script>
