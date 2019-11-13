<template>
    <div class="overlay">
        <!-- Error Icon -->
        <i class="material-icons error-icon" aria-hidden="true">error</i>

        <!-- Error Description -->
        <pre class="error-description">{{error}}</pre>
    </div>
</template>

<style lang="sass" scoped>
.overlay
    text-align: center

.error-icon
    font-size: 128px
    color: var(--text)
    margin-bottom: 30px

.error-description
    font-size: 16px
    color: var(--text)
    background-color: var(--element-background)
    padding: 16px
    border-radius: 16px
    overflow: scroll
</style>

<script>
export default {
    name: 'Error',
    props: {
        error: {
            type: String,
            default: null
        }
    }
}
</script>