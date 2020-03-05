<template>
    <div class="overlay">
        <!-- Agent Icon -->
        <img v-if="app.avatarUri" class="app-icon" :alt="app.displayName" :src="'https://storage.googleapis.com/cloudprod-apiai/' + app.avatarUri">
        <img v-else class="app-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" :alt="app.displayName">

        <!-- Agent Title -->
        <h1 class="app-title">{{(translations[sel_lang] && translations[sel_lang].welcomeTitle) || translations[config.fallback_lang].welcomeTitle}} {{app.displayName}}</h1>

        <!-- Agent Description -->
        <p class="app-description">{{app.description}}</p>

        <!-- Language picker, when your Agent supports more than one Language -->
        <div v-if="app.supportedLanguageCodes && app.supportedLanguageCodes.length > 0">
            <button class="language-picker" role="checkbox" :class="{'picked': sel_lang == app.defaultLanguageCode}" @click="sel_lang = app.defaultLanguageCode">
                {{app.defaultLanguageCode | toLang}}
            </button>
            <button
                v-for="language in app.supportedLanguageCodes"
                :key="language"
                class="language-picker"
                role="checkbox"
                :class="{'picked': sel_lang == language}"
                @click="sel_lang = language">
                {{language | toLang}}
            </button>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '@/Style/Mixins'

.overlay
    text-align: center
    padding-top: 25px

.app-icon
    width: 120px
    height: 120px
    border-radius: 16px
    object-fit: cover
    background-color: var(--image-background)

.app-title
    font-weight: 500
    font-size: 24px
    margin-top: 30px
    color: var(--text)
    line-height: 20px

.app-description
    font-size: 16px
    color: var(--text-secondary)

.language-picker
    @include reset
    display: inline-block
    border: 1px solid var(--border)
    padding: 8px 12px
    border-radius: 40px
    cursor: pointer
    font-weight: 500
    margin-right: 2px
    color: var(--text)

    &.picked
        background-color: var(--element-background)
        border: 1px solid var(--element-background)
</style>

<script>
const langs = require('langs')

export default {
    name: 'Welcome',
    filters: {
        /* This filter turns language code to the local language name using the langs dependency (example "en" -> "English") */
        toLang(code){
            return langs.where('1', code).local
        }
    },
    props: {
        app: {
            type: Object,
            required: true
        }
    },
    data(){
        return {
            sel_lang: ''
        }
    },
    watch: {
        /* Save selected language */
        sel_lang(lang){
            if (this.history()) sessionStorage.setItem('lang', lang)

            else {
                this.config.fallback_lang = lang
            }
        }
    },
    /* Set default language on load (or fallback) */
    created(){
        if (this.app && this.app.defaultLanguageCode){
            this.sel_lang = this.app.defaultLanguageCode
        }

        else {
            this.sel_lang = this.config.fallback_lang
        }
    }
}
</script>