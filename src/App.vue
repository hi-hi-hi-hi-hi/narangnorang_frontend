<template>
  <div>
    <nav v-if="$route.name !== 'main' && $route.name !== 'login'">
      <Header />
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
