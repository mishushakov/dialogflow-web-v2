/* Utilities */

/* Retrieves Gateway URL, if it's a hosted version or returns a fallback, if it's not */
let get_gateway_url = (fallback) => {
    if(window.location.host.includes("cloud.ushakov.co")){
        return "https://" + window.location.host.split('.')[0] + ".gateway.dialogflow.cloud.ushakov.co"
    }

    else {
        return fallback
    }
}

/* Registers service-worker */
let register_service_worker = () => {
    document.onreadystatechange = () => {
        if(document.readyState == 'complete'){
            if('serviceWorker' in navigator){
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/worker.js')
                })
            }
        }
    }
}

/* Manages SEO, if it's a hosted version or returns a fallback, if it's not */
let set_seo = (agent) => {
    if(window.location.host.includes("cloud.ushakov.co")){
        document.querySelector("title").innerText = agent.displayName
        document.querySelector("meta[name=description]").content = agent.description
        document.querySelector("link[rel=canonical]").href = location.href
        document.querySelector("meta[name=application-name]").content = agent.displayName
        document.querySelector("link[rel=icon]").href = agent.avatarUri
        document.querySelector("link[rel=apple-touch-icon]").href = agent.avatarUri
        document.querySelector("meta[name=msapplication-TileImage]").content = agent.avatarUri
        document.querySelector("meta[name=apple-mobile-web-app-title]").content = agent.displayName
        document.querySelector("meta[property=og\\:title]").content = agent.displayName
        document.querySelector("meta[property=og\\:image]").content = agent.avatarUri
        document.querySelector("meta[property=og\\:description]").content = agent.description
        document.querySelector("meta[property=og\\:url]").content = location.href
        document.querySelector("meta[name=twitter\\:title]").content = agent.displayName
        document.querySelector("meta[name=twitter\\:image]").content = agent.avatarUri
        document.querySelector("meta[name=twitter\\:description]").content = agent.description
    }
}

export { get_gateway_url, register_service_worker, set_seo }