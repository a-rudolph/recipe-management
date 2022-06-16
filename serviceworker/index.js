console.log('serviceworker: starting')

import { getSecondsToEndTime, getTimeToEndTime } from '../src/utils/formatTime'
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

const closeNotification = async (tag) => {
  const notifications = await self.registration.getNotifications({
    tag,
  })

  if (notifications) {
    const notification = notifications[0]

    notification?.close()
  }
}

let timer = null

const startTimer = (seconds) => {
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

const receiveTimerStart = (payload) => {
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
  showNotification('Timer finished', {
    body: `Time's up`,
    requireInteraction: true,
  })
}

const receiveTimerStop = () => {
  stopTimer()
}
