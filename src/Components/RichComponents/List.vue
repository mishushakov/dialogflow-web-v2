<template>
    <div class="list">
        <div class="list-title" v-if="title">{{title}}</div>
        <div class="list-subtitle" v-if="subtitle">Subtitle</div>
        <div class="list-item" v-for="item in items" @click="$emit('select', item.info.key)">
            <img class="list-item-image" v-if="item.image.imageUri" :src="item.image.imageUri" :alt="item.image.accessibilityText" />
            <div class="list-item-content">
                <div class="list-item-title">{{item.title}}</div>
                <span class="list-item-description">{{item.description}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.list
    display: inline-block
    max-width: 300px
    padding: 16px
    border-radius: 12px
    background-color: var(--component-background)
    box-shadow: var(--shadow)

.list-title
    font-weight: 500
    font-size: 20px
    line-height: 30px
    color: var(--text)

.list-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.list-item
    cursor: pointer
    overflow: hidden
    padding-top: 16px
    padding-bottom: 16px
    border-bottom: 1px solid var(--border)

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

.list-item-title
    font-weight: 500
    color: var(--text)
    line-height: 24px

.list-item-description
    color: var(--text-secondary)
    line-height: 20px
    font-size: 14px
</style>

<script>
export default {
    name: 'List',
    props: ['items', 'title', 'subtitle']
}
</script>