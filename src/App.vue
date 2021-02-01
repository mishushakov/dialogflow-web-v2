<template>
    <main id="app">
        <!-- TopHead is the header with the information about the app -->
        <TopHead v-if="agent && messages.length > 0" :agent="agent">
            <!-- Audio toggle (on the top right corner), used to toggle the audio output, default mode is defined in the settings -->
            <TopHeadAction
                :title="muted ? (translations[lang()] && translations[lang()].unMuteTitle) || translations[config.fallback_lang].unMuteTitle : (translations[lang()] && translations[lang()].muteTitle) || translations[config.fallback_lang].muteTitle"
                :icon="muted ? 'volume_off': 'volume_up'"
                @click.native="muted = !muted"
            />
        </TopHead>
        <section class="chat">
            <!-- Error component is for displaying errors -->
            <ErrorMessage v-if="error" :message="error" />

            <!-- Welcome component is for onboarding experience and language picker -->
            <WelcomeView v-if="agent && messages.length == 0" :agent="agent" />

            <!-- Messages Table -->
            <section v-else aria-live="polite">
                <div v-for="message in messages" id="message" :key="message.responseId">
                    <!-- My message -->
                    <RichComponent me><RichBubble v-if="message.queryResult.queryText" :text="message.queryResult.queryText" me /></RichComponent>

                    <!-- Dialogflow Components -->
                    <RichComponent v-for="(component, component_id) in message.queryResult.fulfillmentMessages" :key="component_id" :fullwidth="component.carouselSelect !== undefined || component.rbmCarouselRichCard !== undefined || component.payload && component.payload.richContent !== undefined">
                        <!-- Text (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#Text) -->
                        <RichBubble v-if="component.text" :text="component.text.text[0] || ((translations[lang()] && translations[lang()].noContent) || translations[config.fallback_lang].noContent)" />

                        <!-- SimpleResponses (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#SimpleResponses) -->
                        <RichBubble
                            v-if="component.simpleResponses"
                            :text="component.simpleResponses.simpleResponses[0].displayText || component.simpleResponses.simpleResponses[0].textToSpeech || ((translations[lang()] && translations[lang()].noContent) || translations[config.fallback_lang].noContent)"
                        />

                        <!-- RbmText (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#rbmtext) -->
                        <div v-if="component.rbmText">
                            <RichBubble :text="component.rbmText.text || ((translations[lang()] && translations[lang()].noContent) || translations[config.fallback_lang].noContent)" />
                            <div v-for="(suggestion, suggestion_id) in component.rbmText.rbmSuggestion" :key="suggestion_id">
                                <RichCardButton
                                    v-if="suggestion.reply"
                                    :title="suggestion.reply.text"
                                    @click.native="send({text: suggestion.reply.text.postbackData})"
                                />

                                <RichCardButton
                                    v-if="suggestion.action"
                                    :title="suggestion.action.text"
                                    :uri="suggestion.action.openUrl.uri"
                                />
                            </div>
                        </div>

                        <!-- RichCard (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#RichCard) -->
                        <RichCard
                            v-if="component.card"
                            :title="component.card.title"
                            :subtitle="component.card.subtitle"
                            :image-uri="component.card.imageUri">
                            <RichCardButton
                                v-for="(button, button_id) in component.card.buttons"
                                :key="button_id"
                                :uri="button.postback"
                                :title="button.text"
                            />
                        </RichCard>

                        <!-- BasicCard (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#BasicCard) -->
                        <RichCard
                            v-if="component.basicCard"
                            :title="component.basicCard.title"
                            :subtitle="component.basicCard.subtitle"
                            :image-uri="component.basicCard.image.imageUri"
                            :image-title="component.basicCard.image.accessibilityText"
                            :text="component.basicCard.formattedText">
                            <RichCardButton
                                v-for="(button, button_id) in component.basicCard.buttons"
                                :key="button_id"
                                :uri="button.openUriAction.uri"
                                :title="button.title"
                            />
                        </RichCard>

                        <!-- RbmStandaloneCard (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#rbmstandalonecard) -->
                        <RichCard
                            v-if="component.rbmStandaloneRichCard"
                            :title="component.rbmStandaloneRichCard.cardContent.title"
                            :image-uri="component.rbmStandaloneRichCard.cardContent.media.fileUri"
                            :text="component.rbmStandaloneRichCard.cardContent.description">
                            <div v-for="(suggestion, suggestion_id) in component.rbmStandaloneRichCard.cardContent.suggestions" :key="suggestion_id">
                                <RichCardButton
                                    v-if="suggestion.reply"
                                    :title="suggestion.reply.text"
                                    @click.native="send({text: suggestion.reply.text.postbackData})"
                                />
                                <RichCardButton
                                    v-if="suggestion.action"
                                    :title="suggestion.action.text"
                                    :uri="suggestion.action.openUrl.uri"
                                />
                            </div>
                        </RichCard>

                        <!-- CarouselSelect (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#CarouselSelect) -->
                        <RichCarousel v-if="component.carouselSelect">
                            <RichCard
                                v-for="item in component.carouselSelect.items"
                                :key="item.info.key"
                                :title="item.title"
                                :image-uri="item.image.imageUri"
                                :image-title="item.image.accessibilityText"
                                :text="item.description"
                                @click.native="send({text: item.info.key})"
                            />
                        </RichCarousel>

                        <!-- RbmCarouselCard (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#rbmcarouselcard) -->
                        <RichCarousel v-if="component.rbmCarouselRichCard">
                            <RichCard
                                v-for="(card, card_id) in component.rbmCarouselRichCard.cardContents"
                                :key="card_id"
                                :title="card.title"
                                :image-uri="card.media.fileUri"
                                :text="card.description">
                                <div v-for="(suggestion, suggestion_id) in card.suggestions" :key="suggestion_id">
                                    <RichCardButton
                                        v-if="suggestion.reply"
                                        :title="suggestion.reply.text"
                                        @click.native="send({text: suggestion.reply.text.postbackData})"
                                    />
                                    <RichCardButton
                                        v-if="suggestion.action"
                                        :title="suggestion.action.text"
                                        :uri="suggestion.action.openUrl.uri"
                                    />
                                </div>
                            </RichCard>
                        </RichCarousel>

                        <!-- ListSelect (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#ListSelect) -->
                        <RichList
                            v-if="component.listSelect"
                            :title="component.listSelect.title"
                            :subtitle="component.listSelect.subtitle">
                            <RichListItem
                                v-for="item in component.listSelect.items"
                                :key="item.info.key"
                                :title="item.title"
                                :description="item.description"
                                :image-uri="item.image.imageUri"
                                :image-title="item.image.accessibilityText"
                                @click.native="send({text: item.info.key})"
                            />
                        </RichList>

                        <!-- Image (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#Image) -->
                        <RichPicture v-if="component.image" :uri="component.image.imageUri" :title="component.image.accessibilityText" />

                        <!-- RichMedia (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#MediaContent) -->
                        <div v-if="component.mediaContent && component.mediaContent.mediaObjects">
                            <RichMedia
                                v-for="(media, media_id) in component.mediaContent.mediaObjects"
                                :key="media_id"
                                :name="media.name"
                                :description="media.description"
                                :icon-uri="media.icon ? media.icon.imageUri : media.largeImage.imageUri"
                                :icon-title="media.icon ? media.icon.accessibilityText : media.largeImage.accessibilityText"
                                :uri="media.contentUrl"
                            />
                        </div>

                        <!-- RichTableCard (https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#tablecard) -->
                        <RichTableCard
                            v-if="component.tableCard"
                            :title="component.tableCard.title"
                            :subtitle="component.tableCard.subtitle"
                            :image-uri="component.tableCard.image.imageUri"
                            :image-title="component.tableCard.image.accessibilityText"
                            :header="component.tableCard.columnProperties"
                            :rows="component.tableCard.rows">
                            <RichCardButton
                                v-for="(button, button_id) in component.tableCard.buttons"
                                :key="button_id"
                                :uri="button.openUriAction.uri"
                                :title="button.title"
                            />
                        </RichTableCard>

                        <!-- Dialogflow Messenger Components -->
                        <section v-if="component.payload && component.payload.richContent">
                            <div v-for="(stack, stack_id) in component.payload.richContent" :key="stack_id">
                                <RichComponent v-for="(item, item_id) in stack" :key="item_id">
                                    <!-- Info response type (https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger#info_response_type) -->
                                    <RichCard
                                        v-if="item.type == 'info'"
                                        :title="item.title"
                                        :subtitle="item.subtitle"
                                        :image-uri="item.image.src.rawUrl">
                                        <RichCardButton :uri="item.actionLink" />
                                    </RichCard>

                                    <!-- Description response type (https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger#description_response_type) -->
                                    <RichCard
                                        v-if="item.type == 'description'"
                                        :title="item.title"
                                        :text="item.text.join(' ')"
                                    />

                                    <!-- Image response type (https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger#image_response_type) -->
                                    <RichPicture v-if="item.type == 'image'" :uri="item.rawUrl" :title="item.accessibilityText" />

                                    <!-- Button response type (https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger#button_response_type) -->
                                    <RichCardButton v-if="item.type == 'button'" :uri="item.link" :title="item.text" />

                                    <!-- List response type (https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger#list_response_type) -->
                                    <RichListItem
                                        v-if="item.type == 'list'"
                                        :title="item.title"
                                        :description="item.subtitle"
                                        @click.native="send({text: item.title})"
                                    />

                                    <!-- Accordion response type (https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger#accordion_response_type) -->
                                    <RichCard
                                        v-if="item.type == 'accordion'"
                                        :title="item.title"
                                        :subtitle="item.subtitle"
                                        :image-uri="item.image.src.rawUrl"
                                        :text="item.text"
                                    />
                                </RichComponent>
                            </div>
                        </section>
                    </RichComponent>

                    <!-- Actions on Google Components -->
                    <section v-if="message.queryResult.webhookPayload && message.queryResult.webhookPayload.google">
                        <RichComponent v-for="(component, component_id) in message.queryResult.webhookPayload.google.richResponse.items" :key="component_id">
                            <!-- Simple response (https://developers.google.com/actions/assistant/responses#simple_response) -->
                            <RichBubble
                                v-if="component.simpleResponse"
                                :text="component.simpleResponse.displayText || component.simpleResponse.textToSpeech || ((translations[lang()] && translations[lang()].noContent) || translations[config.fallback_lang].noContent)"
                            />

                            <!-- Basic card (https://developers.google.com/actions/assistant/responses#basic_card) -->
                            <RichCard
                                v-if="component.basicCard"
                                :title="component.basicCard.title"
                                :subtitle="component.basicCard.subtitle"
                                :image-uri="component.basicCard.image.url"
                                :image-title="component.basicCard.image.accessibilityText"
                                :text="component.basicCard.formattedText">
                                <RichCardButton
                                    v-for="(button, button_id) in component.basicCard.buttons"
                                    :key="button_id"
                                    :uri="button.openUrlAction.url"
                                    :title="button.title"
                                />
                            </RichCard>

                            <!-- Browsing RichCarousel (https://developers.google.com/actions/assistant/responses#browsing_carousel) -->
                            <RichList v-if="component.carouselBrowse">
                                <RichListItem
                                    v-for="(item, item_id) in component.carouselBrowse.items"
                                    :key="item_id"
                                    :uri="item.openUrlAction.url"
                                    :title="item.title"
                                    :description="item.description"
                                    :footer="item.footer"
                                    :image-uri="item.image.url"
                                    :image-title="item.image.accessibilityText"
                                />
                            </RichList>

                            <!-- RichMedia responses (https://developers.google.com/actions/assistant/responses#media_responses) -->
                            <div v-if="component.mediaResponse && component.mediaResponse.mediaObjects">
                                <RichMedia
                                    v-for="(media, media_id) in component.mediaResponse.mediaObjects"
                                    :key="media_id"
                                    :name="media.name"
                                    :description="media.description"
                                    :icon-uri="media.icon.url"
                                    :icon-title="media.icon.accessibilityText"
                                    :uri="media.contentUrl"
                                />
                            </div>

                            <!-- Table cards (https://developers.google.com/actions/assistant/responses#table_cards) -->
                            <RichTableCard
                                v-if="component.tableCard"
                                :title="component.tableCard.title"
                                :subtitle="component.tableCard.subtitle"
                                :image-uri="component.tableCard.image.url"
                                :image-title="component.tableCard.image.accessibilityText"
                                :header="component.tableCard.columnProperties"
                                :rows="component.tableCard.rows">
                                <RichCardButton
                                    v-for="(button, button_id) in component.tableCard.buttons"
                                    :key="button_id"
                                    :uri="button.openUrlAction.url"
                                    :title="button.title"
                                />
                            </RichTableCard>
                        </RichComponent>

                        <!-- Visual Selection Responses (https://developers.google.com/actions/assistant/responses#visual_selection_responses) -->
                        <RichComponent v-for="(component, component_id) in message.queryResult.webhookPayload.google.systemIntent" :key="component_id" :fullwidth="component.carouselSelect !== undefined">
                            <!-- RichList (https://developers.google.com/actions/assistant/responses#list) -->
                            <RichList
                                v-if="component.listSelect"
                                :title="component.listSelect.title"
                                :subtitle="component.listSelect.subtitle">
                                <RichListItem
                                    v-for="item in component.listSelect.items"
                                    :key="item.optionInfo.key"
                                    :title="item.title"
                                    :description="item.description"
                                    :image-uri="item.image.url"
                                    :image-title="item.image.accessibilityText"
                                    @click.native="send({text: item.optionInfo.key})"
                                />
                            </RichList>

                            <!-- RichCarousel (https://developers.google.com/actions/assistant/responses#carousel) -->
                            <RichCarousel v-if="component.carouselSelect">
                                <RichCard
                                    v-for="item in component.carouselSelect.items"
                                    :key="item.optionInfo.key"
                                    :title="item.title"
                                    :image-uri="item.image.url"
                                    :image-title="item.image.accessibilityText"
                                    :text="item.description"
                                    @click.native="send({text: item.optionInfo.key})"
                                />
                            </RichCarousel>
                        </RichComponent>
                    </section>

                    <!-- Status Message -->
                    <RichComponent><RichBubble v-if="message.queryResult.diagnosticInfo && message.queryResult.diagnosticInfo.end_conversation" :text="(translations[lang()] && translations[lang()].conversationEnd) || translations[config.fallback_lang].conversationEnd" /></RichComponent>
                </div>
                <div v-if="loading" id="message">
                    <!-- My message (Loading) -->
                    <RichComponent me><RichBubble aria-hidden="true" me loading /></RichComponent>

                    <!-- Default / Webhook bubble (Loading) -->
                    <RichComponent><RichBubble aria-hidden="true" loading /></RichComponent>
                </div>
            </section>
        </section>

        <!-- ChatField is made for submitting queries and displaying suggestions -->
        <ChatField ref="input" @submit="send" @listening="stop_feedback" @typing="stop_feedback">
            <!-- RichSuggesion chips
                https://developers.google.com/actions/assistant/responses#suggestion_chips
                https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#QuickReplies
                https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#Suggestions
            -->
            <RichSuggesion
                v-for="(suggestion, suggestion_id) in suggestions.text_suggestions"
                :key="'text-' + suggestion_id"
                :title="suggestion"
                @click.native="send({text: suggestion})"
            />

            <!-- Link suggestion chips
                https://developers.google.com/actions/assistant/responses#suggestion_chips
                https://cloud.google.com/dialogflow/docs/reference/rest/v2beta1/projects.agent.intents#LinkOutSuggestion
                https://cloud.google.com/dialogflow/docs/integrations/dialogflow-messenger#suggestion_chip_response_type
            -->
            <RichSuggesion
                v-for="(suggestion, suggestion_id) in suggestions.link_suggestions"
                :key="'link-' + suggestion_id"
                :title="suggestion.destinationName || suggestion.text"
                :uri="suggestion.uri || suggestion.url || suggestion.link"
            />
        </ChatField>
    </main>
</template>

<style lang="sass">
@import '@/style/theme.sass'

body
    margin: 0
    padding: 0
    font-family: var(--font)
    font-display: swap
    background-color: var(--background)

.chat
    max-width: var(--container-width)
    margin: auto auto
    padding: 70px 12px 112px 12px
</style>

<script>
import WelcomeView from '@/views/WelcomeView.vue'

import ErrorMessage from '@/components/ErrorMessage.vue'
import TopHead from '@/components/TopHead.vue'
import TopHeadAction from '@/components/TopHeadAction.vue'
import ChatField from '@/components/ChatField.vue'

import RichComponent from '@/components/RichComponent.vue'
import RichBubble from '@/components/RichBubble.vue'
import RichCard from '@/components/RichCard.vue'
import RichCardButton from '@/components/RichCardButton.vue'
import RichCarousel from '@/components/RichCarousel.vue'
import RichList from '@/components/RichList.vue'
import RichListItem from '@/components/RichListItem.vue'
import RichPicture from '@/components/RichPicture.vue'
import RichMedia from '@/components/RichMedia.vue'
import RichTableCard from '@/components/RichTableCard.vue'
import RichSuggesion from '@/components/RichSuggestion.vue'

import * as uuidv1 from 'uuid/v1'

import { Client } from 'dialogflow-gateway'

export default {
    name: 'App',
    components: {
        WelcomeView,
        ErrorMessage,
        TopHead,
        TopHeadAction,
        ChatField,
        RichComponent,
        RichBubble,
        RichCard,
        RichCardButton,
        RichCarousel,
        RichList,
        RichListItem,
        RichPicture,
        RichMedia,
        RichTableCard,
        RichSuggesion
    },
    data(){
        return {
            agent: null,
            messages: [],
            language: '',
            session: '',
            muted: true,
            loading: false,
            error: null,
            client: new Client(this.config.endpoint),
            audio: new Audio()
        }
    },
    computed: {
        /* The code below is used to extract suggestions from last message, to display it on ChatInput */
        suggestions(){
            if (this.messages.length > 0){
                const last_message = this.messages[this.messages.length - 1]
                const text_suggestions = []
                const link_suggestions = []

                /* Dialogflow Suggestions */
                for (const component in last_message.queryResult.fulfillmentMessages){
                    if (last_message.queryResult.fulfillmentMessages[component].suggestions) text_suggestions.push(...last_message.queryResult.fulfillmentMessages[component].suggestions.suggestions.map(suggestion => suggestion.title))
                    if (last_message.queryResult.fulfillmentMessages[component].linkOutSuggestion) link_suggestions.push(last_message.queryResult.fulfillmentMessages[component].linkOutSuggestion)
                    if (last_message.queryResult.fulfillmentMessages[component].quickReplies) text_suggestions.push(...last_message.queryResult.fulfillmentMessages[component].quickReplies.quickReplies)
                    if (last_message.queryResult.fulfillmentMessages[component].payload && last_message.queryResult.fulfillmentMessages[component].payload.richContent){
                        last_message.queryResult.fulfillmentMessages[component].payload.richContent.forEach(stack => {
                            const chips = stack.find(item => item.type == 'chips')
                            if (chips) link_suggestions.push(...chips.options)
                        })
                    }
                }

                /* Google Suggestions */
                if (last_message.queryResult.webhookPayload && last_message.queryResult.webhookPayload.google){
                    for (const component in last_message.queryResult.webhookPayload.google){
                        if (last_message.queryResult.webhookPayload.google[component].suggestions) text_suggestions.push(...last_message.queryResult.webhookPayload.google[component].suggestions.map(suggestion => suggestion.title))
                        if (last_message.queryResult.webhookPayload.google[component].linkOutSuggestion) link_suggestions.push(last_message.queryResult.webhookPayload.google[component].linkOutSuggestion)
                    }
                }

                return {text_suggestions, link_suggestions}
            }

            return {
                text_suggestions: this.config.start_suggestions // <- if no messages are present, return start_suggestions, from config.js to help user figure out what he can do with your application
            }
        }
    },
    watch: {
        /* This function is triggered, when new messages arrive */
        messages(messages){
            if (this.history()) sessionStorage.setItem('message_history', JSON.stringify(messages)) // <- Save history if the feature is enabled
        },
        /* This function is triggered, when request is started or finished */
        loading(){
            setTimeout(() => {
                const app = document.querySelector('#app') // <- We need to scroll down #app, to prevent the whole page jumping to bottom, when using in iframe
                if (app.querySelector('#message')){
                    const message = app.querySelectorAll('#message')[app.querySelectorAll('#message').length - 1].offsetTop - 70
                    window.scrollTo({top: message, behavior: 'smooth'})
                }
            }, 2) // <- wait for render (timeout) and then smoothly scroll #app down to the last message
        },
        /* If muted, stop playing feedback */
        muted(muted){
            this.audio.muted = muted
            if (muted) this.stop_feedback()
        }
    },
    created(){
        /* If history is enabled, the messages are retrieved from sessionStorage */
        if (this.history() && sessionStorage.getItem('message_history') !== null){
            this.messages = JSON.parse(sessionStorage.getItem('message_history'))
        }

        /* Session should be persistent (in case of page reload, the context should stay) */
        if (this.history() && sessionStorage.getItem('session') !== null){
            this.session = sessionStorage.getItem('session')
        }

        else {
            this.session = uuidv1()
            if (this.history()) sessionStorage.setItem('session', this.session)
        }

        /* Cache Agent (this will save bandwith) */
        if (this.history() && sessionStorage.getItem('agent') !== null){
            this.agent = JSON.parse(sessionStorage.getItem('agent'))
        }

        else {
            this.client.get()
            .then(agent => {
                this.agent = agent
                if (this.history()) sessionStorage.setItem('agent', JSON.stringify(agent))
            })
            .catch(error => {
                this.error = error.message
            })
        }
    },
    methods: {
        send(submission){
            let request

            /* Text request */
            if (submission.text){
                request = {
                    session: this.session,
                    queryInput: {
                        text: {
                            text: submission.text,
                            languageCode: this.lang()
                        }
                    }
                }
            }

            /* Audio request */
            else if (submission.audio){
                this.muted = false

                request = {
                    session: this.session,
                    queryInput: {
                        audioConfig: {
                            audioEncoding: 'AUDIO_ENCODING_UNSPECIFIED',
                            languageCode: this.lang()
                        }
                    },
                    inputAudio: submission.audio
                }
            }

            this.stop_feedback()
            this.loading = true
            this.error = null

            /* Send the request to endpoint */
            this.client.send(request)
            .then(response => {
                this.messages.push(response)
                this.handle(response) // <- trigger the handle function (explanation below)
                if (this.debug()) console.log(response) // <- log responses in development mode
            })
            .catch(error => {
                this.error = error.message
            })
            .then(() => this.loading = false)
        },
        handle(response){
            /* Handle dialog end */
            if (response.queryResult.diagnosticInfo && response.queryResult.diagnosticInfo.end_conversation){
                this.$refs.input.disabled = true
                this.$refs.input.microphone = false
                this.$refs.input.should_listen = false
            }

            /* Speech output */
            if (response.outputAudio){
                /* Detect MIME type (or fallback to default) */
                const mime = this.config.codecs[response.outputAudioConfig.audioEncoding] || this.config.codecs.OUTPUT_AUDIO_ENCODING_UNSPECIFIED
                this.audio.src = `data:${mime};base64,${response.outputAudio}`
                this.audio.onended = () => this.$refs.input.listen()

                if (!this.muted) this.audio.play()
            }

            else {
                let text = '' // <- init a text variable

                /* Dialogflow Text/SimpleResponses */
                for (const component in response.queryResult.fulfillmentMessages){
                    if (response.queryResult.fulfillmentMessages[component].text) text += `${response.queryResult.fulfillmentMessages[component].text.text[0]}. `
                    if (response.queryResult.fulfillmentMessages[component].simpleResponses && response.queryResult.fulfillmentMessages[component].simpleResponses.simpleResponses[0].textToSpeech) text += `${response.queryResult.fulfillmentMessages[component].simpleResponses.simpleResponses[0].textToSpeech}. `
                    if (response.queryResult.fulfillmentMessages[component].rbmText) text += `${response.queryResult.fulfillmentMessages[component].rbmText.text}. `
                }

                /* Actions on Google Simple response */
                if (response.queryResult.webhookPayload && response.queryResult.webhookPayload.google){
                    for (const component in response.queryResult.webhookPayload.google.richResponse.items){
                        if (response.queryResult.webhookPayload.google.richResponse.items[component].simpleResponse && response.queryResult.webhookPayload.google.richResponse.items[component].simpleResponse.textToSpeech) text += `${response.queryResult.webhookPayload.google.richResponse.items[component].simpleResponse.textToSpeech}. `
                    }
                }

                const speech = new SpeechSynthesisUtterance(text)
                speech.voiceURI = this.config.voice
                speech.lang = this.lang()
                speech.onend = () => this.$refs.input.listen()

                if (!this.muted) window.speechSynthesis.speak(speech) // <- if app is not muted, speak out the speech
            }
        },
        /* Stop audio speech/playback */
        stop_feedback(){
            if (window.speechSynthesis) window.speechSynthesis.cancel()
            if (this.audio && !this.audio.paused) this.audio.pause()
        }
    }
}
</script>
