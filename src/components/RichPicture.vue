<template>
    <img class="rich-picture" :src="uri" :alt="title">
</template>

<style lang="sass" scoped>
.rich-picture
    height: 100%
    width: 100%
    border-radius: 12px
    box-shadow: var(--shadow)
    object-fit: cover
    background-color: var(--background-image)
</style>

<script>
export default {
    name: 'RichPicture',
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
