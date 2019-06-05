<template>
    <img class="picture" :src="image.imageUri" :alt="image.accessibilityText" />
</template>

<style lang="sass" scoped>
.picture
    max-width: 300px
    height: auto
    border-radius: 12px
    box-shadow: 0 2px 6px 2px rgba(60,64,67,0.15)
    object-fit: cover
</style>

<script>
export default {
    name: 'Picture',
    props: ['image']
}
</script>