import { register } from 'register-service-worker'

/* Registers service-worker */
export const registerServiceWorker = () => {
  if (process.env.NODE_ENV === 'production') {
    register(`${process.env.BASE_URL}service-worker.js`, {
      ready () {
        console.log('App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB')
      },
      registered () {
        console.log('Service worker has been registered.')
      },
      cached () {
        console.log('Content has been cached for offline use.')
      },
      updatefound () {
        console.log('New content is downloading.')
      },
      updated () {
        console.log('New content is available; please refresh.')
      },
      offline () {
        console.log('No internet connection found. App is running in offline mode.')
      },
      error (error) {
        console.error('Error during service worker registration:', error)
      }
    })
  }
}

export const setSeo = agent => {
  document.querySelector('title').innerText = agent.displayName
  document.querySelector('meta[name=description]').content = agent.description
  document.querySelector('link[rel=canonical]').href = location.href
  document.querySelectorAll('link[rel=icon]').forEach(elem => {
    elem.href = agent.avatarUri
  })
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

  const manifest = {
    name: agent.displayName,
    description: agent.description,
    display: 'standalone',
    start_url: '/',
    icons: [{
      src: agent.avatarUri,
      sizes: '192x192 512x512',
      type: 'image/png'
    }]
  }

  const blob = new Blob([JSON.stringify(manifest)], { type: 'application/json' })
  document.querySelector('link[rel=manifest]').href = URL.createObjectURL(blob)
}
