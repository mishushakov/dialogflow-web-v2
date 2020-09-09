<template>
    <div class="error-message">
        <i class="material-icons error-message-icon" aria-hidden="true">error</i>
        <div class="error-message-description">{{message}}</div>
    </div>
</template>

<style lang="sass" scoped>
.error-message
    text-align: center

.error-message-icon
    font-size: 48px
    color: var(--text-element)
    margin-bottom: 30px

.error-message-description
    font-size: 16px
    color: var(--text-element)
    word-wrap: break-word
</style>

<script>
export default {
    name: 'ErrorMessage',
    props: {
        message: {
            type: String,
            default: null
        }
    }
}
</script>
