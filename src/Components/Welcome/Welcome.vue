<template>
    <div class="overlay">
        <span class="app-welcome-emoji">🖖</span>
        
        <h1 class="app-title" v-if="app">{{config.i18n[sel_lang].welcomeTitle}} {{app.displayName}}</h1>
        <p class="app-description" v-if="app">{{app.description}}</p>
        
        <div v-if="app && app.supportedLanguageCodes.length > 0">
            <span>{{config.i18n[sel_lang].selectLang}}</span>

            <br>
            <span @click="sel_lang = app.defaultLanguageCode" class="language-pick" :class="{'picked': sel_lang == app.defaultLanguageCode}">
                {{app.defaultLanguageCode | toLang }}
            </span>

            <span @click="sel_lang = language" class="language-pick" v-for="language in app.supportedLanguageCodes" :class="{'picked': sel_lang == language}">
                {{ language | toLang }} 
            </span>
        </div>

        <br>
        <p class="notice">Sponsored by <a href="https://ushakov.co">Company</a>. Built by <a href="https://ushakov.co">Ushakov</a>. Powered by <a href="https://dialogflow.com">Dialogflow</a></p>
        
        <div class="button" @click="start()">{{config.i18n[sel_lang].startTitle}}</div>
    </div>
</template>

<style lang="sass" scoped>
.overlay
    z-index: 999
    text-align: center
    padding-top: 20px

.app-welcome-emoji
    font-size: 100px
    border-radius: 50%
    border: 1.5px solid rgba(0,0,0,.1)
    width: 120px
    height: 120px
    display: inline-block
    padding: 20px

.app-title
    font-weight: 600
    font-size: 32px
    margin-top: 30px

.app-description
    font-size: 18px
    opacity: .8

.button
    position: fixed
    left: 0
    bottom: 0
    width: 100%
    box-sizing: border-box
    text-transform: uppercase
    background-color: white
    font-weight: 600
    font-size: 20px
    padding: 15px
    transition: all .15s linear
    cursor: pointer
    box-shadow: 0 0px 8px 0 rgba(0,0,0,.08)
    color: rgba(0,0,0,.8)

.language-pick
    display: inline-block
    margin-top: 15px
    text-decoration: none
    border: 1.5px solid rgba(0,0,0,.1)
    padding: 10px 15px
    border-radius: 8px
    transition: all .15s linear
    cursor: pointer
    font-weight: 500
    margin-right: 5px

.picked
    background-color: #F1F3F4
    border: 1.5px solid #F1F3F4

.notice
    opacity: .8
    font-weight: 500
    padding: 0px 20px

    a
        color: black
</style>

<script>
const langs = require('langs')

export default {
    name: 'welcome',
    props: ['app'],
    data(){
        return {
            sel_lang: 'en'
        }
    },
    filters: {
        /* This filter turns language code to the local language name using the langs dependency (example "en" -> "English") */
        toLang(code){
            return langs.where("1", code).local
        }
    },
    methods: {
        start(){
            /* If pressed on start button, save the preferred language to localStorage */
            localStorage.setItem('lang', this.sel_lang)
            this.$emit('start')
        }
    }
}
</script>
