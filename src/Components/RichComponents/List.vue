<template>
    <div class="list">
        <div class="list-title" v-if="title.length > 0">{{title}}</div>
        <div class="item" v-for="item in items" @click="$emit('select', item.info.key)">
            <img class="item-image" v-if="item.image.imageUri.length > 0" :src="item.image.imageUri" :alt="item.image.accessibilityText" />
            <div class="item-content">
                <div class="item-title">{{item.title}}</div>
                <span class="item-description">{{item.description}}</span>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.list
    border-radius: 12px
    border: 1.5px solid rgba(0,0,0,.1)
    display: inline-block
    max-width: 300px
    padding-bottom: 10px
    padding-top: 10px

.item
    cursor: pointer
    padding: 12px
    overflow: hidden

    &:hover
        background-color: #F1F3F4

.list-title
    font-weight: 500
    font-size: 20px
    padding: 12px

.item-image
    border-radius: 8px
    height: 50px
    width: 50px
    object-fit: cover
    margin-right: 12px

.item-content
    display: inline-block
    vertical-align: top
    padding-right: 12px
    margin-top: 5px

.item-title
    font-weight: 500

.item-description
    opacity: .8
    font-size: 14px
</style>

<script>
export default {
    name: 'List',
    props: ['items', 'title']
}
</script>
