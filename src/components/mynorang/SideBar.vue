<template>
    <div>
        <ul>
            <li><button type="button" class="btn btn-primary" @click="$router.push('/mynorang/testresult')">테스트결과</button></li>
            <li><button type="button" class="btn btn-primary" @click="$router.push('/mynorang/moodstate')">기분상태</button></li>
            <li><button type="button" class="btn btn-primary" @click="$router.push('/mynorang/dailylog')">일일데이터</button></li>
            <li><button type="button" class="btn btn-primary" @click="$router.push('/mynorang/challenge')">챌린지</button></li>
        </ul>
        <h1>기분상태</h1>
    </div>
</template>

<script>
export default {
    name: 'SideBar'
}
</script>
