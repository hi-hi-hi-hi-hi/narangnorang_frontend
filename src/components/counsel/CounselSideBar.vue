<template>
    <div>
        <ul>
            <li><router-link to="/counsel">상담사 찾기</router-link></li>
            <li><router-link to="/counsel/map">주변 상담센터</router-link></li>
         </ul>
    </div>
  <router-view></router-view>
</template>

<script>
export default ({
    name: 'CounselSideBar'
})
</script>
