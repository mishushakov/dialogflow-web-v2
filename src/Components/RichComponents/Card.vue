<template>
    <div class="card">
        <img class="card-image" v-if="image.imageUri.length > 0" :src="image.imageUri" :alt="image.accessibilityText" />
        <div class="card-content">
            <div class="card-title" v-if="title">{{title}}</div>
            <div class="card-subtitle" v-if="subtitle">{{subtitle}}</div>

            <div class="card-text">{{text}}</div>
            <div class="card-buttons" v-if="button">
                <a class="card-button" target="_blank" rel="noopener noreferrer" :href="button.openUriAction.uri">{{button.title}}</a>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.card
    border: 1.5px solid rgba(0,0,0,.1)
    border-radius: 12px
    display: inline-block
    max-width: 300px
    margin-top: 5px
    margin-right: 5px

.card-image
    width: 100%
    height: auto
    object-fit: cover
    border-top-right-radius: 10px
    border-top-left-radius: 10px

.card-content
    padding: 12px

.card-title
    font-weight: 500
    font-size: 20px

.card-subtitle
    text-transform: uppercase
    font-size: 14px
    font-weight: 600
    opacity: .7
    margin-bottom: 12px
    margin-top: 5px

.card-text
    opacity: .8
    white-space: normal

.card-buttons
    margin-top: 12px

.card-button
    color: black
    text-transform: uppercase
    text-decoration: none
    font-weight: 500
</style>

<script>
export default {
    name: 'Card',
    props: ['title', 'subtitle', 'text', 'image', 'button']
}
</script>
