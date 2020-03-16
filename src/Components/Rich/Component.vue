<template>
    <div class="component"><slot /></div>
</template>

<style lang="sass" scoped>
.component
    padding-bottom: 8px
    width: 70%
    word-break: break-word

    @media screen and (max-width: 720px)
        width: 100%
</style>

<script>
export default {
    name: 'RichComponent'
}
</script>