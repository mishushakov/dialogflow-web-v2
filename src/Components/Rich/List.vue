<template>
    <div class="list">
        <div v-if="title" class="list-title">{{title}}</div>
        <div v-if="subtitle" class="list-subtitle">Subtitle</div>
        <ul :aria-label="title" class="list-content"><slot /></ul>
    </div>
</template>

<style lang="sass" scoped>
.list
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

    .list-content
        list-style-type: none
        margin: 0
        padding: 0
</style>

<script>
export default {
    name: 'List',
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