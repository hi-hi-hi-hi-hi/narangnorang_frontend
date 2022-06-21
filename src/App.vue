<template>
  <div>
    <nav v-if="$route.name !== 'main' && $route.name !== 'login'">
      <Header class="header"/>
      <ChatBot />
    </nav>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/layouts/HeaderView'
import ChatBot from '@/components/common/ChatBot'

export default {
  components: {
    Header,
    ChatBot
  }
}
</script>

<style>
@import url(http://fonts.googleapis.com/earlyaccess/notosanskr.css);
html, body {
  font-family: 'Noto Sans KR', sans-serif;
}

#app {
  font-family: 'Noto Sans KR', sans-serif;
}

.header {
  text-decoration: none;
  color: black;
}
</style>
