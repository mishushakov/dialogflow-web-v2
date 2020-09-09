<template>
    <div class="rich-list">
        <div v-if="title" class="rich-list-title">{{title}}</div>
        <div v-if="subtitle" class="rich-list-subtitle">Subtitle</div>
        <ul :aria-label="title" class="rich-list-content"><slot /></ul>
    </div>
</template>

<style lang="sass" scoped>
.rich-list
    padding: 16px
    border-radius: 12px
    background-color: var(--background-component)
    box-shadow: var(--shadow)

.rich-list-title
    font-size: 20px
    line-height: 30px
    color: var(--text-title)

.rich-list-subtitle
    line-height: 24px
    color: var(--text-subtitle)

.rich-list-content
    rich-list-style-type: none
    margin: 0
    padding: 0
</style>

<script>
export default {
    name: 'RichList',
    props: {
        title: {
            type: String,
            default: null
        },
        subtitle: {
            type: String,
            default: null
        }
    }
}
</script>
