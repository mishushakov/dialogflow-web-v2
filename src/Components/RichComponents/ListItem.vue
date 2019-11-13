<template>
    <li class="list-item" tabindex="0">
        <img v-if="imageUri" class="list-item-image" :src="imageUri" :alt="imageTitle">
        <a
            class="list-item-content"
            target="_blank"
            rel="noopener noreferrer"
            :href="uri">
            <div class="list-item-title">{{title}}</div>
            <span class="list-item-description">{{description}}</span>
            <span class="list-item-footer">{{footer}}</span>
        </a>
    </li>
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
        padding-bottom: 0

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
        text-decoration: none

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
    props: {
        imageUri: {
            type: String,
            default: null
        },
        imageTitle: {
            type: String,
            default: null
        },
        title: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        footer: {
            type: String,
            default: null
        },
        uri: {
            type: String,
            default: null
        }
    }
}
</script>