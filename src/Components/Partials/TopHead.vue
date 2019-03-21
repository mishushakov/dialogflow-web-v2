<template>
    <header class="app-head" :class="{'shrink': shrinked}">
        <img :alt="app.displayName" class="app-icon" :src="app.avatarUri" v-if="app.avatarUri" />
        <img :alt="app.displayName" class="app-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" v-else />
        <span class="app-name">{{app.displayName}}</span>
    </header>
</template>

<style lang="sass" scoped>
.app-head
    z-index: 666
    padding-left: 15px
    padding-top: 15px
    padding-bottom: 10px
    position: fixed
    width: 100%
    box-shadow: 0 2px 8px 0 rgba(0,0,0,.08)
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
        opacity: .8

.shrink
    transform: translateY(-60px)
</style>

<script>
export default {
    name: 'TopHead',
    props: ['app'],
    data(){
        return {
            shrinked: false,
            current: 0
        }
    },
    created(){
        /* Add scroll listener and call handleScroll function, if user starts to scroll */
        window.addEventListener('scroll', this.handleScroll)
    },
    destroyed(){
        /* Destroy scroll listener */
        window.removeEventListener('scroll', this.handleScroll)
    },
    methods: {
        /* Trigger the function, when user is scrolling */
        handleScroll(){
            if(window.pageYOffset > 0 && window.pageYOffset > this.current){
                this.current = window.pageYOffset
                this.shrinked = true // <- shrink the toolbar if user scrolls down
            }
            if(window.pageYOffset > 0 && window.pageYOffset < this.current){
                this.current = window.pageYOffset
                this.shrinked = false // <- unshrink the toolbar if user scrolls up
            }
        }
    }
}
</script>

