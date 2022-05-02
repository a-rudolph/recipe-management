import { useEffect } from 'react'
import _noop from 'lodash/noop'

const config = {
  badge: '/icons/badge.png',
  icon: '/icons/wheat.png',
}

export const requestNotificationPermission = (
  cb?: (permission: NotificationPermission) => void
) => {
  if (!('Notification' in window)) {
    alert('This browser does not support desktop notification')
    return
  }

  Notification.requestPermission(cb)
}

export const getServiceWorkerRegistration = async () => {
  if (!('serviceWorker' in navigator)) return null

  return navigator.serviceWorker.getRegistration()
}

export const getNotifications = async (filter: GetNotificationOptions) => {
  const sw = await getServiceWorkerRegistration()
  if (!sw) return

  const notifications = await sw.getNotifications(filter)

  return notifications
}

export const setNotification = async (
  title: string = 'wheatifully',
  options: NotificationOptions = {},
  onClick: any = _noop
) => {
  const sw = await getServiceWorkerRegistration()

  if (!sw) return

  requestNotificationPermission((result) => {
    if (result === 'granted') {
      sw.showNotification(title, {
        body: 'bread coach',
        ...config,
        ...options,
      })
    }
  })

  self.addEventListener(
    'notificationclick',
    (args) => {
      console.log('onClick!', args)
    },
    false
  )

  const notifs = await sw.getNotifications()

  return notifs.find((notification) => notification.tag === options.tag)
}

export const useNotification = () => {
  useEffect(() => {
    requestNotificationPermission()
  }, [])

  return { setNotification, getNotifications }
}

export default useNotification
