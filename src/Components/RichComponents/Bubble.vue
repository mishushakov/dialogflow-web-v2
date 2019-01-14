<template>
    <span class="bubble" :class="{'me': from == 'me'}">
        {{text}}
    </span>
</template>

<style lang="sass" scoped>
.bubble
    padding: 12px
    border-radius: 12px
    color: rgba(0,0,0,.8)
    border: 1.5px solid rgba(0,0,0,.1)
    display: inline-block

.me
    float: right
    background-color: #F1F3F4
    border: 1.5px solid #F1F3F4
</style>

<script>
export default {
    name: 'Bubble',
    props: ['text', 'from']
}
</script>
