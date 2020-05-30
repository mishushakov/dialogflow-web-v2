<template>
    <div class="rich-component" :class="{'me': me, 'fullwidth': fullwidth}"><slot /></div>
</template>

<style lang="sass" scoped>
.rich-component
    padding-bottom: 8px
    width: 70%
    word-break: break-word
    display: flex

    @media screen and (max-width: 720px)
        width: 100%

    &.me
        flex-direction: row-reverse
        float: right

    &.fullwidth
        width: 100%

    *
        flex-grow: 1
</style>

<script>
export default {
    name: 'RichComponent',
    props: {
        me: {
            type: Boolean
        },
        fullwidth: {
            type: Boolean
        }
    }
}
</script>
