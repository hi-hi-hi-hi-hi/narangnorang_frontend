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
    grid-template-columns: 700px 600px;
    grid-gap: 0px;
    position: absolute;
    left: 15%;
  }
</style>
