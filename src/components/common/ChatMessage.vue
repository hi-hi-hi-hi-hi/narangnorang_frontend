<template>
    <div>{{from}} : {{content}}</div>
</template>

<script>
export default {
    props: {
        from: String,
        content: String
    }
}
</script>
