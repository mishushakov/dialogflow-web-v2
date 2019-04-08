<template>
    <header class="app-head">
        <img :alt="app.displayName" class="app-icon" :src="app.avatarUri" v-if="app.avatarUri" />
        <img :alt="app.displayName" class="app-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" v-else />
        <span class="app-name">{{app.displayName}}</span>
    </header>
</template>

<style lang="sass" scoped>
.app-head
    z-index: 666
    padding-left: 16px
    padding-top: 16px
    padding-bottom: 10px
    position: fixed
    width: 100%
    background-color: white
    transition: all .15s linear

    .app-icon
        border-radius: 50%
        width: 30px
        height: 30px
        object-fit: cover

    .app-name
        display: inline-block
        text-align: center
        margin-left: 10px
        transform: translateY(-8px)
        font-size: 18px
        font-weight: 500
        color: #202124
</style>

<script>
export default {
    name: 'TopHead',
    props: ['app']
}
</script>

