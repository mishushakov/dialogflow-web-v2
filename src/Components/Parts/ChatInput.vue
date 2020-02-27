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
                    :placeholder="(translations[lang()] && translations[lang()].inputTitle) || translations[config.fallback_lang].inputTitle"
                    :aria-label="(translations[lang()] && translations[lang()].inputTitle) || translations[config.fallback_lang].inputTitle"
                    @keypress.enter="submit({text: query})"
                    @focus="microphone = false; should_listen = false">

                <!-- Send message button (arrow button) -->
                <button
                    v-if="!microphone && query.length > 0 || !microphone_allowed"
                    class="button"
                    :title="(translations[lang()] && translations[lang()].sendTitle) || translations[config.fallback_lang].sendTitle"
                    :aria-label="(translations[lang()] && translations[lang()].sendTitle) || translations[config.fallback_lang].sendTitle"
                    @click="submit({text: query})">
                    <i class="material-icons" aria-hidden="true">arrow_upward</i>
                </button>

                <!-- Microphone Button -->
                <button
                    v-else
                    class="button"
                    :aria-label="(translations[lang()] && translations[lang()].microphoneTitle) || translations[config.fallback_lang].microphoneTitle"
                    :title="(translations[lang()] && translations[lang()].microphoneTitle) || translations[config.fallback_lang].microphoneTitle"
                    :class="{'mic_active': microphone}"
                    @click="microphone = !microphone">
                    <i class="material-icons" aria-hidden="true">mic</i>
                </button>
            </div>
        </div>
    </div>
</template>

<style lang="sass" scoped>
@import '@/Style/Mixins'

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
            microphone: false,
            recognition: null,
            recorder: null,
            should_listen: true
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
        microphone(activate){
            if (activate){
                this.should_listen = true
                if (this.recognition){
                    this.recognition.lang = this.lang()
                    this.recognition.start()
                }

                else if (this.recorder) this.recorder.start()
            }

            else if (this.recognition) this.recognition.abort()
            else if (this.recorder) this.recorder.stop()
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
                this.microphone = false
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
        listen(){
            if (this.should_listen) this.microphone = true
        },
        submit(submission){
            if (submission.text && submission.text.length > 0) this.$emit('submit', submission)
            else if (submission.audio) this.$emit('submit', submission)
            this.query = ''
        }
    }
}
</script>