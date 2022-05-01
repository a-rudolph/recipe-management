import { useEffect } from 'react'

const config = {
  badge: '/icons/badge.png',
  icon: '/icons/wheat.png',
}

export const requestNotificationPermission = (
  cb?: (permission: NotificationPermission) => void
) => {
  Notification.requestPermission(cb)
}

export const getServiceWorkerRegistration = async () => {
  if (!('serviceWorker' in navigator)) return null

  return navigator.serviceWorker.getRegistration()
}

export function randomNotification() {
  console.log('notifying')
  const randomItem = Math.floor(Math.random() * 100)
  const notifTitle = `Title ${randomItem}`
  const notifBody = `Created by ${randomItem}.`
  const options = {
    body: notifBody,
  }
  new Notification(notifTitle, options)
  setTimeout(randomNotification, 10000)
}

export const setNotification = async (
  title: string = 'wheatifully',
  options: NotificationOptions = {}
) => {
  const sw = await getServiceWorkerRegistration()

  if (!sw) return

  const tag = `${Math.floor(Math.random() * 10)}`

  Notification.requestPermission((result) => {
    if (result === 'granted') {
      sw.showNotification(title, {
        body: 'bread coach',
        tag,
        ...config,
        ...options,
      })
    }
  })

  const notifs = await sw.getNotifications()

  return notifs.find((notification) => notification.tag === tag)
}

export const useNotification = () => {
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  return { setNotification }
}

export default useNotification
