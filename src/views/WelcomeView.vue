<template>
    <div class="welcome-view">
        <!-- Agent Icon -->
        <img v-if="agent.avatarUri" class="agent-icon" :alt="agent.displayName" :src="agent.avatarUri">
        <img v-else class="agent-icon" src="https://console.dialogflow.com/api-client/assets/img/logo-short.png" :alt="agent.displayName">

        <!-- Agent Title -->
        <div class="agent-title">{{agent.displayName}}</div>

        <!-- Agent Description -->
        <div class="agent-description">{{agent.description}}</div>

        <!-- Language picker, if your Agent supports more than one language -->
        <div v-if="agent.supportedLanguageCodes && agent.supportedLanguageCodes.length > 0" class="language-picker">
            <select v-model="sel_lang" :aria-label="(translations[lang()] && translations[lang()].selectLanguageTitle) || translations[config.fallback_lang].selectLanguageTitle">
                <option :value="agent.defaultLanguageCode">{{agent.defaultLanguageCode | toLang}}</option>
                <option v-for="language in agent.supportedLanguageCodes" :key="language" :value="language">{{language | toLang}}</option>
            </select>
            <i aria-hidden="true" class="material-icons">arrow_drop_down</i>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '@/style/mixins'

.welcome-view
    text-align: center
    display: flex
    flex-direction: column
    align-items: center

.agent-icon
    width: 120px
    height: 120px
    object-fit: cover

.agent-title
    font-size: 24px
    margin-top: 30px
    color: var(--text-title)
    line-height: 20px

.agent-description
    font-size: 16px
    color: var(--text-secondary)
    padding-top: 10px
    padding-bottom: 20px

.language-picker
    display: inline-flex
    border: var(--border)
    border-radius: 40px
    cursor: pointer
    margin-right: 2px
    color: var(--text-primary)
    align-items: center

    select
        @include reset
        width: 100%
        padding: 8px 12px
        margin-right: -24px
        padding-right: 24px

    i
        pointer-events: none
</style>

<script>
import * as langs from 'langs'

export default {
    name: 'WelcomeView',
    filters: {
        /* This filter turns language code to the local language name using the langs dependency (example "en" -> "English") */
        toLang(code){
            return langs.where('1', code.substring(0, 2)).local
        }
    },
    props: {
        agent: {
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
        if (this.agent && this.agent.defaultLanguageCode){
            this.sel_lang = this.agent.defaultLanguageCode
        }

        else {
            this.sel_lang = this.config.fallback_lang
        }
    }
}
</script>
