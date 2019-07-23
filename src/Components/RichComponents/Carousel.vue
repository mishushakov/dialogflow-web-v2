<template>
    <div class="carousel"><slot></slot></div>
</template>

<style lang="sass" scoped>
.carousel
    overflow-x: scroll
    overflow-y: hidden
    white-space: nowrap
    -webkit-overflow-scrolling: touch
    padding-bottom: 20px
    width: 500px

    *
        display: inline-block
        margin-right: 10px

    @media screen and (max-width: 720px)
        width: 100%
        display: grid
        justify-content: space-between
        grid-gap: 10px
        grid-template-columns: 1fr 1fr
        white-space: normal
        overflow-x: auto

        *
            display: block
            margin-right: 0
</style>

<script>
export default {
    name: 'CarouselSelect'
}
</script>