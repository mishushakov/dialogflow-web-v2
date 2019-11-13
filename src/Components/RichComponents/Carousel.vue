<template>
    <ul class="carousel"><slot /></ul>
</template>

<style lang="sass" scoped>
.carousel
    display: flex
    flex-wrap: nowrap
    overflow-x: scroll
    overflow-y: hidden
    white-space: nowrap
    -webkit-overflow-scrolling: touch
    padding: 0 0 20px 0
    width: 500px

    *
        display: inline-block
        margin-right: 10px
        flex: 0 0 auto

    @media screen and (max-width: 720px)
        width: 100%
        display: grid
        justify-content: space-between
        grid-gap: 10px
        grid-template-columns: 1fr 1fr
        white-space: normal

        *
            display: block
            margin-right: 0
</style>

<script>
export default {
    name: 'CarouselSelect'
}
</script>