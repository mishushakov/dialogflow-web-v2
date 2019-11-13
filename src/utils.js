import { register } from 'register-service-worker'

/* Retrieves Gateway URL, if it's a hosted version or returns a fallback, if it's not */
export const get_gateway_url = fallback => {
    if (window.location.host.includes('cloud.ushakov.co')){
        return `https://${window.location.host.split('.')[0]}.gateway.dialogflow.cloud.ushakov.co`
    }

    return fallback
}

/* Registers service-worker */
export const register_service_worker = () => {
    if (process.env.NODE_ENV === 'production'){
        register(`${process.env.BASE_URL}service-worker.js`, {
            ready(){
                console.log('App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB')
            },
            registered(){
                console.log('Service worker has been registered.')
            },
            cached(){
                console.log('Content has been cached for offline use.')
            },
            updatefound(){
                console.log('New content is downloading.')
            },
            updated(){
                console.log('New content is available; please refresh.')
            },
            offline(){
                console.log('No internet connection found. App is running in offline mode.')
            },
            error(error){
                console.error('Error during service worker registration:', error)
            }
        })
    }
}

/* Manages SEO, if it's a hosted version or returns a fallback, if it's not */
export const set_seo = agent => {
    if (window.location.host.includes('cloud.ushakov.co')){
        document.querySelector('title').innerText = agent.displayName
        document.querySelector('meta[name=description]').content = agent.description
        document.querySelector('link[rel=canonical]').href = location.href
        document.querySelector('link[rel=icon]').href = agent.avatarUri
        document.querySelector('link[rel=apple-touch-icon]').href = agent.avatarUri
        document.querySelector('meta[name=msapplication-TileImage]').content = agent.avatarUri
        document.querySelector('meta[name=apple-mobile-web-app-title]').content = agent.displayName
        document.querySelector('meta[property=og\\:title]').content = agent.displayName
        document.querySelector('meta[property=og\\:image]').content = agent.avatarUri
        document.querySelector('meta[property=og\\:description]').content = agent.description
        document.querySelector('meta[property=og\\:url]').content = location.href
        document.querySelector('meta[name=twitter\\:title]').content = agent.displayName
        document.querySelector('meta[name=twitter\\:image]').content = agent.avatarUri
        document.querySelector('meta[name=twitter\\:description]').content = agent.description
    }
}