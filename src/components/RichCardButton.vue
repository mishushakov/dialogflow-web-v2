<template>
    <a class="rich-card-button" target="_blank" rel="noopener noreferrer" :href="uri">
        <i class="material-icons rich-card-button-icon" aria-hidden="true">{{uri ? 'arrow_forward' : 'reply'}}</i>
        <span class="rich-card-button-title">{{title}}</span>
    </a>
</template>

<style lang="sass" scoped>
.rich-card-button
    text-decoration: none
    line-height: 24px
    color: var(--text)
    border: 1px solid var(--border)
    border-radius: 40px
    display: block
    font-weight: 500
    padding: 8px 16px
    text-align: center
    position: relative
    margin-top: 16px
    cursor: pointer

    &[href]
        color: var(--accent)

.rich-card-button-icon
    left: 0
    margin-left: 12px
    position: absolute
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
