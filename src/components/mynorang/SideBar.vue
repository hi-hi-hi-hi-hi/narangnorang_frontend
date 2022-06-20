<template>
    <div class="side-bar">
        <ul class="list-group">
            <router-link to="/mynorang/challenge"><li class="list-group-item">챌린지</li></router-link>
            <router-link to="/mynorang/dailylog"><li class="list-group-item">일일데이터</li></router-link>
            <router-link to="/mynorang/moodstate"><li class="list-group-item">기분상태</li></router-link>
            <router-link to="/mynorang/testresult"><li class="list-group-item">테스트결과</li></router-link>
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
    }
    a {
        text-decoration: none;
    }
</style>

<script>
export default {
    name: 'SideBar'
}
</script>
