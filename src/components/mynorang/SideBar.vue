<template>
    <div>
        <ul>
            <li><router-link to="/mynorang/challenge">챌린지</router-link></li>
            <li><router-link to="/mynorang/dailylog">일일데이터</router-link></li>
            <li><router-link to="/mynorang/moodstate">기분상태</router-link></li>
            <li><router-link to="/mynorang/testresult">테스트결과</router-link></li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'SideBar'
}
</script>
