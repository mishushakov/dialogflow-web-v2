<template>
    <div class="rich-component" :class="{'me': me, 'fullwidth': fullwidth}"><slot /></div>
</template>

<style lang="sass" scoped>
.rich-component
    padding-bottom: 8px
    width: var(--component-width)
    word-break: break-word
    display: flex
    animation: show .8s var(--animation-timing) forwards
    opacity: 0

    @keyframes show
        0%
            opacity: 0
        100%
            opacity: 1
            transform: translateY(-4px)

    @for $i from 1 through 25
        &:nth-child(#{$i}n)
            animation-delay: #{$i * .10}s

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
