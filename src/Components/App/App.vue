<template>
    <main id="app">
        <!-- TopHead is the header with the information about the app -->
        <TopHead v-if="app && messages.length > 0" :app="app">
            <!-- Audio toggle (on the top right corner), used to toggle the audio output, default mode is defined in the settings -->
            <button
                class="audio-toggle"
                :title="muted ? (config.i18n[lang()] && config.i18n[lang()].unMuteTitle) || config.i18n[config.app.fallback_lang].unMuteTitle : (config.i18n[lang()] && config.i18n[lang()].muteTitle) || config.i18n[config.app.fallback_lang].muteTitle"
                :aria-label="muted ? (config.i18n[lang()] && config.i18n[lang()].unMuteTitle) || config.i18n[config.app.fallback_lang].unMuteTitle : (config.i18n[lang()] && config.i18n[lang()].muteTitle) || config.i18n[config.app.fallback_lang].muteTitle"
                @click="muted = !muted">
                <i aria-hidden="true" class="material-icons">{{muted ? 'volume_off': 'volume_up'}}</i>
            </button>
        </TopHead>
        <section class="container chat-container">
            <!-- Error component is for displaying errors -->
            <Error v-if="error" :error="error" />

            <!-- Welcome component is for onboarding experience and language picker -->
            <Welcome v-if="app && messages.length == 0" :app="app" />

            <!-- Messages Table -->
            <section v-else aria-live="polite">
                <div v-for="m in messages" :key="m.responseId" class="message">
                    <!-- My message -->
                    <BubbleWrapper><Bubble me :text="m.queryResult.queryText" /></BubbleWrapper>

                    <!-- Dialogflow Components -->
                    <div v-for="(component, id) in m.queryResult.fulfillmentMessages" :key="id" class="component">
                        <!-- Text (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#Text) -->
                        <Bubble v-if="component.text" :text="component.text.text[0]" />

                        <!-- SimpleResponses (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#SimpleResponses) -->
                        <Bubble
                            v-if="component.simpleResponses"
                            :text="component.simpleResponses.simpleResponses[0].displayText || component.simpleResponses.simpleResponses[0].textToSpeech"
                        />

                        <!-- Card (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#Card) -->
                        <Card
                            v-if="component.card"
                            :title="component.card.title"
                            :subtitle="component.card.subtitle"
                            :image-uri="component.card.imageUri">
                            <CardButton
                                v-for="button in component.card.buttons"
                                :key="button.text"
                                :uri="button.postback"
                                :title="button.text"
                            />
                        </Card>

                        <!-- BasicCard (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#BasicCard) -->
                        <Card
                            v-if="component.basicCard"
                            :title="component.basicCard.title"
                            :subtitle="component.basicCard.subtitle"
                            :image-uri="component.basicCard.image.imageUri"
                            :image-title="component.basicCard.image.accessibilityText"
                            :text="component.basicCard.formattedText">
                            <CardButton
                                v-for="button in component.basicCard.buttons"
                                :key="button.title"
                                :uri="button.openUriAction.uri"
                                :title="button.title"
                            />
                        </Card>

                        <!-- CarouselSelect (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#CarouselSelect) -->
                        <Carousel v-if="component.carouselSelect">
                            <Card
                                v-for="item in component.carouselSelect.items"
                                :key="item.info.key"
                                :title="item.title"
                                :image-uri="item.image.imageUri"
                                :image-title="item.image.accessibilityText"
                                :text="item.description"
                                @click.native="send(item.info.key)"
                            />
                        </Carousel>

                        <!-- ListSelect (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#ListSelect) -->
                        <List
                            v-if="component.listSelect"
                            :title="component.listSelect.title"
                            :subtitle="component.listSelect.subtitle">
                            <ListItem
                                v-for="item in component.listSelect.items"
                                :key="item.title"
                                :title="item.title"
                                :description="item.description"
                                :image-uri="item.image.imageUri"
                                :image-title="item.image.accessibilityText"
                                @click.native="send(item.info.key)"
                            />
                        </List>

                        <!-- Image (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#Image) -->
                        <Picture v-if="component.image" :uri="component.image.imageUri" :title="component.image.accessibilityText" />
                    </div>

                    <!-- Actions on Google Components -->
                    <section v-if="m.queryResult.webhookPayload && m.queryResult.webhookPayload.google">
                        <div v-for="(component, id) in m.queryResult.webhookPayload.google.richResponse.items" :key="id" class="component">
                            <!-- Simple response (https://developers.google.com/actions/assistant/responses#simple_response) -->
                            <Bubble
                                v-if="component.simpleResponse"
                                :text="component.simpleResponse.displayText || component.simpleResponse.textToSpeech"
                            />

                            <!-- Basic card (https://developers.google.com/actions/assistant/responses#basic_card) -->
                            <Card
                                v-if="component.basicCard"
                                :title="component.basicCard.title"
                                :subtitle="component.basicCard.subtitle"
                                :image-uri="component.basicCard.image.url"
                                :image-title="component.basicCard.image.accessibilityText"
                                :text="component.basicCard.formattedText">
                                <CardButton
                                    v-for="button in component.basicCard.buttons"
                                    :key="button.title"
                                    :uri="button.openUrlAction.url"
                                    :title="button.title"
                                />
                            </Card>

                            <!-- Browsing Carousel (https://developers.google.com/actions/assistant/responses#browsing_carousel) -->
                            <List v-if="component.carouselBrowse">
                                <ListItem
                                    v-for="item in component.carouselBrowse.items"
                                    :key="item.title"
                                    :uri="item.openUrlAction.url"
                                    :title="item.title"
                                    :description="item.description"
                                    :footer="item.footer"
                                    :image-uri="item.image.url"
                                    :image-title="item.image.accessibilityText"
                                />
                            </List>

                            <!-- Media responses (https://developers.google.com/actions/assistant/responses#media_responses) -->
                            <div v-if="component.mediaResponse && component.mediaResponse.mediaObjects">
                                <Media
                                    v-for="media in component.mediaResponse.mediaObjects"
                                    :key="media.name"
                                    :name="media.name"
                                    :description="media.description"
                                    :icon-uri="media.icon.url"
                                    :icon-title="media.icon.accessibilityText"
                                    :uri="media.contentUrl"
                                />
                            </div>

                            <!-- Table cards (https://developers.google.com/actions/assistant/responses#table_cards) -->
                            <TableCard
                                v-if="component.tableCard"
                                :title="component.tableCard.title"
                                :subtitle="component.tableCard.subtitle"
                                :image-uri="component.tableCard.image.url"
                                :image-title="component.tableCard.image.accessibilityText"
                                :header="component.tableCard.columnProperties"
                                :rows="component.tableCard.rows">
                                <CardButton
                                    v-for="button in component.tableCard.buttons"
                                    :key="button.title"
                                    :uri="button.openUrlAction.url"
                                    :title="button.title"
                                />
                            </TableCard>
                        </div>

                        <!-- Visual Selection Responses (https://developers.google.com/actions/assistant/responses#visual_selection_responses) -->
                        <div v-for="(component, id) in m.queryResult.webhookPayload.google.systemIntent" :key="id" class="component">
                            <!-- List (https://developers.google.com/actions/assistant/responses#list) -->
                            <List
                                v-if="component.listSelect"
                                :title="component.listSelect.title"
                                :subtitle="component.listSelect.subtitle">
                                <ListItem
                                    v-for="item in component.listSelect.items"
                                    :key="item.optionInfo.key"
                                    :title="item.title"
                                    :description="item.description"
                                    :image-uri="item.image.url"
                                    :image-title="item.image.accessibilityText"
                                    @click.native="send(item.optionInfo.key)"
                                />
                            </List>

                            <!-- Carousel (https://developers.google.com/actions/assistant/responses#carousel) -->
                            <Carousel v-if="component.carouselSelect">
                                <Card
                                    v-for="item in component.carouselSelect.items"
                                    :key="item.optionInfo.key"
                                    :title="item.title"
                                    :image-uri="item.image.url"
                                    :image-title="item.image.accessibilityText"
                                    :text="item.description"
                                    @click.native="send(item.optionInfo.key)"
                                />
                            </Carousel>
                        </div>
                    </section>
                </div>
                <div v-if="loading" class="message">
                    <!-- My message (Loading) -->
                    <BubbleWrapper><Bubble me loading aria-hidden="true" /></BubbleWrapper>

                    <!-- Default / Webhook bubble (Loading) -->
                    <Bubble loading aria-hidden="true" />
                </div>
            </section>
        </section>

        <!-- ChatInput is made for submitting queries and displaying suggestions -->
        <ChatInput @submit="send">
            <!-- Suggestion chips
                https://developers.google.com/actions/assistant/responses#suggestion_chips
                https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#QuickReplies
                https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#Suggestions
            -->
            <span v-if="suggestions.text_suggestions">
                <Suggestion
                    v-for="(suggestion, index) in suggestions.text_suggestions"
                    :key="index"
                    :title="suggestion"
                    @click.native="send(suggestion)"
                />
            </span>

            <!-- Link suggestion chips
                https://developers.google.com/actions/assistant/responses#suggestion_chips
                https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#LinkOutSuggestion
            -->
            <Suggestion
                v-if="suggestions.link_suggestion"
                :title="suggestions.link_suggestion.destinationName"
                :url="suggestions.link_suggestion.uri || suggestions.link_suggestion.url"
            />
        </ChatInput>
    </main>
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css?family=Roboto:400,500,700')
@import url('https://fonts.googleapis.com/css?family=Material+Icons')

body
    margin: 0
    padding: 0
    font-family: var(--font)
    font-display: swap
    background-color: var(--background)

.container
    max-width: 500px
    margin-left: auto
    margin-right: auto
    padding: 16px
    position: relative
</style>

<style lang="sass" scoped>
.chat-container
    padding-top: 80px
    padding-bottom: 125px

.message
    .component
        padding-bottom: 10px
        width: 70%

        @media screen and (max-width: 720px)
            width: 100%
</style>

<script>
import Welcome from './../Welcome/Welcome.vue'
import Error from './../Error/Error.vue'
import TopHead from './../Partials/TopHead.vue'
import ChatInput from './../Partials/ChatInput.vue'

import Bubble from './../RichComponents/Bubble.vue'
import BubbleWrapper from './../RichComponents/BubbleWrapper.vue'
import Card from './../RichComponents/Card.vue'
import CardButton from './../RichComponents/CardButton.vue'
import Carousel from './../RichComponents/Carousel.vue'
import List from './../RichComponents/List.vue'
import ListItem from './../RichComponents/ListItem.vue'
import Picture from './../RichComponents/Picture.vue'
import Media from './../RichComponents/Media.vue'
import TableCard from './../RichComponents/TableCard.vue'
import Suggestion from './../RichComponents/Suggestion.vue'

import * as uuidv1 from 'uuid/v1'
import { set_seo } from './../../utils'

import 'dialogflow-gateway/build/bundle'
import './Theme.sass'

export default {
    name: 'App',
    components: {
        Welcome,
        Error,
        TopHead,
        ChatInput,
        Bubble,
        BubbleWrapper,
        Card,
        CardButton,
        Carousel,
        List,
        ListItem,
        Picture,
        Media,
        TableCard,
        Suggestion
    },
    data(){
        return {
            app: null,
            messages: [],
            language: '',
            session: '',
            muted: this.config.app.muted,
            loading: false,
            error: null,
            client: new df.Client(this.config.app.gateway).connect()
        }
    },
    computed: {
        /* The code below is used to extract suggestions from last message, to display it on ChatInput */
        suggestions(){
            if (this.messages.length > 0){
                const last_message = this.messages[this.messages.length - 1]
                const suggestions = []

                /* Dialogflow Suggestions */
                for (const component in last_message.queryResult.fulfillmentMessages){
                    if (last_message.queryResult.fulfillmentMessages[component].suggestions) suggestions.text_suggestions = last_message.queryResult.fulfillmentMessages[component].suggestions.suggestions.map(suggestion => suggestion.title)
                    if (last_message.queryResult.fulfillmentMessages[component].linkOutSuggestion) suggestions.link_suggestion = last_message.queryResult.fulfillmentMessages[component].linkOutSuggestion
                    if (last_message.queryResult.fulfillmentMessages[component].quickReplies) suggestions.text_suggestions = last_message.queryResult.fulfillmentMessages[component].quickReplies.quickReplies
                }

                /* Google Suggestions */
                if (last_message.queryResult.webhookPayload && last_message.queryResult.webhookPayload.google){
                    for (const component in last_message.queryResult.webhookPayload.google){
                        if (last_message.queryResult.webhookPayload.google[component].suggestions) suggestions.text_suggestions = last_message.queryResult.webhookPayload.google[component].suggestions.map(suggestion => suggestion.title)
                        if (last_message.queryResult.webhookPayload.google[component].linkOutSuggestion) suggestions.link_suggestion = last_message.queryResult.webhookPayload.google[component].linkOutSuggestion
                    }
                }

                return suggestions
            }

            return {
                text_suggestions: this.config.app.start_suggestions // <- if no messages are present, return start_suggestions, from config.js to help user figure out what he can do with your application
            }
        }
    },
    watch: {
        /* This function is triggered, when new messages arrive */
        messages(messages){
            if (this.history()) localStorage.setItem('message_history', JSON.stringify(messages)) // <- Save history if the feature is enabled
        },
        /* This function is triggered, when request is started or finished */
        loading(){
            setTimeout(() => {
                const app = document.querySelector('#app') // <- We need to scroll down #app, to prevent the whole page jumping to bottom, when using in iframe
                if (app.querySelector('.message')){
                    const message = app.querySelectorAll('.message')[app.querySelectorAll('.message').length - 1].offsetTop - 70
                    window.scrollTo({top: message, behavior: 'smooth'})
                }
            }, 2) // <- wait for render (timeout) and then smoothly scroll #app down to the last message
        },
        /* You don't need the function below. It's only for managed version, get the SEO right */
        app(agent){
            set_seo(agent)
        }
    },
    created(){
        /* If history is enabled, the messages are retrieved from localStorage */
        if (this.history() && localStorage.getItem('message_history') !== null){
            this.messages = JSON.parse(localStorage.getItem('message_history'))
        }

        /* Session should be persistent (in case of page reload, the context should stay) */
        if (this.history() && localStorage.getItem('session') !== null){
            this.session = localStorage.getItem('session')
        }

        else {
            this.session = uuidv1()
            if (this.history()) localStorage.setItem('session', this.session)
        }

        /* Cache Agent (this will save bandwith) */
        if (this.history() && localStorage.getItem('agent') !== null){
            this.app = JSON.parse(localStorage.getItem('agent'))
        }

        else {
            this.client.get()
            .then(agent => {
                this.app = agent
                if (this.history()) localStorage.setItem('agent', JSON.stringify(agent))
            })
            .catch(error => {
                this.error = error.message
            })
        }
    },
    methods: {
        send(q){
            const request = {
                session: this.session,
                queryInput: {
                    text: {
                        text: q,
                        languageCode: this.lang()
                    }
                }
            } // <- this is how a Dialogflow request look like

            this.loading = true
            this.error = null

            /* Make the request to gateway */
            this.client.send(request)
            .then(response => {
                this.messages.push(response)
                this.handle(response) // <- trigger the handle function (explanation below)
                // console.log(response) // <- (optional) log responses
            })
            .catch(error => {
                this.error = error.message
            })
            .then(() => this.loading = false)
        },
        handle(response){
            /* This function is used for speech output */
            if (response.outputAudio){
                const output = new Audio(`data:audio/mp3;base64,${response.outputAudio}`)
                if (!this.muted) output.play()
            }

            else {
                let text // <- init a text variable

                /* Dialogflow Text/SimpleResponses */
                for (const component in response.queryResult.fulfillmentMessages){
                    if (response.queryResult.fulfillmentMessages[component].text) text = response.queryResult.fulfillmentMessages[component].text.text[0]
                    if (response.queryResult.fulfillmentMessages[component].simpleResponses) text = response.queryResult.fulfillmentMessages[component].simpleResponses.simpleResponses[0].textToSpeech
                }

                /* Actions on Google Simple response */
                if (response.queryResult.webhookPayload && response.queryResult.webhookPayload.google){
                    for (const component in response.queryResult.webhookPayload.google){
                        if (response.queryResult.webhookPayload.google[component].simpleResponse) text = response.queryResult.webhookPayload.google[component].simpleResponse.textToSpeech
                    }
                }

                const speech = new SpeechSynthesisUtterance(text)
                speech.voiceURI = this.config.app.voice

                /* This "hack" is used to format our lang format, to some other lang format (example: en -> en_EN). Mainly for Safari, Firefox and Edge */
                speech.lang = `${this.lang()}-${this.lang().toUpperCase()}`
                if (!this.muted) window.speechSynthesis.speak(speech) // <- if app is not muted, speak out the speech
            }
        }
    }
}
</script>