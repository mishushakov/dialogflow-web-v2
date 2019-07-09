<template>
    <img class="picture" :src="image.imageUri" :alt="image.accessibilityText" />
</template>

<style lang="sass" scoped>
.picture
    max-width: 300px
    height: auto
    border-radius: 12px
    box-shadow: var(--shadow)
    object-fit: cover
    background-color: var(--image-background)
</style>

<script>
export default {
    name: 'Picture',
    props: ['image']
}
</script>