<template>
  <nav>
    <router-link to="/generalSignUp">일반회원</router-link> |
    <router-link to="/counselorSignUp">상담사 회원</router-link>
  </nav>
</template>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
