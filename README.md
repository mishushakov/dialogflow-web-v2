![](https://i.imgur.com/J8aTIwt.png)

*The picture is worth thousands words*

# Dialogflow for Web *v2*

What is dialogflow by the way?

> Dialogflow lets you build conversational interfaces on top of your products and services by providing a powerful natural language understanding (NLU) engine to process and understand natural language input

This is a unofficial Web client for Dialogflow, that was built, to support rich responses and to make the most out of the Platform available to the Web

This development of this project was sponsored by [SpringLabs](http://springlabs.net). Make sure to give some love to them!

## Features and Benefits

- Progressive Web App (100/100 Lighthouse score)
- Accessibility Feautures
- Wide Browser Support
- Onboarding, Branding, UX
- Hands-free interaction using Voice Input and Voice Feedback
- Language Indenendent (polyglot). Runs multiple languages at the same time
- Rich-component and Webhook Support (for the list of supported components see [Dialogflow Gateway docs](https://github.com/MishUshakov/dialogflow-gateway))
- Based on Vue, Webpack 4, Babel 7
- Integrated Component API (means, you can build the UI from different sources, not only Dialogflow)
- Lightweight (the build without polyfills and fonts is around 100 KB)
- Free and Well-documented
- Made in Germany (if it makes some sense to you)

For more features and benefits see [this spreadsheet](https://docs.google.com/spreadsheets/d/1Pfpt1JxwlqIxD646p4LVX4okKKVtfvYMBJmPvsUhfgM/edit?usp=sharing)

## Comparisons

Dialogflow Web Demo

- The dialogflow Web Demo, does what it says, but no more. It may be a good fit for a demo, but by no means a production suite and a valuable tool

Dialogflow For Web v1

- The v2 supports Dialogflow V2 API
- It works on IE8+ now
- The whole project was written from scratch
- No more external dependencies
- The Project's source code is split into Components, which means, that it adds overall complexity to the code, but makes it easier to maintain and make changes
- Every bug/feature/issue was carefully reviewed by me and anything you have asked for is now implemented
- Multi-lingual support
- More components
- Better documentation coverage
- Upgraded UI (Material Design 2, fine-tuned)

No more words, [IT'S A DEMO-TIME NOW](http://dialogflow-web-v2.firebaseapp.com)

## About The License

This product is licensed under GNU GPLv3 Public License.

Long story short: if your project is free and open-source, you are good to go. If you want to use this repo for private/commercial purposes, you should pay. It's certainly not my responsibility of doing this project for the second year one more time again. It should not have turned out that way. I thought, that Google would make their own implementation, but that didn't happened, so there was only one human being in the world, who knew how to do it right (me). I would go crazy, if we will see Dialogflow V3 API without a nice UI. Google should definetely [hire me]() to let me do the UI well, from a customer perspective. I know what the people want and i also know how to build it.

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

**PLEASE DO NOT USE THE DEVELOPMENT SERVER FOR SERVING YOUR APP, DEVELOPMENT SERVER IS MEANT FOR THE DEVELOPMENT. INSTEAD PLEASE UPLOAD BUILD ARTIFACTS TO A STATIC WEB-SERVER**

## Building for production

Your app will be bundled to `dist/build.js`
To build it you can use npm or yarn

Example using npm

`npm run build`

Example using yarn

`yarn build`

## Frequently Asked Questions

- Q: I changed the token and the responses are the same as with previous token
- A: Make sure you have **cleaned your cache** and **rebuilt your app**. In Safari go to "Develop" > "Empty Caches". In Chrome: "Developer Tools" > "Application" > "Clear storage" > "Clear site data"

# Have fun using the app!