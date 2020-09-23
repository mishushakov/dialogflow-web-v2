<template>
  <!-- <button class="top-head-action" :title="title" :aria-label="title">
    <i aria-hidden="true" class="material-icons">{{icon}}</i>
  </button>-->
  <img class="laco-oncologia" src="../assets/img/laço_rosa.png" height="40px" alt />
</template>

<style lang="sass" scoped>
@import '@/style/mixins'

.top-head-action
  display: flex
  margin: 8px 0
  padding: 10px 14px
  border-radius: 40px 0 0 40px
  border: var(--border)
  border-right: none
  cursor: pointer
  background-color: transparent
  color: #fea8b3
  transition: padding .25s var(--animation-timing)

  &:hover
    padding-right: 20px

.laco-oncologia
  display: flex 
  margin: 8px 0 
  padding: 0px 12px
</style>

<script>
export default {
  name: "TopHeadAction",
  props: {
    title: {
      type: String,
      default: ""
    },
    icon: {
      type: String,
      default: ""
    }
  }
};
</script>
