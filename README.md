![](https://i.imgur.com/J8aTIwt.png)

*The picture is worth thousands words*

# Dialogflow for Web *v2*

What is Dialogflow, by the way?

> Dialogflow lets you build conversational interfaces on top of your products and services by providing a powerful natural language understanding (NLU) engine to process and understand natural language input

This is a unofficial Web Integration for Dialogflow V2, built to support rich responses and to make the most out of the Platform available to the Web

The development of this project was made possible by [me](https://linkedin.com/in/mishushakov). You can hire me or [send me some snacks](https://paypal.me/mishushakov)

If you have any questions, feel free to [contact me](https://i.ushakov.co/#contact)

## Features

- Progressive Web App (100/100 Lighthouse score)
- Accessibility Features
- Wide Browser Support (IE8+), offline capabilities (history) and great SEO
- Familiar UI & UX, based on official Google Assistant Guidelines
- Hands-free interaction with Voice Input and Speech Feedback
- Language Independency
- Docker and Kubernetes support
- Rich-component, Webhook and Actions on Google Support ([demo](https://codepen.io/mishushakov/pen/YMwoEK))
- Iframe Support ([demo](https://codepen.io/mishushakov/pen/ywWaRW))
- Based on Vue, Webpack 4, Babel 7
- Lightweight (with ngx_pagespeed the build is <100KB)
- Free and Documented (documentation coverage at least 80%)
- Free hosted version on [Dialogflow Gateway](https://dialogflow.cloud.ushakov.co)
- Made in Germany (if it makes any sense to you)

![](https://i.imgur.com/0vYBGTq.png)

## Contributing

There are many ways you can contribute to the project:

- Adding more translations
- Fixing bugs and contributing to the code base
- Leaving your feedback and suggesting more features
- Donating
- Sharing

# Getting started

## Requirements
- NodeJS
- NPM or Yarn
- Basic knowledge in ES6 (JavaScript)
- Google Account and Dialogflow V2 Agent (if you look for V1, please use my [old repo](https://github.com/mishushakov/dialogflow-web) and the [instructions](https://github.com/mishushakov/dialogflow-web/blob/21ffc7017f1a4d51eabb1122c5aae119a7d73587/README.md))

## Setting Up Dialogflow Gateway

Dialogflow Gateway is a cloud-based service, which connects Dialogflow V2 Agents to the World Wide Web.
Dialogflow for Web v2 requires Dialogflow Gateway for its formatting option and to make secure and authenticated requests to Dialogflow V2 API

Follow a detailed guide, on how to connect your Agent to the Gateway [here](https://github.com/mishushakov/dialogflow-gateway-docs/blob/master/guide.md) and return to this guide, when you have connected the Gateway to your Agent

## Cloning the repository to your machine

You can use git or download it directly from github

![](https://imgur.com/bpHE9K6.png)

## Getting the dependencies
Open your cloned folder. Then, using your favorite package manager get the dependencies

Example using npm

`npm install`

Example using yarn

`yarn`

## Customizing App & Connecting your Agent

Open `config.js` and change the `gateway` variable to your Dialogflow Gateway URL

Hint: the Dialogflow Gateway URL is always your google cloud project name + `.gateway.dialogflow.cloud.ushakov.co`. When you have troubles finding it, make sure you have connected your Agent to the Gateway, then visit the [console](https://dialogflow.cloud.ushakov.co/console/), click on "Manage" and copy the Gateway URL

Example

```js
export default {
    app: {
        gateway: "https://dialogflow-web-v2.gateway.dialogflow.cloud.ushakov.co"
        [...]
    }
}

[...]
```

The logo, application name, description and the available languages are fetched from your Dialogflow Agent directly. If you want to change them, then you should do it in the Dialogflow Console and it will be synced to the UI. Please note, when adding new languages, you need to translate some of the UI as well (`i18n` field in `config.js`). Also don't forget to clean your cache, if you make some changes to the Agent

## Cloud Artifacts

Each Dialogflow Gateway customer gets hosted version of Dialogflow for Web v2 for free. The code, that is running on the Dialogflow Gateway Cloud is exactly the same as in this repository. You may want to remove some supporting code, that is meant to execute in cloud environment only. Here are some lines, you may want to remove on a self-hosted integration

`config.js` - Line 1 to 10

`src/Components/App.vue` - Line 246 to 265

## Start development server & build

Open your cloned folder. Then, using your favorite package manager run `dev` command

Example using npm

`npm run dev`

Example using yarn

`yarn dev`

When you done these steps, your default browser should open and redirect you to `localhost:8080`. If the port 8080 is already in use, you can give an `port` argument to connect at specified port

Example using npm

`npm run dev --port 9090`

Example using yarn

`yarn dev --port 9090`

**PLEASE DO NOT USE THE DEVELOPMENT SERVER FOR SERVING YOUR APP IN PRODUCTION, DEVELOPMENT SERVER IS MEANT FOR THE DEVELOPMENT. INSTEAD PLEASE UPLOAD BUILD ARTIFACTS TO A STATIC WEB-SERVER**

## Building for production

Your app will be bundled to `dist/build.js`

To build it you can use npm or yarn

Example using npm

`npm run build`

Example using yarn

`yarn build`

## Frequently Asked Questions

- Q: I changed the gateway url, but the responses are the same as with the previous one
- A: Make sure you have **cleaned your cache** and **rebuilt your app**. In Safari go to "Develop" > "Empty Caches". In Chrome: "Developer Tools" > "Application" > "Clear storage" > "Clear site data"

# Have fun using the product!