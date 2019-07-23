<template>
    <a class="list-item" :href="uri" target="_blank" rel="noopener noreferrer">
        <img class="list-item-image" v-if="imageUri" :src="imageUri" :alt="imageTitle" />
        <div class="list-item-content">
            <div class="list-item-title">{{title}}</div>
            <span class="list-item-description">{{description}}</span>
            <span class="list-item-footer">{{footer}}</span>
        </div>
    </a>
</template>

<style lang="sass" scoped>
.list-item
    cursor: pointer
    overflow: hidden
    padding-top: 16px
    padding-bottom: 16px
    border-bottom: 1px solid var(--border)
    display: block

    &:last-child
        border-bottom: none
        padding-bottom: 0px

.list-item-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--image-background)

.list-item-content
    display: inline-block
    vertical-align: top
    margin-top: 2.5px
    max-width: 70%

.list-item-title
    font-weight: 500
    color: var(--text)
    line-height: 24px

.list-item-description
    color: var(--text-subtitle)
    line-height: 20px
    font-size: 14px

.list-item-footer
    color: var(--text-secondary)
    margin-top: 6px
    font-size: 12px
    display: block
</style>

<script>
export default {
    name: 'ListItem',
    props: ['imageUri', 'imageTitle', 'title', 'description', 'footer', 'uri']
}
</script>