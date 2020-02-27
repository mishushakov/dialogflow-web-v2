<template>
    <div class="media">
        <img v-if="iconUri" class="media-image" :src="iconUri" :alt="iconTitle">
        <div class="media-content">
            <div v-if="name" class="media-title">{{name}}</div>
            <div v-if="description" class="media-subtitle">{{description}}</div>
        </div>
        <audio class="media-controls" controls :src="uri" />
    </div>
</template>

<style lang="sass" scoped>
.media
    padding: 16px
    border-radius: 12px
    background-color: var(--component-background)
    box-shadow: var(--shadow)

.media-title
    font-weight: 500
    font-size: 20px
    line-height: 30px
    color: var(--text)

.media-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.media-content
    display: inline-block
    vertical-align: top
    margin-top: 2.5px
    max-width: 70%

.media-image
    border-radius: 12px
    height: 50px
    width: 50px
    object-fit: cover
    margin-left: 16px
    float: right
    background-color: var(--image-background)

.media-controls
    padding-top: 16px
    width: 100%
</style>

<script>
export default {
    name: 'Media',
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