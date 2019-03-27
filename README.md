![](https://i.imgur.com/J8aTIwt.png)

*The picture is worth thousands words*

# Dialogflow for Web *v2*

What is dialogflow by the way?

> Dialogflow lets you build conversational interfaces on top of your products and services by providing a powerful natural language understanding (NLU) engine to process and understand natural language input

This is a unofficial Web client for Dialogflow, built to support rich responses and to make the most out of the Platform available to the Web

The development of this project was made possible by [me](https://linkedin.com/in/mishushakov). You can hire me or [send me some snacks](https://paypal.me/mishushakov)

## Features and Benefits

- Progressive Web App (100/100 Lighthouse score)
- Accessibility Features
- Wide Browser Support (IE8+)
- Onboarding, Branding, UX
- Hands-free interaction using Voice Input and Voice Feedback
- Language Independent (polyglot). Runs multiple languages at the same time
- Rich-component and Webhook Support
- Based on Vue, Webpack 4, Babel 7
- Integrated Component API (means, you can build the UI from different sources, not only Dialogflow Gateway, but your own APIs as well)
- Can run in iframe ([demo](https://codepen.io/mishushakov/pen/ywWaRW))
- Lightweight (without polyfills and fonts the build shrinks down to 100 KB)
- Free and Documented (documentation coverage at least 80%)
- Made in Germany (if it makes any sense to you)

For more features and benefits see [this spreadsheet](https://docs.google.com/spreadsheets/d/1Pfpt1JxwlqIxD646p4LVX4okKKVtfvYMBJmPvsUhfgM/edit?usp=sharing)

# Getting started

## Requirements
- NodeJS
- NPM or Yarn
- Basic knowledge in ES6 (JavaScript)
- Google Account and Dialogflow V2 Agent (if you look for V1, please use my [old repo](https://github.com/mishushakov/dialogflow-web) and the [instructions](https://github.com/mishushakov/dialogflow-web/blob/21ffc7017f1a4d51eabb1122c5aae119a7d73587/README.md))

## Setting Up Dialogflow Gateway

Dialogflow Gateway is a cloud-based service, which connects Dialogflow V2 Agents to the World Wide Web.
Dialogflow for Web v2 requires Dialogflow Gateway for its formatting option and to make secure and authenticated requests to Dialogflow V2 API

Go to the [Dialogflow Gateway Console](https://dialogflow-gateway.ushakov.co/console)

And you will see the following Sign In screen:

![](https://i.imgur.com/bse2Akc.png)

**Note**: some adblocks hide the Google Sign-In button. Please disable your adblock, if you experience the issue

Press on the "Sign in with Google" button and you will see similar account picker:

![](https://i.imgur.com/6kjJPPR.png)

Choose the account, you used to create your Dialogflow Agent with

**Note**: Some browsers (like Safari in my case) block popups. Please allow popups on the website and log in and out again in order to proceed

And you will then see the next popup:

![](https://i.imgur.com/KkfA3bn.png)

This may happen, because Google need to verify my app (if it hasn't yet). You can still continue by pressing on "Advanced" and "Go to Dialogflow Gateway (unsafe)"

Then you will see another page:

![](https://i.imgur.com/jHErXqd.png)

Press on "Allow" in order to allow the application to access your Google Cloud. Google Cloud is used for following reasons:

- Listing your Google Cloud Projects
- Listing IAM Policies for projects
- Updating IAM Policies for projects
- Managing Service Account Keys
- (Overall) Connecting your Google Cloud Project to Dialogflow Gateway

When you are ready with this, you will see the console:

**Note**: it may take a second to load your Google Cloud Projects (or two)

**Note**: because of high latency of Google's servers, sometimes linked projects are not displayed as linked. Please reload the page, if the issue occurs

**Note**: non-Dialogflow-V2 Projects will not link, no matter how hard you try

**Note**: you will not see your projects, if you have not allowed popups and finished the previous step

![](https://i.imgur.com/AEFdvaH.png)

This list shows your Google Cloud Projects.

In order to link your Dialogflow Agent to Dialogflow Gateway, press on "Link" button, on the associated Google Cloud project.

The process may take a couple seconds to finish, so be patient. When its finished, the link icon will turn green and you will see the "Manage" button.

Then, press on the "Manage" Button and you will see this view:

![](https://i.imgur.com/G8fHU4l.png)

Save the Gateway URL, because we will need it for later

The UI URL is for the managed version of Dialogflow for Web v2, for people, who just want it to work (for example in iframe) without additional steps, described below

Optionally, you can also change your Gateway Settings:

![](https://i.imgur.com/Wp37Ycm.png)

When you specify the Webhook URL, the Dialogflow Gateway will send a POST request to it, when it is being triggered. Please note: it doesn't have anything to do with the Dialogflow Webhooks.

You can also specify the sources, which the formatting option will respect. The formatting option will then only return the components and messages for the specified Platforms (for example if you select Facebook, it will only return Facebook components for your Intents)

You can also unlink the project from Dialogflow Gateway service

**Note**: Unlinking your project, does not remove the service account keys and reset IAM Policies, you have to do it yourself (if you want to). Also note, that unlinking your project does not reset the quota or unblock the project

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

Open `config.js` and change the `gateway` variable, to connect to your Dialogflow Gateway. You can use my gateway URL as reference, by the way.

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

The logo, application name, description and the available languages are fetched from your Dialogflow Agent directly. If you want to change them, then you should do it in the Dialogflow Console and it will be synced to the UI. Please note, when adding new languages, you need to translate some of the UI as well (`i18n` field in `config.js`). Also don't forget to clean your cache, if you make some changes to the Agent

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