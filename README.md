![](https://i.imgur.com/J8aTIwt.png)

*The picture is worth thousands words*

# Dialogflow for Web *v2*

What is dialogflow by the way?

> Dialogflow lets you build conversational interfaces on top of your products and services by providing a powerful natural language understanding (NLU) engine to process and understand natural language input

This is a unofficial Web client for Dialogflow, that was built, to support rich responses and to make the most out of the Platform available to the Web

The development of this project was made possible by [me](https://linkedin.com/in/mishushakov). You can hire me or [send me some snacks](https://paypal.me/mishushakov)

## Features and Benefits

- Progressive Web App (100/100 Lighthouse score)
- Accessibility Features
- Wide Browser Support (IE8+)
- Onboarding, Branding, UX
- Hands-free interaction using Voice Input and Voice Feedback
- Language Independent (polyglot). Runs multiple languages at the same time
- Rich-component and Webhook Support (for the list of supported components see [Dialogflow Gateway docs](https://github.com/MishUshakov/dialogflow-gateway))
- Based on Vue, Webpack 4, Babel 7
- Integrated Component API (means, you can build the UI from different sources, not only Dialogflow Gateway, but your own APIs)
- Lightweight (without polyfills and fonts the build shrinks around 100 KB)
- Free and Documented (documentation coverage at least 60%)
- Made in Germany (if it makes any sense to you)

For more features and benefits see [this spreadsheet](https://docs.google.com/spreadsheets/d/1Pfpt1JxwlqIxD646p4LVX4okKKVtfvYMBJmPvsUhfgM/edit?usp=sharing)

## Comparisons

Dialogflow Web Demo

- The dialogflow Web Demo, does what it says, but no more. It may be a good fit for a demo, but by no means a production suite and a valuable tool

Dialogflow For Web v1

- It doesn't work with Dialogflow V2 API
- It doesn't work on Internet Explorer
- It was using external dependencies
- The Project's source code was not split into Components
- Not every bug/feature/issue you have asked me was implemented
- It didn't had a language support
- It doesn't support Messenger responses
- It doesn't feature great documentation
- The design is outdated

No more words, [IT'S A DEMO-TIME NOW](http://dialogflow-web-v2.firebaseapp.com)

## About The License

This product is licensed under GNU GPLv3 Public License and it comes dual-licensed for private/commercial usage.

### What does it mean?

**If your project is free and open-source**: You are good to go

**If your project, is proprietary and running on single domain**: You should get a private license. For private license Pay-What-You-Want applies. The recommended amount is 20 EUR 

**If your project is used for commercial purposes, is proprietary and running on one or more domains**: You should get a commercial license. The costs are calculated individually. As a commercial client, you also get additional benefits:

- E-Mail support
- Help and Troubleshooting with Installation
- Good Karma, because some amount of your payment will be transfered to Gates Philantropy partners (part of Bill & Melinda Gates foundation), which aims globally, to enhance healthcare and reduce extreme poverty, expand educational opportunities and access to information technology

![](https://www.gatesfoundation.org/philanthropypartners/static/images/gpp_logo.png)

For more information about the licensing options, go to the [homepage](http://dialogflow-web-v2.firebaseapp.com) and ask more about the licenses. If you are boring, you could also send me a mail to: hello (at) ushakov (dot) co

# Getting started

## Requirements
- NodeJS
- NPM or Yarn
- Basic knowledge in ES6 (JavaScript)
- Dialogflow Gateway must be installed. For instructions see the [repo](https://github.com/MishUshakov/dialogflow-gateway)

## Cloning the repository to your machine

You can use git or download it directly from github

![](https://imgur.com/bpHE9K6.png)

## Getting the dependencies
Open your cloned folder. Then, using your favorite package manager get the dependencies

Example using npm

`npm install`

Example using yarn

`yarn`

## [Installing Dialogflow Gateway](https://github.com/MishUshakov/dialogflow-gateway)

## Customizing App & Connecting your agent

After you have setup your gateway and it has indicated, that it works, you can now add this UI to it

Open `config.js` and change the `gateway` variable, to connect your bot. You can use my gateway URL as reference, by the way.

Example

```js
export default {
    app: {
        gateway: "https://us-central1-dialogflow-web-v2.cloudfunctions.net/gateway"
        [...]
    }
}

[...]
```

The logo, application name, description and the available languages are fetched from your Dialogflow Agent directly. If you want to change them, then you should do it in the Dialogflow Settings and it would be synced to the UI. Please note, when adding new languages, you need to translate some of the UI as well (`i18n` field in `config.js`)

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

- Q: I changed the gateway url and the responses are the same as with yours
- A: Make sure you have **cleaned your cache** and **rebuilt your app**. In Safari go to "Develop" > "Empty Caches". In Chrome: "Developer Tools" > "Application" > "Clear storage" > "Clear site data"

# Have fun using the product!