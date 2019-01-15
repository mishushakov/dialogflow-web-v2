<template>
    <main id="app">

        <!-- TopHead is the header with the information about the app -->
        <TopHead v-if="app" :app="app"></TopHead>

        <section class="container">

            <!-- Welcome component is for onboarding experience and language picker -->
            <Welcome v-if="messages.length == 0" :app="app" @start="send(config.i18n[lang()].startPhrase)"></Welcome>

            <!-- Messages Table -->
            <section class="messages" v-if="messages.length > 0">
                <table v-for="m in messages" class="chat-window">
                    <tr>
                        <!-- My message -->
                        <td><Bubble :text="m.query" from="me" /></td>
                    </tr>
                    
                    <!-- Component iterator (Dialogflow Gateway Feature) -->
                    <tr v-for="component in m.components">
                        <td>
                            <!-- Default / Webhook bubble -->
                            <Bubble :text="component.content" v-if="component.name == 'DEFAULT'" />

                            <!-- Simple Response -->
                            <Bubble :text="component.content.displayText || component.content.textToSpeech" v-if="component.name == 'SIMPLE_RESPONSE'" />
                            
                            <!-- Card -->
                            <Card :title="component.content.title" :subtitle="component.content.subtitle" :image="component.content.image" :text="component.content.formattedText" :button="component.content.buttons[0]" v-if="component.name == 'CARD'" />
                            
                            <!-- Carousel layout and cards -->
                            <div class="carousel" v-if="component.name == 'CAROUSEL_CARD'">
                                <Card v-for="card in component.content" @click.native="send(card.info.key)" :key="card.info.key" :title="card.title" :image="card.image" :subtitle="card.subtitle" :text="card.description" />
                            </div>

                            <!-- List -->
                            <List @select="send" :items="component.content.items" :title="component.content.title" v-if="component.name == 'LIST'" />

                            <!-- Webhook Image -->
                            <Picture v-if="component.name == 'IMAGE'" :image="component.content" />
                        </td>
                    </tr>
                </table>
            </section>
        </section>

        <!-- #bottom is the anchor, we need, when new messages arrive, to scroll down -->
        <div id="bottom"></div>

        <!-- ChatInput is made for submitting queres and displaying suggestions -->
        <ChatInput v-if="messages.length > 0" @submit="send" :suggestions="suggestions"></ChatInput>

        <!-- Audio toggle (on the top right corner), used to toggle the audio output, default mode is defined in the settings -->
        <div :aria-label="config.i18n[lang()].muteTitle" :title="config.i18n[lang()].muteTitle" class="audio-toggle" @click="config.app.muted = !config.app.muted">
            <i aria-hidden="true" class="material-icons" v-if="!config.app.muted">volume_up</i>
            <i aria-hidden="true" class="material-icons" v-else>volume_off</i>
        </div>
    </main>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700')

body
    margin: 0
    padding: 0
    font-family: Roboto, sans-serif
    font-display: swap
    background-color: white

.container
    max-width: 500px
    margin-left: auto
    margin-right: auto
    padding: 12px
    padding-top: 80px
    padding-bottom: 120px
    position: relative

@font-face
    font-family: 'Material Icons'
    font-style: normal
    font-weight: 400
    font-display: swap
    src: url(/assets/fonts/material-icons/material-icons.woff2) format('woff2')

.material-icons
    font-family: 'Material Icons'
    font-weight: normal
    font-style: normal
    font-size: 24px
    line-height: 1
    letter-spacing: normal
    text-transform: none
    display: inline-block
    white-space: nowrap
    word-wrap: normal
    direction: ltr
    -webkit-font-feature-settings: 'liga'
    -webkit-font-smoothing: antialiased
</style>

<style lang="sass" scoped>
.chat-window
    width: 100%

td
    width: 100%

.audio-toggle
    position: fixed
    top: 0
    right: 0
    margin: 8px
    z-index: 999
    padding: 10px
    background-color: #F1F3F4
    border-radius: 50%
    width: 24px
    height: 24px
    cursor: pointer
    color: rgba(0,0,0,.8)

