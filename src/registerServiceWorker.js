document.onreadystatechange = () => {
    if(document.readyState == 'complete'){
        if('serviceWorker' in navigator){
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/worker.js')
            })
        }
    }
}