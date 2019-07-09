<template>
    <header class="app-head">
        <img :alt="app.displayName" class="app-icon" :src="app.avatarUri" v-if="app.avatarUri" />
        <img :alt="app.displayName" class="app-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" v-else />
        
        <div class="app-info">
            <div class="app-name">{{app.displayName}}</div>
            <div class="app-poweredby">Built with <a target="_blank" rel="noopener noreferrer" href="https://dialogflow.cloud.ushakov.co">Dialogflow Gateway</a></div>
        </div>
    </header>
</template>

<style lang="sass" scoped>
.app-head
    z-index: 666
    padding: 16px
    position: fixed
    width: 100%
    background-color: var(--background)

    .app-icon
        border-radius: 8px
        width: 30px
        height: 30px
        object-fit: cover
        background-color: var(--image-background)

    .app-info
        display: inline-block
        margin-left: 10px

        .app-name
            font-size: 18px
            font-weight: 500
            color: var(--text)

        .app-poweredby
            color: var(--text-secondary)
            font-size: 14px

            a[href]
                color: var(--text)
                text-decoration: none
</style>

<script>
export default {
    name: 'TopHead',
    props: ['app']
}
</script>