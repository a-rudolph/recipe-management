export const getServiceWorkerRegistration = async () => {
  if (!('serviceWorker' in navigator)) return null

  return navigator.serviceWorker.getRegistration()
}

export const getServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) return null

  const registration = await getServiceWorkerRegistration()

  return registration?.active
}

export const setupMessageListener = () => {
  if (!('serviceWorker' in navigator)) return

  navigator.serviceWorker.addEventListener('message', (event) => {
    // event is a MessageEvent object
    console.log(`The service worker sent me a message: ${event.data}`)
  })
}

export const messageSW = async (data: any) => {
  const sw = await getServiceWorker()

  if (!sw) return

  sw.postMessage(data)
}
