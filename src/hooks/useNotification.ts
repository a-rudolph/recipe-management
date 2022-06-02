import { useEffect } from 'react'
import _noop from 'lodash/noop'

const config = {
  badge: '/icons/badge.png',
  icon: '/icons/wheat.png',
}

export const requestNotificationPermission = (
  cb?: (permission: NotificationPermission) => void,
  onError: VoidFunction = _noop
) => {
  if (!('Notification' in window)) {
    alert('This browser does not support notification')
    return
  }

  try {
    Notification.requestPermission(cb)
  } catch (e) {
    onError()
  }
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
  options: NotificationOptions = {}
) => {
  const sw = await getServiceWorkerRegistration()

  if (!sw) return

  requestNotificationPermission(
    (result) => {
      if (result === 'granted') {
        sw.showNotification(title, {
          body: 'bread coach',
          ...config,
          ...options,
        })
      }
    },
    () => {
      alert('This browser does not support notifications')
    }
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
