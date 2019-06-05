<template>
    <div class="card">
        <img class="card-image" v-if="image.imageUri" :src="image.imageUri" :alt="image.accessibilityText" />
        <div class="card-content">
            <div class="card-title" v-if="title">{{title}}</div>
            <div class="card-subtitle" v-if="subtitle">{{subtitle}}</div>
            <div class="card-text">{{text}}</div>

            <div class="card-buttons" v-if="button">
                <a class="card-button" target="_blank" rel="noopener noreferrer" :href="button.openUriAction.uri">
                    <i aria-hidden="true" class="material-icons card-button-icon">arrow_forward</i>
                    <span class="card-button-title">{{button.title}}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.card
    background-color: white
    box-shadow: 0 2px 6px 2px rgba(60,64,67,0.15)
    border-radius: 12px
    display: inline-block
    max-width: 300px
    margin-right: 10px

.card-image
    width: 100%
    height: auto
    object-fit: cover
    border-top-right-radius: 10px
    border-top-left-radius: 10px

.card-content
    padding: 16px

.card-title
    font-weight: 500
    font-size: 20px
    color: #202124
    line-height: 24px
    overflow: hidden
    text-overflow: ellipsis

.card-subtitle
    font-size: 16px
    line-height: 24px
    color: #757575

.card-text
    line-height: 24px
    font-size: 14px
    color: #5F6368
    white-space: normal

.card-buttons
    padding-top: 16px

.card-button
    text-decoration: none
    line-height: 24px
    color: #4285F4
    border: 1px solid lighten(#4285F4, 25%)
    border-radius: 40px
    display: block
    font-weight: 500
    padding: 8px 16px
    text-align: center
    position: relative

.card-button-icon
    left: 0
    margin-left: 12px
    position: absolute
</style>

<script>
export default {
    name: 'Card',
    props: ['title', 'subtitle', 'text', 'image', 'button']
}
</script>