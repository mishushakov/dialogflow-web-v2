<template>
  <header class="top-head">
    <div class="top-head-container">
      <img class="top-head-icon" src="../assets/img/DrPresente_v2.png" :alt="agent.displayName" />
      <div class="top-head-info">
        <div class="top-head-title">dr.presente</div>
        <div class="top-head-subtitle">Outubro Rosa - Previna-se</div>
      </div>
    </div>
    <slot />
  </header>
</template>

<style lang="sass" scoped>
@import '@/style/mixins'

.top-head
  position: fixed
  width: 100%
  display: flex
  background-color: #ffffff
  z-index: 2
  top: 0
  height: 60px

  @media screen and (max-width: 1000px)
    background-color: #ffffff

.top-head-container
  padding: 12px
  display: flex
  align-items: center
  flex: 1 0 0

.top-head-icon
  width: 30px
  height: 40px
  object-fit: cover

.top-head-info
  display: inline-block
  margin-left: 12px

.top-head-title
  font-size: 18px
  color: var(--text-title)
  line-height: 15px

.top-head-subtitle
  color: var(--text-title)
  font-size: 14px

a[href]
  color: var(--text-title)
  text-decoration: none
</style>

<script>
export default {
  name: "TopHead",
  props: {
    agent: {
      type: Object,
      default: null
    }
  }
};
</script>
