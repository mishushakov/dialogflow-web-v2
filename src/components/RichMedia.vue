<template>
    <div class="rich-media">
        <div class="rich-media-head">
            <div class="rich-media-info">
                <div v-if="name" class="rich-media-title">{{name}}</div>
                <div v-if="description" class="rich-media-subtitle">{{description}}</div>
            </div>
            <img v-if="iconUri" class="rich-media-image" :src="iconUri" :alt="iconTitle">
        </div>
        <audio class="rich-media-controls" controls :src="uri" />
    </div>
</template>

<style lang="sass" scoped>
.rich-media
    padding: 16px
    border-radius: 12px
    background-color: var(--background-component)
    box-shadow: var(--shadow)

.rich-media-title
    font-size: 20px
    line-height: 30px
    color: var(--text-title)

.rich-media-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.rich-media-head
    display: flex
    margin-top: 2.5px
    align-items: flex-start

.rich-media-info
    flex: 1

.rich-media-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--background-image)

.rich-media-controls
    padding-top: 16px
    width: 100%
</style>

<script>
export default {
    name: 'RichMedia',
    props: {
        name: {
            type: String,
            default: null
        },
        description: {
            type: String,
            default: null
        },
        iconUri: {
            type: String,
            default: null
        },
        iconTitle: {
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
