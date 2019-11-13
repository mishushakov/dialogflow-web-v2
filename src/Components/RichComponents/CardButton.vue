<template>
    <a class="card-button" target="_blank" rel="noopener noreferrer" :href="uri">
        <i class="material-icons card-button-icon" aria-hidden="true">arrow_forward</i>
        <span class="card-button-title">{{title}}</span>
    </a>
</template>

<style lang="sass" scoped>
.card-button
    text-decoration: none
    line-height: 24px
    color: var(--accent)
    border: 1px solid var(--border)
    border-radius: 40px
    display: block
    font-weight: 500
    padding: 8px 16px
    text-align: center
    position: relative
    margin-top: 16px

.card-button-icon
    left: 0
    margin-left: 12px
    position: absolute
</style>

<script>
export default {
    name: 'CardButton',
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