.carousel
    overflow-x: scroll
    overflow-y: hidden
    white-space: nowrap
    -webkit-overflow-scrolling: touch
    padding-bottom: 20px
</style>

<script>
import Welcome from './../Welcome/Welcome.vue'
import TopHead from './../Partials/TopHead.vue'
import ChatInput from './../Partials/ChatInput.vue'

import Bubble from './../RichComponents/Bubble.vue'
import Card from './../RichComponents/Card.vue'
import List from './../RichComponents/List.vue'
import Picture from './../RichComponents/Picture.vue'

import * as uuidv1 from 'uuid/v1'
const session = uuidv1() // <- We need to set our session, to identify a conversation by dialogflow (for context etc.)

export default {
    name: 'app',
    components: {
        Welcome,
        TopHead,
        ChatInput,
        Bubble,
        Card,
        List,
        Picture
    },
    data(){
        return {
            app: null,
            messages: [],
            language: '',
            config: this.config
        }
    },
    created(){
        /* If history is enabled, the messages are retrieved from localStorage */
        if(localStorage.getItem('message_history') !== null && this.config.app.history == true){
            this.messages = JSON.parse(localStorage.getItem('message_history'))
        }
        
        /* Cache Agent (this will save you money on functions executions) */
        if(localStorage.getItem('agent') !== null){
            this.app = JSON.parse(localStorage.getItem('agent'))
        }
        else {
            fetch(this.config.app.gateway)
            .then((response) => {
                return response.json()
            })
            .then((agent) => {
                this.app = agent
                localStorage.setItem('agent', JSON.stringify(agent))
            })
        }
    },
    computed: {
        suggestions(){
            let last_message = this.messages[this.messages.length - 1].components
            let suggestions = []

            for (let component in last_message){
                if (last_message[component].name == 'SUGGESTIONS') suggestions.text_suggestions = last_message[component].content
                if (last_message[component].name == 'LINK_OUT_SUGGESTION') suggestions.link_suggestion = last_message[component].content
            }

            return suggestions // <- the code above is used to extract suggestions from last message, to be able to display it on ChatInput
        },
    },
    watch: {
        /* This function is triggered, when new messages arrive */
        messages(messages){
            setTimeout(() => {
                let app = document.querySelector('#app') // <- We need to scroll down #app, to prevent the whole page jumping to bottom, when using in iframe
                app.querySelector('#bottom').scrollIntoView({ 
                    behavior: 'smooth' 
                })
            }, 2) // <- wait for render (timeout) and then smoothly scroll #app down to #bottom selector, used as anchor

            if(this.config.app.history == true) localStorage.setItem('message_history', JSON.stringify(messages)) // <- Save history if the feature is enabled
        }
    },
    methods: {
        send(q){
            let request = {
                "q": q,
                "session_id": session,
                "lang": this.lang() // <- the request language is being set on the Welcome screen, make sure to inspect that as well.
            } // <- this is how a Dialogflow Gateway request looks like, by the way

            /* Make a request to gateway with formatting enabled */
            fetch(this.config.app.gateway + '?format=true', {method: 'POST', body: JSON.stringify(request), headers: {'content-type': 'application/json'}})
            .then((response) => {
                return response.json()
            })
            .then((response) => {
                this.messages.push(response)
                this.handle(response) // <- trigger the handle function (explanation below)
                //console.log(response) // <- (optional) log responses
            })
        },
        handle(response){
            /* This function is used for speech output */
            for (let component in response.components){
                let text // <- init a text variable

                /* Set the text variable according to component name */
                if(response.components[component].name == 'DEFAULT') text = response.components[component].content
                if(response.components[component].name == 'SIMPLE_RESPONSE') text = response.components[component].content.textToSpeech

                let speech = new SpeechSynthesisUtterance(text)
                speech.voiceURI = 'native' // <- change this, to get a different voice

                /* This "hack" is used to format our lang format, to some other lang format (example: en -> en_EN). Mainly for Safari, Firefox and Edge */
                speech.lang = this.lang() + '-' + this.lang().toUpperCase()

                if(this.config.app.muted == false) window.speechSynthesis.speak(speech) // <- if app is not muted, speak out the speech
            }
        }
    }
}
</script>