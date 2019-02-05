export default {
    app: {
        gateway: "https://us-central1-dialogflow-web-v2.cloudfunctions.net/gateway", // <- enter your gateway URL here
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
        }
    }
}