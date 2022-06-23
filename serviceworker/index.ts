console.log('serviceworker: starting')

import { getSecondsToEndTime, getTimeToEndTime } from '../src/utils/formatTime'
import moment from 'moment'

// if we could replace global with ServiceWorkerGlobalScope it would be great.
// for now these are the only two globals we're using
declare global {
  var registration: ServiceWorkerRegistration
  var clients: Clients
}

const TIMER_START = 'TIMER_START'
const TIMER_FINISH = 'TIMER_FINISH'
const TIMER_STOP = 'TIMER_STOP'
const TIMER_RUNNING = 'TIMER_RUNNING'

self.addEventListener(
  'notificationclick',
  function (event) {
    self.clients.openWindow('/')
  },
  false
)

self.addEventListener('message', (event) => {
  console.log('serviceworker: receiving message', event)

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

  console.error(`received unknown message type: ${type}`)
})

const config = {
  badge: '/icons/badge.png',
  icon: '/icons/wheat.png',
}

const showNotification = (title: string, options: NotificationOptions = {}) => {
  self.registration.showNotification(title, {
    ...config,
    ...options,
  })
}

const closeNotification = async (tag: string) => {
  const notifications = await self.registration.getNotifications({
    tag,
  })

  if (notifications) {
    const notification = notifications[0]

    notification?.close()
  }
}

type TimerType = {
  timeout?: NodeJS.Timeout
}

let timer: TimerType | null = null

const startTimer = (seconds: number) => {
  const timeout = setTimeout(() => {
    receiveTimerFinish()
    stopTimer()
  }, seconds * 1_000)

  timer = {
    timeout,
  }
}

const stopTimer = () => {
  // clear timout and close notification
  if (timer?.timeout) {
    clearTimeout(timer?.timeout)
  }

  closeNotification(TIMER_RUNNING)
}

const receiveTimerStart = (payload: { endTimeNumber: number }) => {
  const { endTimeNumber } = payload

  const secondsToEndTime = getSecondsToEndTime(endTimeNumber)
  startTimer(secondsToEndTime)

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
  stopTimer()
  showNotification('Timer finished', {
    body: `Time's up`,
    requireInteraction: true,
  })
}

const receiveTimerStop = () => {
  stopTimer()
}
