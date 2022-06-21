<template>
    <div class="side-bar">
        <h5><b>나의노랑</b></h5>
        <hr>
        <ul class="list-group">
            <li class="list-group-item"><router-link to="/mynorang/challenge"> - 챌린지</router-link></li>
            <li class="list-group-item"><router-link to="/mynorang/dailylog"> - 일일데이터</router-link></li>
            <li class="list-group-item"><router-link to="/mynorang/moodstate"> - 기분상태</router-link></li>
            <li class="list-group-item"><router-link to="/mynorang/testresult"> - 테스트결과</router-link></li>
        </ul>
    </div>
</template>

<style scoped>
    .side-bar {
        grid-column: 1;
        grid-row: 1;
        margin-left: 20%;
        margin-top: 10%;
    }
    .list-group-item {
        cursor: pointer;
        border: none;
    }
    a {
        text-decoration: none;
        color: black;
    }
</style>

<script>
export default {
    name: 'SideBar'
}
</script>
