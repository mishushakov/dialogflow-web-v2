<template>
  <a
    class="rich-card-button"
    v-if="uri"
    target="_blank"
    rel="noopener noreferrer"
    :href="uri">
    <i class="material-icons rich-card-button-icon" aria-hidden="true">arrow_forward</i>
    <span class="rich-card-button-title">{{title || uri}}</span>
  </a>
  <button class="rich-card-button" v-else @click="$emit('click')">
    <i class="material-icons rich-card-button-icon" aria-hidden="true">reply</i>
    <span class="rich-card-button-title">{{title}}</span>
  </button>
</template>

<style lang="sass" scoped>
@import '@/style/mixins'

.rich-card-button
  @include reset
  display: flex
  text-decoration: none
  line-height: 24px
  color: var(--text-primary)
  border: var(--border)
  border-radius: 40px
  padding: 8px 12px
  cursor: pointer
  justify-content: space-between
  flex: 1

  &[href]
    color: var(--accent)

.rich-card-button-title
  flex: 1
  text-align: center
</style>

<script>
export default {
  name: 'RichCardButton',
  emits: ['click'],
  props: {
    uri: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    }
  }
}
</script>
