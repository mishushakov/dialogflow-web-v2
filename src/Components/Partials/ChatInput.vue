<template>
    <div class="bottomchat">
        <div class="container">
            <!-- Here are the suggestions -->
            <div class="suggestions"><slot></slot></div>
            <div class="flexible">
                <!-- Text input -->
                <div class="input-container">
                    <input :aria-label="(config.i18n[lang()] && config.i18n[lang()].inputTitle) || config.i18n[config.app.fallback_lang].inputTitle" class="input" type="text" :placeholder="(config.i18n[lang()] && config.i18n[lang()].inputTitle) || config.i18n[config.app.fallback_lang].inputTitle" v-model="query" @keypress.enter="submit()" />
                </div>

                <!-- Send message button (arrow button) -->
                <div :aria-label="(config.i18n[lang()] && config.i18n[lang()].sendTitle) || config.i18n[config.app.fallback_lang].sendTitle" :title="(config.i18n[lang()] && config.i18n[lang()].sendTitle) || config.i18n[config.app.fallback_lang].sendTitle" class="button-container" v-if="!micro && query.length > 0" @click="submit()">
                    <i class="material-icons" aria-hidden="true">arrow_upward</i>
                </div>

                <!-- Microphone Button -->
                <div :aria-label="(config.i18n[lang()] && config.i18n[lang()].microphoneTitle) || config.i18n[config.app.fallback_lang].microphoneTitle" :title="(config.i18n[lang()] && config.i18n[lang()].microphoneTitle) || config.i18n[config.app.fallback_lang].microphoneTitle" class="button-container mic_button" :class="{'mic_active': micro}" @click="micro = !micro" v-else>
                    <i class="material-icons" aria-hidden="true">mic</i>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
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

.input-container
    width: 100%
    padding: 8px
    box-sizing: border-box
    border-radius: 40px
    flex: 1 0 0
    background-color: var(--element-background)

.input
    font-size: 16px
    font-weight: 500
    width: 100%
    box-sizing: border-box
    background-color: transparent
    border: none
    outline: none
    padding-left: 8px
    padding-right: 8px
    color: var(--text)

.button-container
    padding: 8px
    width: 24px
    height: 24px
    margin-left: 6px
    border-radius: 50%
    cursor: pointer
    background-color: black
    color: white

    &.mic_button
        background-color: var(--element-background)
        color: var(--text)
        font-size: 24px

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
    created(){
        if(window.webkitSpeechRecognition || window.SpeechRecognition){
            this.recognition = new webkitSpeechRecognition() || new SpeechRecognition()
            this.recognition.interimResults = true
            this.recognition.lang = this.lang()
        }
    },
    watch: {
        /* This function triggers when user clicks on the microphone button */
        micro(bool){
            if(bool){
                /* When value is true, start voice recognition */
                this.recognition.start()
                this.recognition.onresult = (event) => {
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
    methods: {
        submit(){
            if(this.query.length > 0){
                this.$emit('submit', this.query)
                this.query = ''
            }
        }
    }
}
</script>