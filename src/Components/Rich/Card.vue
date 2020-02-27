<template>
    <div class="card" tabindex="0">
        <img v-if="imageUri" class="card-image" :src="imageUri" :alt="imageTitle || title">
        <div class="card-content">
            <div v-if="title" class="card-title">{{title}}</div>
            <div v-if="subtitle" class="card-subtitle">{{subtitle}}</div>
            <div v-if="text" class="card-text">{{text}}</div>
            <slot />
        </div>
    </div>
</template>

<style lang="sass" scoped>
.card
    background-color: var(--component-background)
    box-shadow: var(--shadow)
    border-radius: 12px

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
</style>

<script>
export default {
    name: 'Card',
    props: {
        text: {
            type: String,
            default: null
        },
        imageUri: {
            type: String,
            default: null
        },
        imageTitle: {
            type: String,
            default: null
        },
        subtitle: {
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