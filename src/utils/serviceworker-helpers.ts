import { SW_NOTIFICATIONS } from '@/constants/features'

export const getServiceWorkerRegistration = async () => {
  if (!('serviceWorker' in navigator)) return null

  return navigator.serviceWorker.getRegistration()
}

export const getServiceWorker = async () => {
  const registration = await getServiceWorkerRegistration()

  return registration?.active || null
}

export const setupMessageListener = () => {
  if (!('serviceWorker' in navigator)) return

  navigator.serviceWorker.addEventListener('message', (event) => {
    // event is a MessageEvent object
    console.log(`The service worker sent me a message: ${event.data}`)
  })
}

export const messageSW = async (data: any) => {
  if (!SW_NOTIFICATIONS) return

  const sw = await getServiceWorker()

  if (!sw) return

  sw.postMessage(data)
}
