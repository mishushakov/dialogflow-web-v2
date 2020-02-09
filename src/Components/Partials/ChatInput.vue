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
                    @keypress.enter="submit({text: query})">

                <!-- Send message button (arrow button) -->
                <button
                    v-if="!micro && query.length > 0 || !microphone_allowed"
                    class="button"
                    :title="(config.i18n[lang()] && config.i18n[lang()].sendTitle) || config.i18n[config.app.fallback_lang].sendTitle"
                    :aria-label="(config.i18n[lang()] && config.i18n[lang()].sendTitle) || config.i18n[config.app.fallback_lang].sendTitle"
                    @click="submit({text: query})">
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
@import '@/Components/App/Mixins'

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
window.MediaRecorder = require('audio-recorder-polyfill')
export default {
    name: 'ChatInput',
    data(){
        return {
            query: '',
            micro: false,
            recognition: null,
            recorder: null
        }
    },
    computed: {
        /* Helper function to decide, whether allow microphone input */
        microphone_allowed(){
            if (this.recognition || this.recorder) return true
            return false
        }
    },
    watch: {
        /* Toggle microphone */
        micro(activate){
            /* Recognition is available */
            if (this.recognition){
                if (activate){
                    this.recognition.lang = this.lang()
                    this.recognition.start()
                }

                else this.recognition.abort()
            }

            /* Recorder is available */
            else if (this.recorder){
                if (activate) this.recorder.start()
                else this.recorder.stop()
            }
        }
    },
    created(){
        /* Set up recognition */
        if (window.webkitSpeechRecognition || window.SpeechRecognition){
            this.recognition = new window.webkitSpeechRecognition() || new window.SpeechRecognition()
            this.recognition.interimResults = true
            this.recognition.onresult = event => {
                for (let i = event.resultIndex; i < event.results.length; ++i){
                    this.query = event.results[i][0].transcript // <- push results to the Text input
                }
            }

            this.recognition.onend = () => {
                this.recognition.stop()
                this.micro = false
                this.submit({text: this.query}) // <- submit the result
            }
        }

        /* Set up recorder */
        else if (window.MediaRecorder){
            navigator.mediaDevices.getUserMedia({audio: true})
            .then(stream => {
                this.recorder = new window.MediaRecorder(stream)
                this.recorder.addEventListener('dataavailable', recording => {
                    const reader = new FileReader()
                    reader.readAsDataURL(recording.data)
                    reader.onloadend = () => {
                        this.submit({audio: reader.result.replace(/^data:.+;base64,/, '')})
                    }
                })
            })
        }
    },
    methods: {
        submit(submission){
            if (submission.text && submission.text.length > 0) this.$emit('submit', submission)
            else if (submission.audio) this.$emit('submit', submission)
            this.query = ''
        }
    }
}
</script>