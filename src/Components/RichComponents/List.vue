<template>
    <div class="list">
        <div class="list-title" v-if="title">{{title}}</div>
        <div class="list-subtitle" v-if="subtitle">Subtitle</div>
        <slot></slot>
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
</style>

<script>
export default {
    name: 'List',
    props: ['title', 'subtitle']
}
</script>