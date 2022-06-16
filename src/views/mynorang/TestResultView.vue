<template>
    <div>
        <ul>
            <li><button @click="$router.push('/mynorang/testresult')">테스트결과</button></li>
            <li><button @click="$router.push('/mynorang/moodstate')">기분상태</button></li>
            <li><button @click="$router.push('/mynorang/dailylog')">일일데이터</button></li>
            <li><button @click="$router.push('/mynorang/challenge')">챌린지</button></li>
        </ul>
        <h1>테스트결과</h1>
    </div>
</template>
