<template>
    <div class="rich-media">
        <img v-if="iconUri" class="rich-media-image" :src="iconUri" :alt="iconTitle">
        <div class="rich-media-content">
            <div v-if="name" class="rich-media-title">{{name}}</div>
            <div v-if="description" class="rich-media-subtitle">{{description}}</div>
        </div>
        <audio class="rich-media-controls" controls :src="uri" />
    </div>
</template>

<style lang="sass" scoped>
.rich-media
    padding: 16px
    border-radius: 12px
    background-color: var(--component-background)
    box-shadow: var(--shadow)

.rich-media-title
    font-weight: 500
    font-size: 20px
    line-height: 30px
    color: var(--text)

.rich-media-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.rich-media-content
    display: inline-block
    vertical-align: top
    margin-top: 2.5px
    max-width: 70%

.rich-media-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--image-background)

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
