<template>
    <div class="bottomchat">
        <div class="container">
            <!-- Here are the suggestions -->
            <div class="suggestions"><slot /></div>
            <div class="flexible">
                <!-- Text input -->
                <input
                    v-model="query"
                    class="input"
                    type="text"
                    :placeholder="(config.i18n[lang()] && config.i18n[lang()].inputTitle) || config.i18n[config.app.fallback_lang].inputTitle"
                    :aria-label="(config.i18n[lang()] && config.i18n[lang()].inputTitle) || config.i18n[config.app.fallback_lang].inputTitle"
                    @keypress.enter="submit()">

                <!-- Send message button (arrow button) -->
                <button
                    v-if="!micro && query.length > 0 || !recognition"
                    class="button"
                    :title="(config.i18n[lang()] && config.i18n[lang()].sendTitle) || config.i18n[config.app.fallback_lang].sendTitle"
                    :aria-label="(config.i18n[lang()] && config.i18n[lang()].sendTitle) || config.i18n[config.app.fallback_lang].sendTitle"
                    @click="submit()">
                    <i class="material-icons" aria-hidden="true">arrow_upward</i>
                </button>

                <!-- Microphone Button -->
                <button
                    v-else
                    class="button"
                    :aria-label="(config.i18n[lang()] && config.i18n[lang()].microphoneTitle) || config.i18n[config.app.fallback_lang].microphoneTitle"
                    :title="(config.i18n[lang()] && config.i18n[lang()].microphoneTitle) || config.i18n[config.app.fallback_lang].microphoneTitle"
                    :class="{'mic_active': micro}"
                    @click="micro = !micro">
                    <i class="material-icons" aria-hidden="true">mic</i>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import './../App/Mixins.sass'

.bottomchat
    position: fixed
    bottom: 0
    left: 0
    width: 100%
    background-color: var(--background)

.flexible
    display: flex

.suggestions
    overflow-x: scroll
    overflow-y: hidden
    white-space: nowrap
    -webkit-overflow-scrolling: touch

    &::-webkit-scrollbar
        display: none

.input
    font-size: 16px
    font-weight: 500
    width: 100%
    box-sizing: border-box
    border: none
    padding: 10px 12px
    color: var(--text)
    border-radius: 40px
    flex: 1 0 0
    background-color: var(--element-background)

    &:focus
        background-color: transparent

.button
    @include reset
    padding: 8px
    margin-left: 6px
    border-radius: 50%
    cursor: pointer
    background-color: var(--element-background)
    color: var(--text)
    font-size: 24px
    display: flex

    &.mic_active
        background-color: #F44336
        color: white
</style>

<script>
export default {
    name: 'ChatInput',
    data(){
        return {
            query: '',
            micro: false,
            recognition: null
        }
    },
    watch: {
        /* This function triggers when user clicks on the microphone button */
        micro(bool){
            if (bool){
                /* When value is true, start voice recognition */
                this.recognition.start()
                this.recognition.onresult = event => {
                    for (let i = event.resultIndex; i < event.results.length; ++i){
                        this.query = event.results[i][0].transcript // <- push results to the Text input
                    }
                }

                this.recognition.onend = () => {
                    this.recognition.stop()
                    this.micro = false
                    this.submit(this.query) // <- submit the result
                }
            }

            else {
                this.recognition.abort() // <- if user stops the recognition, abort it (in V1 this prevented users from starting a new recording)
            }
        }
    },
    created(){
        if (window.webkitSpeechRecognition || window.SpeechRecognition){
            this.recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition()
            this.recognition.interimResults = true
            this.recognition.lang = this.lang()
        }
    },
    methods: {
        submit(){
            if (this.query.length > 0){
                this.$emit('submit', this.query)
                this.query = ''
            }
        }
    }
}
</script>