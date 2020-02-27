<template>
    <div class="bubble-wrapper"><slot /></div>
</template>

<style lang="sass" scoped>
.bubble-wrapper
    display: flex
    justify-content: flex-end
    padding-bottom: 8px
</style>

<script>
export default {
    name: 'BubbleWrapper'
}
</script>