<template>
    <div class="list">
        <div class="list-title" v-if="title">{{title}}</div>
        <div class="list-subtitle">Subtitle</div>
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
    background-color: white
    box-shadow: 0 2px 6px 2px rgba(60,64,67,0.15)

.list-title
    font-weight: 500
    font-size: 20px
    line-height: 30px
    color: #202124

.list-subtitle
    line-height: 24px
    color: #70757A

.list-item
    cursor: pointer
    overflow: hidden
    padding-top: 16px
    padding-bottom: 16px
    border-bottom: 1px solid #E5E5E5

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

.list-item-content
    display: inline-block
    vertical-align: top
    margin-top: 2.5px

.list-item-title
    font-weight: 500
    color: #202124
    line-height: 24px

.list-item-description
    color: #5F6368
    line-height: 20px
    font-size: 14px
</style>

<script>
export default {
    name: 'List',
    props: ['items', 'title']
}
</script>