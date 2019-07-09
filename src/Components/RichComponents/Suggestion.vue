<template>
    <a target="_blank" rel="noopener noreferrer" :href="url" class="suggestion">{{title}}</a>
</template>

<style lang="sass" scoped>
.suggestion
    display: inline-block
    padding: 8px 12px
    border-radius: 40px
    border: 1px solid var(--border)
    color: var(--text)
    cursor: pointer
    margin-right: 5px
    font-weight: 500
    margin-bottom: 12px

.suggestion[href]
    background: #3C4043
    box-shadow: 0 3px 6px 2px rgba(66,133,244,0.15)
    color: white
    text-decoration: none
    border: 1px solid #3C4043
</style>

<script>
export default {
    name: 'Suggestion',
    props: ['title', 'url']
}
</script>