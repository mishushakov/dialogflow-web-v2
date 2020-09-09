<template>
    <a
        v-if="uri"
        class="rich-suggestion"
        target="_blank"
        rel="noopener noreferrer"
        :href="uri">
        {{title}}
    </a>
    <button v-else class="rich-suggestion">{{title}}</button>
</template>

<style lang="sass" scoped>
@import '@/style/mixins'

.rich-suggestion
    @include reset
    display: inline-block
    padding: 8px 12px
    border-radius: 40px
    border: var(--border)
    color: var(--text-primary)
    cursor: pointer
    margin-right: 6px
    margin-bottom: 6px

    &[href]
        color: var(--accent)
        text-decoration: none
        border: var(--border)
</style>

<script>
export default {
    name: 'RichSuggestion',
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
