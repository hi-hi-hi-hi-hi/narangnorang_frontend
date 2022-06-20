<template>
  <h1 v-if="$route.name !== 'main' && $route.name !== 'login'">나랑노랑</h1>
  <nav v-if="$route.name !== 'main' && $route.name !== 'login'">
    <Header class="header"/>
  </nav>
  <router-view/>
</template>

<script>
import Header from './layouts/HeaderView'

export default {
  components: { Header }
}
</script>
