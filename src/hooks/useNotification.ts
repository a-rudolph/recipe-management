import { useEffect, useRef } from 'react'

export const useNotification = () => {
  const sw = useRef<ServiceWorkerRegistration>(null)
  const permission = useRef<NotificationPermission>(null)

  useEffect(() => {
    const getServiceWorker = async () => {
      const serviceWorker = navigator?.serviceWorker
      if (!serviceWorker) return

      permission.current = Notification.permission

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
      permission.current = result

      console.log({ result })

      if (result === 'granted') {
        sw.current.showNotification(title, {
          body: 'bread coach',
          badge: '/badge.png',
          icon: '/apple-icon-60x60.png',
          ...options,
        })
      }
    })

    const notifs = await sw.current.getNotifications()

    console.log(notifs)
  }

  return { setNotification, sw, permission }
}

export default useNotification
