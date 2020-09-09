![Dialogflow for Web v2](https://i.imgur.com/J8aTIwt.png)

# Dialogflow for Web *v2*

> [Dialogflow](https://dialogflow.com) lets you build conversational interfaces on top of your products and services by providing a powerful natural language understanding (NLU) engine to process and understand natural language input

This is a unofficial Web Integration for the Dialogflow V2

## Features

- Progressive Web App (100/100 Lighthouse score)
- Accessibility Features
- Extensive Browser Support (IE8+), offline capabilities (history) and great SEO
- Familiar UI & UX, based on the official Google Assistant Design Specifications
- Dark Mode & [Theming](#theming)
- Hands-free interaction with Voice Input and Speech Feedback (with SSML)
- Language independent
- [Docker](./Dockerfile) and [Kubernetes](./k8s) support
- Rich-component, Webhook and Actions on Google Support ([demo](https://mishushakov.github.io/dialogflow-web-v2/))
- Floating Widget for embedding on websites ([repo and demo](https://github.com/mishushakov/df-btn))
- Based on Vue, Webpack, Babel and PostCSS
- Lightweight (build is <50KB gzipped)
- Free and fully Documented
- Made in Germany
- Recommended by [Dialogflow](https://twitter.com/Dialogflow/status/923976390201847809) and [MadeWithVueJS](https://twitter.com/MadeWithVueJS/status/1130147606666063875)

sponsored by [Vokode](https://www.vokode.com) - an audio marketing studio from Paris, which does: sound design, podcast and voice apps

![Vokode](https://www.vokode.com/wp-content/uploads/2019/01/vokode-horizontal-web.png)

# Installation

## Requirements

- NodeJS
- npm or yarn
- Google Account and Dialogflow V2 Agent (if you look for V1, please use my [old repo](https://github.com/mishushakov/dialogflow-web))

## Backend

Dialogflow Gateway enables third-party integrations like this to securely access the Dialogflow V2 API

- [Documentation](https://github.com/mishushakov/dialogflow-gateway-docs)
- [Implementations](https://github.com/mishushakov/dialogflow-gateway-docs#implementations)

`AD` [Dialogflow Gateway by Ushakov (Hosted)](https://dialogflow.cloud.ushakov.co) is the quickest way to get started with Dialogflow for Web v2

## Clone the repository

You can use git or download from GitHub

![Clone Dialogflow for Web v2](https://imgur.com/bpHE9K6.png)

## Install the dependencies

Open the cloned folder. Then, using your package manager install the dependencies

Using npm

`npm i`

Using yarn

`yarn`

## Connect the Agent

Open `src/config/index.js` and change the `endpoint` variable to your Dialogflow Gateway URL

Hint: the URL for [Dialogflow Gateway Hosted by Ushakov](https://dialogflow.cloud.ushakov.co) is always your google cloud project id + `.core.ushaflow.io`. If you have any troubles, make sure you connected your Agent to the Gateway, then visit the [console](https://dialogflow.cloud.ushakov.co/console/), click on "Manage" and copy the Gateway URL

Example

```js
export default {
    endpoint: 'https://dialogflow-web-v2.core.ushaflow.io'
    [...]
}

[...]
```

The logo, agent name, description and available languages are fetched from Dialogflow. Change them in Dialogflow and it will sync to the UI. Please note, when adding new languages, you may have to translate some of the UI as well (`translations.json` in `src/translations`)

## Develop

Open your cloned folder. Then, using your favorite package manager run the `serve` command

Using npm

`npm run serve`

Using yarn

`yarn serve`

Your default browser should open and redirect to `localhost:8080`. If the port 8080 is already in use, you can give a `port` argument to connect at specified port

Using npm

`npm run serve --port 9090`

Using yarn

`yarn serve --port 9090`

**PLEASE DO NOT USE THE DEVELOPMENT SERVER TO SERVE YOUR APP FOR VISITORS, DEVELOPMENT SERVER IS MEANT FOR THE DEVELOPMENT. PLEASE UPLOAD BUILD ARTIFACTS TO A STATIC WEB-SERVER**

## Theme

You can make a custom theme for Dialogflow for Web v2, according to the specification:

![Theme Dialogflow for Web v2](https://i.imgur.com/nQ7tK3d.png)

To apply the variables, open `src/style/theme.sass` and change them in the `\:root` selector

You can also optimize your theme for Dark-mode-enabled clients within the same file and selector under the `@media (prefers-color-scheme: dark)`

## Build

Your app will be bundled to the `dist` directory

To build it you can use npm or yarn

Using npm

`npm run build`

Using yarn

`yarn build`

## Update

Run `git pull origin master` to integrate changes

Additionally, keep packages up-to-date

Using npm

`npm i -g npm-check-updates && ncu -u && npm i`

Using yarn

`yarn upgrade`

## Frequently Asked Questions

- Q: I don't see any changes
- A: Make sure you **cleaned the cache** and **rebuilt the app**. In Safari go to "Develop" > "Empty Caches". In Chrome: "Developer Tools" > "Application" > "Clear storage" > "Clear site data"

## Inqueries

[Contact the developer](https://mish.co/contact) or [open a issue](https://github.com/mishushakov/dialogflow-web-v2/issues/new)
