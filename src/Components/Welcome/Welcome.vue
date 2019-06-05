<template>
    <div class="overlay">
        <!-- Agent Icon -->
        <img :alt="app.displayName" class="app-icon" :src="app.avatarUri" v-if="app.avatarUri" />
        <img :alt="app.displayName" class="app-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" v-else />
        
        <!-- Agent Title -->
        <h1 class="app-title">{{(config.i18n[sel_lang] && config.i18n[sel_lang].welcomeTitle) || config.i18n[config.app.fallback_lang].welcomeTitle}} {{app.displayName}}</h1>

        <!-- Agent Description -->
        <p class="app-description">{{app.description}}</p>
        
        <!-- Language picker, when your Agent supports more than one Language -->
        <div v-if="app.supportedLanguageCodes && app.supportedLanguageCodes.length > 0">
            <span @click="sel_lang = app.defaultLanguageCode" class="language-picker" :class="{'picked': sel_lang == app.defaultLanguageCode}">
                {{ app.defaultLanguageCode | toLang }}
            </span>

            <span @click="sel_lang = language" class="language-picker" v-for="language in app.supportedLanguageCodes" :class="{'picked': sel_lang == language}">
                {{ language | toLang }}
            </span>
        </div>
    </div>
</template>

<style lang="sass" scoped>
.overlay
    text-align: center
    padding-top: 25px

.app-icon
    width: 120px
    height: 120px
    border-radius: 16px
    object-fit: cover

.app-title
    font-weight: 500
    font-size: 24px
    margin-top: 30px
    color: #202124
    line-height: 20px

.app-description
    font-size: 16px
    color: #5F6368

.language-picker
    display: inline-block
    border: 1px solid #E8EAED
    padding: 8px 12px
    border-radius: 40px
    cursor: pointer
    font-weight: 500
    margin-right: 2px

    &.picked
        background-color: #F1F3F4
        border: 1px solid #F1F3F4
</style>

<script>
const langs = require('langs')

export default {
    name: 'welcome',
    props: ['app'],
    data(){
        return {
            sel_lang: ''
        }
    },
    watch: {
        /* Save selected language */
        sel_lang(lang){
            if(this.history()) localStorage.setItem('lang', lang)

            else {
                this.config.app.fallback_lang = lang
            }
        }
    },
    /* Set default language on load (or fallback) */
    created(){
        if(this.app && this.app.defaultLanguageCode){
            this.sel_lang = this.app.defaultLanguageCode
        }

        else {
            this.sel_lang = this.config.app.fallback_lang
        }
    },
    filters: {
        /* This filter turns language code to the local language name using the langs dependency (example "en" -> "English") */
        toLang(code){
            return langs.where('1', code).local
        }
    }
}
</script>