<template>
    <header class="top-head">
        <div class="top-head-container">
            <img v-if="agent.avatarUri" class="top-head-icon" :alt="agent.displayName" :src="agent.avatarUri">
            <img v-else class="agent-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" :alt="agent.displayName">
            <div class="top-head-info">
                <div class="top-head-title">{{agent.displayName}}</div>
                <div class="top-head-subtitle">{{(translations[lang()] && translations[lang()].poweredBy) || translations[config.fallback_lang].poweredBy}} <a target="_blank" rel="noopener noreferrer" href="https://dialogflow.cloud.ushakov.co" aria-hidden="true">Dialogflow Gateway</a></div>
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
    z-index: 1

    @media screen and (max-width: 1000px)
        background-color: var(--background)

.top-head-container
    padding: 12px
    display: flex
    align-items: center
    flex: 1 0 0

.top-head-icon
    border-radius: 8px
    width: 30px
    height: 30px
    object-fit: cover
    background-color: var(--image-background)

.top-head-info
    display: inline-block
    margin-left: 12px

.top-head-title
    font-size: 18px
    font-weight: 500
    color: var(--text)
    line-height: 15px

.top-head-subtitle
    color: var(--text-secondary)
    font-size: 14px

    a[href]
        color: var(--text)
        text-decoration: none

.top-head-action
    @include reset
    display: flex
    margin: 8.5px 0
    padding: 8px
    background-color: var(--element-background)
    border-radius: 20px 0 0 20px
    cursor: pointer
    color: var(--text)
    transition: padding .25s cubic-bezier(.4, 0, .2, 1)

    &:hover
        padding-right: 20px
</style>

<script>
export default {
    name: 'TopHead',
    props: {
        agent: {
            type: Object,
            default: null
        }
    }
}
</script>
