<template>
    <SideBar />
</template>

<script>
import SideBar from '@/components/mynorang/SideBar'
export default {
    data () {
        return {
            testResultList: []
        }
    },
    components: {
        SideBar
    },
    methods: {
        getTestResultList () {
        }
    }
}
</script>
