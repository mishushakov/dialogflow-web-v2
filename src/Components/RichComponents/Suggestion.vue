<template>
    <a target="_blank" rel="noopener noreferrer" :href="url" class="suggestion">{{title}}</a>
</template>

<style lang="sass" scoped>
.suggestion
    display: inline-block
    padding: 8px 12px
    border-radius: 40px
    border: 1.5px solid rgba(0,0,0,.1)
    color: rgba(0,0,0,.8)
    cursor: pointer
    margin-right: 5px
    font-weight: 500
    margin-bottom: 12px

    &:hover
        color: black
</style>

<script>
export default {
    name: 'Suggestion',
    props: ['title', 'url']
}
</script>
