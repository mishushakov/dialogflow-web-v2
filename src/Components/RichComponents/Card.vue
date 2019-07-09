<template>
    <div class="card">
        <img class="card-image" v-if="image.imageUri" :src="image.imageUri" :alt="image.accessibilityText" />
        <div class="card-content">
            <div class="card-title" v-if="title">{{title}}</div>
            <div class="card-subtitle" v-if="subtitle">{{subtitle}}</div>
            <div class="card-text">{{text}}</div>

            <div class="card-buttons" v-if="buttons">
                <a class="card-button" target="_blank" rel="noopener noreferrer" :href="button.openUriAction.uri" v-for="button in buttons">
                    <i aria-hidden="true" class="material-icons card-button-icon">arrow_forward</i>
                    <span class="card-button-title">{{button.title}}</span>
                </a>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.card
    background-color: var(--component-background)
    box-shadow: var(--shadow)
    border-radius: 12px
    display: inline-block
    max-width: 300px
    margin-right: 10px
    margin-bottom: 10px

.card-image
    width: 100%
    height: auto
    object-fit: cover
    border-top-right-radius: 10px
    border-top-left-radius: 10px
    background-color: var(--image-background)

.card-content
    padding: 16px

.card-title
    font-weight: 500
    font-size: 20px
    color: var(--text)
    line-height: 24px
    overflow: hidden
    text-overflow: ellipsis

.card-subtitle
    font-size: 16px
    line-height: 24px
    color: var(--text-subtitle)

.card-text
    line-height: 24px
    font-size: 14px
    color: var(--text-secondary)
    white-space: normal

.card-buttons
    padding-top: 16px

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

    &:not(:first-child)
        margin-top: 12px

.card-button-icon
    left: 0
    margin-left: 12px
    position: absolute
</style>

<script>
export default {
    name: 'Card',
    props: ['title', 'subtitle', 'text', 'image', 'buttons']
}
</script>