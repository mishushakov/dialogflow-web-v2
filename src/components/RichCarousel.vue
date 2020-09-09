<template>
    <ul class="rich-carousel"><slot /></ul>
</template>

<style lang="sass" scoped>
.rich-carousel
    display: flex
    flex-wrap: nowrap
    overflow-x: scroll
    overflow-y: hidden
    white-space: nowrap
    -webkit-overflow-scrolling: touch
    padding: 0 0 20px 0
    margin: 0
    scroll-snap-type: x mandatory

    *
        display: inline-block
        margin-right: 10px
        flex: 0 0 auto
        width: var(--component-width)
        scroll-snap-align: center

    @media screen and (max-width: 720px)
        display: grid
        justify-content: space-between
        grid-gap: 10px
        grid-template-columns: 1fr 1fr
        white-space: normal

        *
            display: block
            margin-right: 0
            width: 100%
</style>

<script>
export default {
    name: 'RichCarousel'
}
</script>
