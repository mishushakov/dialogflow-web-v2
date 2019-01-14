<template>
    <img class="img" :src="image.imageUri" :alt="image.accessibilityText" />
</template>

<style lang="sass" scoped>
.img
    max-width: 300px
    height: auto
    border-radius: 12px
    box-shadow: 0 1px 4px 0 rgba(32,33,36,0.28)
    object-fit: cover
</style>

<script>
export default {
    name: 'Picture',
    props: ['image']
}
</script>
