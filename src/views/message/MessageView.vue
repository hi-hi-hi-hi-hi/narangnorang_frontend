<template>
    <div class="section">
        <MessageList></MessageList>
        <MessageHistory></MessageHistory>
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
  .section{
    display: grid;
    grid-template-columns: 600px 700px;
    grid-gap: 30px;
    position: absolute;
  }
</style>
