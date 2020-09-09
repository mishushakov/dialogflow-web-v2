<template>
    <a class="rich-card-button" target="_blank" rel="noopener noreferrer" :href="uri">
        <i class="material-icons rich-card-button-icon" aria-hidden="true">{{uri ? 'arrow_forward' : 'reply'}}</i>
        <span class="rich-card-button-title">{{title}}</span>
    </a>
</template>

<style lang="sass" scoped>
.rich-card-button
    display: flex
    text-decoration: none
    line-height: 24px
    color: var(--text-primary)
    border: var(--border)
    border-radius: 40px
    padding: 8px 12px
    cursor: pointer
    justify-content: space-between

    &[href]
        color: var(--accent)

.rich-card-button-title
    flex: 1
    text-align: center
</style>

<script>
export default {
    name: 'RichCardButton',
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
