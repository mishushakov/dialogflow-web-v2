let get_gateway_url = () => {
    if(window.location.host.includes("cloud.ushakov.co")){
        let appid = window.location.host.split('.')[0]
        return "https://" + appid + ".gateway.dialogflow.cloud.ushakov.co"
    }

    else {
        return "https://us-central1-dialogflow-web-v2.cloudfunctions.net/gateway"
    }
}

export default {
    app: {
        gateway: get_gateway_url(), // <- enter your gateway URL here, the function is just a helper function for my cloud integration. You don't normally need it
        muted: false, // <- mute microphone at start
        history: true // <- save message history
    },
    i18n: {
        en: {
            welcomeTitle: "Welcome to",
            selectLang: "Select a language to continue",
            startTitle: "Start",
            startPhrase: "Hey",
            muteTitle: "Mute Toggle",
            inputTitle: "Type your message here",
            sendTitle: "Send",
            microphoneTitle: "Voice Input"
        },
        ru: {
            welcomeTitle: "Добро пожаловать в",
            selectLang: "Выберите язык, чтобы продолжить",
            startTitle: "Старт",
            startPhrase: "Привет",
            muteTitle: "Режим звука",
            inputTitle: "Введите свое сообщение сюда",
            sendTitle: "Отправить",
            microphoneTitle: "Голосовой ввод"
        },
        de: {
            welcomeTitle: "Wilkommen bei",
            selectLang: "Sprache auswählen zum fortfahren",
            startTitle: "Starten",
            startPhrase: "Hallo",
            muteTitle: "Stumm Modus",
            inputTitle: "Schreiben Sie ihre Nachricht hier",
            sendTitle: "Senden",
            microphoneTitle: "Spracheingabe"
        }
    }
}