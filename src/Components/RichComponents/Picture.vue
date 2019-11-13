<template>
    <img class="picture" :src="uri" :alt="title">
</template>

<style lang="sass" scoped>
.picture
    height: auto
    max-width: 100%
    border-radius: 12px
    box-shadow: var(--shadow)
    object-fit: cover
    background-color: var(--image-background)
</style>

<script>
export default {
    name: 'Picture',
    props: {
        uri: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        }
    }
}
</script>