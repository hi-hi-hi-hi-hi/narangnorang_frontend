<template>
  <nav v-if="$route.name !== 'main' && $route.name !== 'login'">
    <Header />
  </nav>
  <router-view/>
</template>

<script>
import Header from './layouts/HeaderView'

export default {
  components: { Header }
}
</script>
