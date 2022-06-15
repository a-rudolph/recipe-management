import { getTimeToEndTime } from '../src/utils/formatTime'
import moment from 'moment'

const TIMER_START = 'TIMER_START'
const TIMER_FINISH = 'TIMER_FINISH'
const TIMER_STOP = 'TIMER_STOP'
const TIMER_RUNNING = 'TIMER_RUNNING'

self.addEventListener(
  'notificationclick',
  function (event) {
    clients.openWindow('/')
  },
  false
)

self.addEventListener('message', (event) => {
  const { data } = event
  const { type, payload } = data

  if (type === TIMER_START) {
    receiveTimerStart(payload)
    return
  }

  if (type === TIMER_FINISH) {
    receiveTimerFinish()
    return
  }

  if (type === TIMER_STOP) {
    receiveTimerStop()
    return
  }

  event.source.postMessage(`received unknown message type: ${type}`)
})

const config = {
  badge: '/icons/badge.png',
  icon: '/icons/wheat.png',
}

const showNotification = (title, options = {}) => {
  self.registration.showNotification(title, {
    ...config,
    ...options,
  })
}

const receiveTimerStart = (payload) => {
  const { endTimeNumber } = payload

  const endMoment = moment(endTimeNumber)

  const formatted = endMoment.format('h[:]mm a')

  const timeLeft = getTimeToEndTime(endTimeNumber)

  const hmsString = `${timeLeft.hh}:${timeLeft.mm}:${timeLeft.ss}`

  showNotification('timer started', {
    body: `Time left: ${hmsString}, Ending at ${formatted}`,
    tag: TIMER_RUNNING,
    silent: true,
  })
}

const receiveTimerFinish = () => {
  setNotification('Timer finished', {
    body: `Time's up`,
    requireInteraction: true,
  })
}

const receiveTimerStop = async () => {
  // end timer interval if there is one

  const notifications = await self.registration.getNotifications({
    tag: TIMER_RUNNING,
  })

  if (notifications) {
    const notification = notifications[0]

    notification?.close()
  }
}
