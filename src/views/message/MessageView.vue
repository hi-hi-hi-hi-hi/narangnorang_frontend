<template>
    <div class="container">
        <div class="row">
            <MessageList></MessageList>
            <MessageHistory></MessageHistory>
        </div>
    </div>
</template>

<script>
import MessageList from '@/components/message/MessageList'
import MessageHistory from '@/components/message/MessageHistory'

export default {
    components: {
        MessageList,
        MessageHistory
    }
}
</script>

<style scoped>
.container {
  margin: 50px auto;
  padding: 0;
}
</style>
