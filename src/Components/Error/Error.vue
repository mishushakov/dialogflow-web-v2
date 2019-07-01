<template>
    <div class="overlay">
        <!-- Error Icon -->
        <i aria-hidden="true" class="material-icons error-icon">error</i>

        <!-- Error Description -->
        <pre class="error-description">{{error}}</pre>
    </div>
</template>

<style lang="sass" scoped>
.overlay
    text-align: center

.error-icon
    font-size: 128px
    color: #202124
    margin-bottom: 30px

.error-description
    font-size: 16px
    color: #202124
    background-color: #F1F3F4
    padding: 16px
    border-radius: 16px
    overflow: scroll
</style>

<script>
export default {
    name: 'error',
    props: ['error']
}
</script>