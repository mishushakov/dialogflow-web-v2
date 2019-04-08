<template>
    <span class="bubble" :class="{'me': from == 'me'}">
        {{text}}
    </span>
</template>

<style lang="sass" scoped>
.bubble
    padding: 12px
    border-radius: 40px
    color: #202124
    border: 1px solid #E8EAED
    display: inline-block
    margin-top: 24px
    position: relative
    background-color: white

    &::before
        content: url('./../../../assets/bubble-left.svg')
        position: absolute
        left: 0
        top: 0
        margin-top: -9px
        margin-left: -1px

    &.me
        float: right
        background-color: #F1F3F4
        border: 1px solid #F1F3F4
        color: #5F6368

        &::before
            content: ''

        &::after
            content: url('./../../../assets/bubble-right.svg')
            position: absolute
            right: 0
            top: 0
            margin-top: -9px
            margin-right: -1px
</style>

<script>
export default {
    name: 'Bubble',
    props: ['text', 'from']
}
</script>
