import { useEffect, useRef } from 'react'

const config = {
  badge: '/icons/badge.png',
  icon: '/icons/wheat.png',
}

export const requestNotificationPermission = (
  cb?: (permission: NotificationPermission) => void
) => {
  Notification.requestPermission(cb)
}

export const useNotification = () => {
  const sw = useRef<ServiceWorkerRegistration>(null)

  useEffect(() => {
    const getServiceWorker = async () => {
      const serviceWorker = navigator?.serviceWorker
      if (!serviceWorker) return

      const registration = await serviceWorker.getRegistration()

      sw.current = registration
    }

    getServiceWorker()
  })

  const setNotification = async (
    title: string = 'wheatifully',
    options: NotificationOptions = {}
  ) => {
    console.log('sw: ', sw.current)
    if (!sw.current) return

    Notification.requestPermission((result) => {
      console.log({ result })

      if (result === 'granted') {
        sw.current.showNotification(title, {
          body: 'bread coach',
          ...config,
          ...options,
        })
      }
    })

    const notifs = await sw.current.getNotifications()

    console.log(notifs)
  }

  return { setNotification, sw }
}

export default useNotification
